"use client";

import { useEffect } from "react";
import { logger } from "./logger";

export type ToolName =
  | "pdf-merger"
  | "pdf-compressor"
  | "text-to-pdf"
  | "image-compressor"
  | "image-converter"
  | "image-to-pdf"
  | "gst-calculator"
  | "emi-calculator"
  | "sip-calculator"
  | "unit-converter"
  | "qr-code-generator"
  | "password-generator"
  | "age-calculator";

export type EventCategory = "tool" | "conversion" | "download" | "error";

interface AnalyticsEvent {
  name: string;
  category: EventCategory;
  label?: string;
  value?: number;
  metadata?: Record<string, unknown>;
}

interface ToolMetrics {
  views: number;
  conversions: number;
  downloads: number;
  errors: number;
  avgProcessingTime: number;
  lastUsed: string;
}

class Analytics {
  private toolMetrics = new Map<ToolName, ToolMetrics>();
  private sessionId: string;
  private sessionStart: number;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStart = Date.now();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private getOrCreateToolMetrics(tool: ToolName): ToolMetrics {
    if (!this.toolMetrics.has(tool)) {
      this.toolMetrics.set(tool, {
        views: 0,
        conversions: 0,
        downloads: 0,
        errors: 0,
        avgProcessingTime: 0,
        lastUsed: new Date().toISOString(),
      });
    }
    return this.toolMetrics.get(tool)!;
  }

  trackEvent(event: AnalyticsEvent): void {
    logger.info(`[Analytics] ${event.category}: ${event.name}`, event.metadata);

    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event.name, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata,
      });
    }
  }

  trackToolView(tool: ToolName): void {
    const metrics = this.getOrCreateToolMetrics(tool);
    metrics.views++;
    metrics.lastUsed = new Date().toISOString();

    this.trackEvent({
      name: "tool_view",
      category: "tool",
      label: tool,
    });
  }

  trackConversion(tool: ToolName, processingTime?: number): void {
    const metrics = this.getOrCreateToolMetrics(tool);
    metrics.conversions++;

    if (processingTime) {
      metrics.avgProcessingTime =
        (metrics.avgProcessingTime * (metrics.conversions - 1) + processingTime) /
        metrics.conversions;
    }

    this.trackEvent({
      name: "conversion",
      category: "conversion",
      label: tool,
      value: processingTime,
    });
  }

  trackDownload(tool: ToolName, fileSize?: number): void {
    const metrics = this.getOrCreateToolMetrics(tool);
    metrics.downloads++;

    this.trackEvent({
      name: "download",
      category: "download",
      label: tool,
      value: fileSize,
    });
  }

  trackError(tool: ToolName, errorType: string, errorMessage?: string): void {
    const metrics = this.getOrCreateToolMetrics(tool);
    metrics.errors++;

    this.trackEvent({
      name: "error",
      category: "error",
      label: tool,
      metadata: { errorType, errorMessage },
    });
  }

  getToolMetrics(tool: ToolName): ToolMetrics | undefined {
    return this.toolMetrics.get(tool);
  }

  getAllMetrics(): Record<ToolName, ToolMetrics> {
    return Object.fromEntries(this.toolMetrics) as Record<ToolName, ToolMetrics>;
  }

  getSessionId(): string {
    return this.sessionId;
  }

  getSessionDuration(): number {
    return Date.now() - this.sessionStart;
  }

  resetSession(): void {
    this.sessionId = this.generateSessionId();
    this.sessionStart = Date.now();
  }
}

export const analytics = new Analytics();

export function useAnalytics() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logger.error("Unhandled error:", event.error);
      analytics.trackError("pdf-merger" as ToolName, "unhandled", event.message);
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      logger.error("Unhandled promise rejection:", event.reason);
      analytics.trackError("pdf-merger" as ToolName, "promise_rejection", String(event.reason));
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return analytics;
}

export function trackToolView(tool: ToolName): void {
  analytics.trackToolView(tool);
}

export function trackConversion(tool: ToolName, processingTime?: number): void {
  analytics.trackConversion(tool, processingTime);
}

export function trackDownload(tool: ToolName, fileSize?: number): void {
  analytics.trackDownload(tool, fileSize);
}

export function trackError(tool: ToolName, errorType: string, errorMessage?: string): void {
  analytics.trackError(tool, errorType, errorMessage);
}
