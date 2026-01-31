"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const PdfCompressor = dynamic(
    () => import("./pdf-compressor").then((mod) => mod.PdfCompressor),
    {
        ssr: false,
        loading: () => (
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="border-2 border-dashed rounded-xl p-12 text-center bg-muted/20">
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
);

export function PdfCompressorWrapper() {
    return <PdfCompressor />;
}
