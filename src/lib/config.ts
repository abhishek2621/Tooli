export const config = {
  // ============================================
  // APPLICATION CONFIGURATION
  // ============================================
  app: {
    name: process.env.APP_NAME || "Tooli",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://www.tooli.in",
  },

  // ============================================
  // SCALING CONFIGURATION
  // ============================================
  scaling: {
    // Current architecture: client-side processing
    architecture: "client-side" as const,
    
    // Future: serverless functions
    serverlessEnabled: false,
    
    // Future: background jobs
    backgroundJobsEnabled: false,
    
    // CDN configuration
    cdnEnabled: true,
    
    // Cache TTL values (in seconds)
    cache: {
      staticAssets: 31536000, // 1 year
      htmlPages: 3600,         // 1 hour
      apiResponses: 0,         // no cache
    },
  },

  // ============================================
  // RATE LIMITING
  // ============================================
  rateLimit: {
    // Requests per window
    default: {
      windowMs: 60000,  // 1 minute
      maxRequests: 100,
    },
    strict: {
      windowMs: 60000,
      maxRequests: 20,
    },
    auth: {
      windowMs: 3600000, // 1 hour
      maxRequests: 10,
    },
  },

  // ============================================
  // FILE PROCESSING LIMITS
  // ============================================
  fileProcessing: {
    maxFileSizeMB: {
      pdf: 50,
      image: 25,
      text: 10,
    },
    maxFilesPerRequest: 20,
    maxConcurrentProcessing: 5,
    workerTimeout: 300000, // 5 minutes
  },

  // ============================================
  // API CONFIGURATION
  // ============================================
  api: {
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    externalAPIs: {
      currency: {
        provider: "frankfurter",
        baseUrl: "https://api.frankfurter.app",
        cacheDuration: 3600, // 1 hour
      },
    },
  },

  // ============================================
  // FEATURE FLAGS (for gradual rollout)
  // ============================================
  features: {
    analytics: true,
    errorTracking: true,
    abTesting: false,
    aiTools: false,  // Future feature
    userAccounts: false, // Future feature
    cloudStorage: false, // Future feature
  },

  // ============================================
  // MONITORING
  // ============================================
  monitoring: {
    logLevel: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "warn" : "debug"),
    sampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    slowThreshold: 3000, // ms
  },

  // ============================================
  // SECURITY
  // ============================================
  security: {
    corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["https://www.tooli.in"],
    csrfProtection: false, // Not needed for client-side only
    rateLimitingEnabled: true,
  },
} as const;

export type Config = typeof config;
