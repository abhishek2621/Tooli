import { toast } from "./toast";

export interface ErrorContext {
  component?: string;
  userMessage?: string;
  logToConsole?: boolean;
  retryable?: boolean;
}

export interface RetryConfig {
  maxRetries: number;
  delayMs: number;
  backoffMultiplier?: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
};

export class AppError extends Error {
  public readonly code: string;
  public readonly userMessage: string;
  public readonly retryable: boolean;
  public readonly context?: string;

  constructor(
    message: string,
    code: string = "UNKNOWN_ERROR",
    context: ErrorContext = {}
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.userMessage = context.userMessage || "An unexpected error occurred";
    this.retryable = context.retryable ?? false;
    this.context = context.component;
  }
}

export function handleError(error: unknown, context: ErrorContext = {}): void {
  const component = context.component || "Unknown";
  
  if (context.logToConsole !== false) {
    console.error(`[${component}] Error:`, error);
  }

  if (error instanceof AppError) {
    toast.error(error.userMessage);
    return;
  }

  if (error instanceof Error) {
    toast.error(context.userMessage || "An unexpected error occurred");
    return;
  }

  toast.error(context.userMessage || "Something went wrong");
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const { maxRetries, delayMs, backoffMultiplier } = {
    ...DEFAULT_RETRY_CONFIG,
    ...config,
  };

  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const delay = delayMs * Math.pow(backoffMultiplier || 1, attempt);
        console.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isRetryable(error: unknown): boolean {
  if (error instanceof AppError) {
    return error.retryable;
  }

  if (error instanceof Error) {
    const networkErrors = ["fetch failed", "network error", "timeout"];
    return networkErrors.some((msg) =>
      error.message.toLowerCase().includes(msg)
    );
  }

  return false;
}

export function formatFileError(error: Error): string {
  const message = error.message.toLowerCase();

  if (message.includes("pdf") && message.includes("encrypt")) {
    return "This PDF is password protected. Please remove the password and try again.";
  }

  if (message.includes("pdf") && message.includes("corrupt")) {
    return "This file appears to be corrupted. Please try a different file.";
  }

  if (message.includes("size") || message.includes("memory")) {
    return "File is too large. Please try a smaller file.";
  }

  if (message.includes("format") || message.includes("type")) {
    return "Unsupported file format. Please check the allowed file types.";
  }

  return "Failed to process file. Please try again.";
}

export function createErrorHandler(component: string) {
  return {
    handle: (error: unknown, userMessage?: string) => {
      handleError(error, { component, userMessage });
    },
    withRetry: async <T>(
      fn: () => Promise<T>,
      config?: Partial<RetryConfig>
    ) => {
      return withRetry(fn, config);
    },
  };
}
