import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { SEOContent } from "@/components/shared/seo-content";
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
        'compress image to 50kb',
        'compress image to 100kb',
        'compress signature to 20kb',
        'photo upload size error fix',
        'exam photo compressor',
        'passport photo under 50kb',
        'reduce image size without blur'
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
                    Compress Image to Size (20KB, 50KB, 100KB) – Free Photo & Signature Compressor | FAST | SECURE | NO ADS
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

            <SEOContent
                title="Photo & Signature Compression for Online Forms and Upload Errors"
                sections={[
                    {
                        title: "Compress Images to Meet Upload Size Limits",
                        content: [
                            "Many online forms reject images because of strict size limits such as 50KB for photos or 20KB for signatures. Tooli helps you instantly compress images to required sizes without making them blurry or unreadable.",
                            "Our browser-based compressor is ideal for government exam applications, job portals, and university admission forms where upload errors are common."
                        ]
                    },
                    {
                        title: "Fix Photo Upload Errors Instantly",
                        content: "If your image shows errors like file too large, upload failed, or invalid size, compressing it usually solves the issue.",
                        subsections: [
                            { title: "Compress to Exact Size", content: "Reduce image size to 50KB, 100KB, or other required limits." },
                            { title: "Maintain Readability", content: "Preserve face clarity and signature sharpness during compression." },
                            { title: "Mobile Friendly", content: "Quickly fix upload issues while filling forms on mobile." },
                            { title: "No Registration Needed", content: "Instant compression without login or waiting." }
                        ]
                    },
                    {
                        title: "Why Tooli Compressor Performs Better",
                        content: [
                            "Unlike many tools filled with ads and slow server uploads, Tooli performs compression directly in your browser. This provides faster results, complete privacy, and smoother batch processing.",
                            "The tool is especially helpful for students and applicants who need repeated compression while completing multiple forms."
                        ]
                    },
                    {
                        title: "Common Uses",
                        subsections: [
                            { title: "Government Exam Applications", content: "Prepare passport photo and signature images for online exam forms." },
                            { title: "Job & Internship Forms", content: "Reduce image size for resume portals and application websites." },
                            { title: "Website Optimization", content: "Improve page speed and Core Web Vitals with lighter images." },
                            { title: "Email & Document Uploads", content: "Shrink large photos for quick sharing and submissions." }
                        ]
                    }
                ]}
            />
        </ToolSEOWrapper>
    )
}