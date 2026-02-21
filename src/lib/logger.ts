type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

interface LoggerConfig {
  enableConsole: boolean;
  enableRemote: boolean;
  minLevel: LogLevel;
}

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      enableConsole: process.env.NODE_ENV !== "production",
      enableRemote: process.env.NODE_ENV === "production",
      minLevel: process.env.NODE_ENV === "production" ? "warn" : "debug",
      ...config,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.config.minLevel];
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog("debug")) return;
    const entry: LogEntry = {
      level: "debug",
      message,
      context,
      timestamp: new Date().toISOString(),
    };
    this.addLog(entry);
    if (this.config.enableConsole) {
      console.debug(`[DEBUG] ${message}`, context || "");
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog("info")) return;
    const entry: LogEntry = {
      level: "info",
      message,
      context,
      timestamp: new Date().toISOString(),
    };
    this.addLog(entry);
    if (this.config.enableConsole) {
      console.info(`[INFO] ${message}`, context || "");
    }
  }

  warn(message: string, context?: Record<string, unknown>): void {
    if (!this.shouldLog("warn")) return;
    const entry: LogEntry = {
      level: "warn",
      message,
      context,
      timestamp: new Date().toISOString(),
    };
    this.addLog(entry);
    if (this.config.enableConsole) {
      console.warn(`[WARN] ${message}`, context || "");
    }
  }

  error(message: string, error?: Error, context?: Record<string, unknown>): void {
    if (!this.shouldLog("error")) return;
    const entry: LogEntry = {
      level: "error",
      message,
      context: {
        ...context,
        error: error
          ? {
              name: error.name,
              message: error.message,
              stack: error.stack,
            }
          : undefined,
      },
      timestamp: new Date().toISOString(),
    };
    this.addLog(entry);
    if (this.config.enableConsole) {
      console.error(`[ERROR] ${message}`, error || "", context || "");
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  setLevel(level: LogLevel): void {
    this.config.minLevel = level;
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

export const logger = new Logger();

export function createLogger(context: string): Logger {
  const customLogger = new Logger();
  return {
    debug: (message: string, ctx?: Record<string, unknown>) =>
      customLogger.debug(`[${context}] ${message}`, ctx),
    info: (message: string, ctx?: Record<string, unknown>) =>
      customLogger.info(`[${context}] ${message}`, ctx),
    warn: (message: string, ctx?: Record<string, unknown>) =>
      customLogger.warn(`[${context}] ${message}`, ctx),
    error: (message: string, error?: Error, ctx?: Record<string, unknown>) =>
      customLogger.error(`[${context}] ${message}`, error, ctx),
    getLogs: customLogger.getLogs.bind(customLogger),
    clearLogs: customLogger.clearLogs.bind(customLogger),
    setLevel: customLogger.setLevel.bind(customLogger),
    getConfig: customLogger.getConfig.bind(customLogger),
  } as Logger;
}
