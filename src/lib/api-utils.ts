import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  requestId: string;
}

export function successResponse<T>(data: T, requestId: string): NextResponse<APIResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      requestId,
    },
    { status: 200 }
  );
}

export function errorResponse(
  message: string,
  statusCode: number = 500,
  requestId: string
): NextResponse<APIResponse> {
  logger.error(`API Error: ${message}`, undefined, { statusCode, requestId });
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      timestamp: new Date().toISOString(),
      requestId,
    },
    { status: statusCode }
  );
}

export function validationErrorResponse(
  errors: string[],
  requestId: string
): NextResponse<APIResponse> {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      timestamp: new Date().toISOString(),
      requestId,
    },
    { status: 400 }
  );
}

export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function withErrorHandling(handler: (req: NextRequest, requestId: string) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    const requestId = generateRequestId();
    const startTime = Date.now();
    
    try {
      logger.info(`[${requestId}] ${req.method} ${req.url}`);
      
      const response = await handler(req, requestId);
      
      const duration = Date.now() - startTime;
      logger.info(`[${requestId}] Completed in ${duration}ms`);
      
      return response;
    } catch (error) {
      logger.error(`[${requestId}] Unhandled error`, error instanceof Error ? error : undefined);
      return errorResponse("Internal server error", 500, requestId);
    }
  };
}
