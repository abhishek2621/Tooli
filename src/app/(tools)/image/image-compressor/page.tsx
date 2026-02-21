import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { IMAGE_COMPRESSOR_FAQS } from "@/components/shared/faq-section";

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
    title: 'Free Image Compressor – Reduce Image Size Online',
    description: 'Compress images online instantly. Reduce file size by up to 90% without losing quality. Ad-free, client-side compression for WebP, PNG, and JPG.',
    canonical: 'https://www.tooli.in/image/image-compressor',
    keywords: ['image compressor', 'compress image online', 'reduce image size', 'compress under 100kb', 'compress jpg', 'compress png', 'webp compressor'],
})

export default function ImageCompressorPage() {
    return (
        <ToolSEOWrapper
            title="Image Compressor"
            description="Compress images online instantly. Reduce file size by up to 90% without losing quality."
            canonical="https://www.tooli.in/image/image-compressor"
            category="MultimediaApplication"
            faqs={IMAGE_COMPRESSOR_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Free Image Compressor – Reduce Image Size Online</h1>
                <p className="text-lg text-muted-foreground">
                    Optimize your images for the web. Compress JPG, PNG, and WebP files by up to 90% ad-free in your browser.
                </p>
            </div>

            <ImageCompressor />
        </ToolSEOWrapper>
    )
}
