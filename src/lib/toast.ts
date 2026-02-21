"use client";

import { toast as sonner } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  duration?: number;
  description?: string;
}

const defaultDuration = 4000;

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    sonner.success(message, {
      duration: options?.duration || defaultDuration,
      description: options?.description,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    sonner.error(message, {
      duration: options?.duration || defaultDuration,
      description: options?.description,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    sonner.warning(message, {
      duration: options?.duration || defaultDuration,
      description: options?.description,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    sonner.info(message, {
      duration: options?.duration || defaultDuration,
      description: options?.description,
    });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading?: string;
      success?: string;
      error?: string;
    }
  ) => {
    return sonner.promise(promise, {
      loading: messages.loading || "Processing...",
      success: messages.success || "Done!",
      error: messages.error || "Failed",
    });
  },
};
