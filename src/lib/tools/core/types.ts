export type ToolStatus = "idle" | "processing" | "success" | "error";

export interface ToolProgress {
  current: number;
  total: number;
  percentage: number;
}

export interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ToolConfig {
  name: string;
  description: string;
  maxFileSize?: number;
  maxFiles?: number;
  acceptedTypes?: string[];
  workerEnabled?: boolean;
}

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface ProcessingOptions {
  quality?: number;
  format?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

export interface WorkerMessage {
  type: string;
  [key: string]: unknown;
}

export interface WorkerResponse {
  type: "STATUS" | "DONE" | "ERROR";
  progress?: number;
  message?: string;
  data?: ArrayBuffer;
  error?: string;
}

export type WorkerFactory = () => Worker;

export interface ToolHooks {
  useFileUpload: () => {
    files: FileItem[];
    addFiles: (files: File[]) => void;
    removeFile: (id: string) => void;
    clearFiles: () => void;
    isDragging: boolean;
  };
  useProcessing: () => {
    status: ToolStatus;
    progress: ToolProgress;
    start: () => void;
    updateProgress: (current: number, total: number) => void;
    success: () => void;
    error: (message: string) => void;
    reset: () => void;
  };
  useDownload: () => {
    download: (blob: Blob, filename: string) => void;
    downloadMultiple: (files: { blob: Blob; name: string }[]) => void;
  };
  useWorker: (workerFactory: WorkerFactory) => {
    worker: Worker | null;
    postMessage: (message: WorkerMessage) => void;
    terminate: () => void;
  };
}
