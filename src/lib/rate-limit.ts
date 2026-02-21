import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RequestRecord>();

function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (record.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

setInterval(cleanupExpiredEntries, 60000);

export function rateLimit(config: RateLimitConfig) {
  return (req: NextRequest): NextResponse | null => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
                req.headers.get("x-real-ip") || 
                "unknown";
    
    const key = `rate:${ip}`;
    const now = Date.now();
    
    let record = rateLimitStore.get(key);
    
    if (!record || record.resetTime < now) {
      record = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      rateLimitStore.set(key, record);
    }
    
    record.count++;
    
    if (record.count > config.maxRequests) {
      const response = NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded",
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        },
        { status: 429 }
      );
      
      response.headers.set("Retry-After", String(Math.ceil((record.resetTime - now) / 1000)));
      response.headers.set("X-RateLimit-Limit", String(config.maxRequests));
      response.headers.set("X-RateLimit-Remaining", "0");
      
      return response;
    }
    
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(config.maxRequests));
    response.headers.set("X-RateLimit-Remaining", String(config.maxRequests - record.count));
    
    return null;
  };
}

export const defaultRateLimit = rateLimit({
  windowMs: 60000,
  maxRequests: 100,
});

export const strictRateLimit = rateLimit({
  windowMs: 60000,
  maxRequests: 20,
});
