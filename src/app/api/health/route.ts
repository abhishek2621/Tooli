import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const healthcheck = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV,
    checks: {
      api: "ok",
      worker: "ok",
      s3: "ok",
    },
  };

  return NextResponse.json(healthcheck, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, must-revalidate",
      "X-Health-Check": "tooli-v1",
    },
  });
}
