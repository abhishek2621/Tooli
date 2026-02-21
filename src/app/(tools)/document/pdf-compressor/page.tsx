import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { PDF_FAQS } from "@/components/shared/faq-section";

const PdfCompressorWrapper = dynamic(
    () => import("@/components/tools/document/pdf-compressor-wrapper").then(mod => mod.PdfCompressorWrapper),
    { 
        loading: () => (
            <div className="space-y-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
            </div>
        )
    }
);
import { SEOContent } from "@/components/shared/seo-content";

export const metadata: Metadata = generateToolMetadata({
    title: 'Compress PDF Online – Free, Ad-Free & Instant',
    description: 'Reduce PDF file size instantly without compromising quality. Ad-free, browser-based PDF compression. No sign-up, no upload necessary.',
    canonical: 'https://www.tooli.in/document/pdf-compressor',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf optimizer', 'online pdf tool', 'free pdf compressor', 'ad-free pdf compressor', 'compress pdf online 2026'],
})

export default function PdfCompressorPage() {
    return (
        <ToolSEOWrapper
            title="Compress PDF Files"
            description="Reduce PDF file size instantly without compromising quality. Ad-free, browser-based PDF compression."
            canonical="https://www.tooli.in/document/pdf-compressor"
            category="UtilitiesApplication"
            faqs={PDF_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">PDF Compressor Online – Free, Instant & Ad-Free</h1>
                <p className="text-lg text-muted-foreground">
                    Reduce file size while optimizing for quality in your browser. No ads, no signup, no watermark.
                </p>
            </div>

            <PdfCompressorWrapper />
        </ToolSEOWrapper>
    )
}
