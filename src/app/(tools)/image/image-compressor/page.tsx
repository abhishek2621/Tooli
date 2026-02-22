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
    title: 'Free Image Compressor – Reduce Image Size Online (Privacy First)',
    description: 'Compress images online instantly. Reduce file size by up to 90% without losing quality. Ad-free, client-side compression for WebP, PNG, and JPG. 100% private.',
    canonical: 'https://www.tooli.in/image/image-compressor',
    keywords: ['image compressor', 'compress image online', 'reduce image size for website', 'compress jpg', 'compress png', 'webp compressor', 'privacy first image compressor'],
})

export default function ImageCompressorPage() {
    return (
        <ToolSEOWrapper
            title="Image Compressor"
            description="Compress images online instantly. Reduce file size by up to 90% without losing quality."
            canonical="https://www.tooli.in/image/image-compressor"
            category="MultimediaApplication"
            showRelatedAtBottom={false}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Free Image Compressor – Reduce Image Size Online</h1>
                <p className="text-lg text-muted-foreground">
                    Optimize your images for the web. Compress JPG, PNG, and WebP files by up to 90% ad-free in your browser.
                </p>
            </div>

            <ImageCompressor />

            <RelatedTools />

            <SEOContent
                title="Deep Dive: Advanced Privacy-First Image Compression"
                sections={[
                    {
                        title: "Why Use Tooli's Image Compressor?",
                        content: [
                            "In an era where data privacy is paramount, Tooli's image compressor stands out by processing every pixel locally in your browser. Unlike traditional tools that upload your sensitive photos to remote servers, we utilize cutting-edge WebAssembly technology to deliver professional-grade compression without your data ever leaving your device.",
                            "Whether you're a web developer looking to fix LCP issues on your website, or a student needing to reduce image size for an exam application, our tool provides the perfect balance of speed, quality, and security."
                        ]
                    },
                    {
                        title: "How Our Local Compression Works",
                        content: "When you drop an image here, your browser's dedicated processing power takes over. We use MozJPEG and Oxygen encoding algorithms to strip unnecessary metadata and optimize color profiles while maintaining visual fidelity.",
                        subsections: [
                            { title: "Browser-Level Processing", content: "No server-side uploads mean your images are never stored or logged." },
                            { title: "Lossless Optimization", content: "Strip hidden metadata and invisible overhead without affecting the image detail." },
                            { title: "Smart Quality Scaling", content: "Intelligent algorithms choose the best compression ratio for your specific file type." },
                            { title: "Privacy Guarantee", content: "Encrypted execution within your browser's sandboxed environment." }
                        ]
                    },
                    {
                        title: "Common Use Cases for Image Compression",
                        content: "Thousands of users rely on Tooli for daily digital tasks that require high-performance optimization:",
                        subsections: [
                            { title: "Website SEO Optimization", content: "Compress images for website performance to improve Google Core Web Vitals rankings." },
                            { title: "Exam & Job Applications", content: "Easily reduce image size to under 100KB or 50KB for government and academic portals." },
                            { title: "Email Attachments", content: "Shrink multi-megabyte photos into lightweight files for fast email sharing." },
                            { title: "Mobile Performance", content: "Optimize graphics for mobile apps to reduce data consumption for your users." }
                        ]
                    },
                    {
                        title: "Tooli vs. Cloud-Based Alternatives",
                        content: [
                            "Most 'Free' online compressors monetize your data or show intrusive ads. Tooli is a lightweight, ad-free alternative that prioritizes user experience above all else.",
                            "By not using server-side processing, we eliminate the risks of data breaches and provide a much faster experience for large batch processing."
                        ]
                    }
                ]}
            />
        </ToolSEOWrapper>
    )
}
