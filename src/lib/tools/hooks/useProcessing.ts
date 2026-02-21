"use client";

import { useState, useCallback } from "react";
import { ToolStatus, ToolProgress } from "../core/types";

interface UseProcessingOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useProcessing(options: UseProcessingOptions = {}) {
  const { onSuccess, onError } = options;
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [progress, setProgress] = useState<ToolProgress>({
    current: 0,
    total: 100,
    percentage: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const start = useCallback(() => {
    setStatus("processing");
    setProgress({ current: 0, total: 100, percentage: 0 });
    setErrorMessage(null);
  }, []);

  const updateProgress = useCallback((current: number, total: number) => {
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
    setProgress({ current, total, percentage });
  }, []);

  const success = useCallback(() => {
    setStatus("success");
    setProgress({ current: 100, total: 100, percentage: 100 });
    onSuccess?.();
  }, [onSuccess]);

  const handleError = useCallback(
    (message: string) => {
      setStatus("error");
      setErrorMessage(message);
      onError?.(message);
    },
    [onError]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setProgress({ current: 0, total: 100, percentage: 0 });
    setErrorMessage(null);
  }, []);

  return {
    status,
    progress,
    error: errorMessage,
    isProcessing: status === "processing",
    isSuccess: status === "success",
    isError: status === "error",
    isIdle: status === "idle",
    start,
    updateProgress,
    success,
    handleError,
    reset,
  };
}
