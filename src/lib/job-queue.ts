export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface Job<T = unknown> {
  id: string;
  type: string;
  payload: T;
  status: JobStatus;
  progress: number;
  result?: unknown;
  error?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  attempts: number;
  maxAttempts: number;
}

export interface JobOptions {
  maxAttempts?: number;
  priority?: number;
  timeoutMs?: number;
}

export interface QueueConfig {
  name: string;
  maxRetries: number;
  timeoutMs: number;
}

type JobHandler<T = unknown> = (job: Job<T>) => Promise<void>;

class InMemoryQueue {
  private jobs = new Map<string, Job>();
  private handlers = new Map<string, JobHandler>();
  private processing = new Set<string>();
  private config: QueueConfig;

  constructor(config: QueueConfig) {
    this.config = config;
  }

  async add<T>(type: string, payload: T, options: JobOptions = {}): Promise<string> {
    const job: Job<T> = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type,
      payload,
      status: "pending",
      progress: 0,
      createdAt: new Date().toISOString(),
      attempts: 0,
      maxAttempts: options.maxAttempts ?? this.config.maxRetries,
    };

    this.jobs.set(job.id, job as Job);
    this.processNext();
    
    return job.id;
  }

  registerHandler<T>(type: string, handler: JobHandler<T>): void {
    this.handlers.set(type, handler as JobHandler);
    this.processNext();
  }

  private async processNext(): Promise<void> {
    if (this.processing.size >= 5) return;

    const pendingJob = Array.from(this.jobs.values())
      .filter((job) => job.status === "pending")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .shift();

    if (!pendingJob) return;

    this.processing.add(pendingJob.id);
    pendingJob.status = "processing";
    pendingJob.startedAt = new Date().toISOString();

    const handler = this.handlers.get(pendingJob.type);
    
    if (!handler) {
      pendingJob.status = "failed";
      pendingJob.error = `No handler for job type: ${pendingJob.type}`;
      this.processing.delete(pendingJob.id);
      return;
    }

    try {
      await handler(pendingJob);
      pendingJob.status = "completed";
      pendingJob.completedAt = new Date().toISOString();
    } catch (error) {
      pendingJob.attempts++;
      
      if (pendingJob.attempts >= pendingJob.maxAttempts) {
        pendingJob.status = "failed";
        pendingJob.error = error instanceof Error ? error.message : "Unknown error";
      } else {
        pendingJob.status = "pending";
      }
    }

    this.processing.delete(pendingJob.id);
    this.processNext();
  }

  getJob(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  getJobsByStatus(status: JobStatus): Job[] {
    return Array.from(this.jobs.values()).filter((job) => job.status === status);
  }
}

const queues = new Map<string, InMemoryQueue>();

export function getQueue(name: string): InMemoryQueue {
  if (!queues.has(name)) {
    queues.set(
      name,
      new InMemoryQueue({
        name,
        maxRetries: 3,
        timeoutMs: 300000,
      })
    );
  }
  return queues.get(name)!;
}

export const jobQueue = getQueue("default");

export async function addBackgroundJob<T>(
  queue: InMemoryQueue,
  type: string,
  payload: T,
  options?: JobOptions
): Promise<string> {
  return queue.add(type, payload, options);
}

export function registerJobHandler<T>(
  queue: InMemoryQueue,
  type: string,
  handler: JobHandler<T>
): void {
  queue.registerHandler(type, handler);
}
