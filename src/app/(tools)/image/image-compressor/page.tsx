import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { RelatedTools } from "@/components/shared/related-tools";

const ImageCompressor = dynamic(
    () => import("@/components/tools/image/image-compressor").then(mod => mod.ImageCompressor),
    {
        loading: () => (
            <div className="space-y-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
            </div>
        )
    }
);

export const metadata: Metadata = generateToolMetadata({
    title: 'Compress Image to 50KB, 100KB Online – Photo & Signature Compressor | Tooli',
    description: 'Compress images to exact sizes like 50KB or 100KB without quality loss. Perfect for exam forms, job applications and website uploads. Private browser-based JPG PNG WebP compressor.',
    canonical: 'https://www.tooli.in/image/image-compressor',
    keywords: [
        'image compressor',
        'compress image to 50kb',
        'compress image to 100kb',
        'compress signature to 20kb',
        'exam photo compressor',
        'photo under 50kb',
        'free image compressor online',
        'jpg png webp compressor',
        'image size reducer',
    ],
})

export default function ImageCompressorPage() {
    return (
        <ToolSEOWrapper
            title="Image Compressor"
            description="Compress images to exact sizes like 50KB or 100KB without losing quality."
            canonical="https://www.tooli.in/image/image-compressor"
            category="MultimediaApplication"
            showRelatedAtBottom={false}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">
                    Free Image Compressor - | FAST | SECURE | NO ADS
                </h1>
                <p className="text-lg text-muted-foreground">
                    Reduce image size without losing clarity. Ideal for exam forms, job applications, and website uploads. Private browser-based JPG, PNG and WebP compression.
                </p>
            </div>

            <ImageCompressor />

            <p className="text-sm text-muted-foreground mt-6">
                Popular tasks: compress image to 50KB, compress signature to 20KB, passport photo under 50KB, fix photo upload size error.
            </p>

            <RelatedTools />

        </ToolSEOWrapper>
    )
}