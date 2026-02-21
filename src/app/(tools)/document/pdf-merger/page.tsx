import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { PDF_MERGER_FAQS } from "@/components/shared/faq-section";

const PdfMerger = dynamic(
    () => import("@/components/tools/document/pdf-merger").then(mod => mod.PdfMerger),
    { 
        loading: () => (
            <div className="space-y-6">
                <Skeleton className="h-96 rounded-xl" />
            </div>
        )
    }
);

export const metadata: Metadata = generateToolMetadata({
    title: 'Merge PDF Files Online – Combine PDFs for Free',
    description: 'Merge multiple PDF files into one document instantly. Free, secure, and purely client-side. No signup required. Combine PDFs without watermarks.',
    canonical: 'https://www.tooli.in/document/pdf-merger',
    keywords: ['merge pdf online', 'combine pdf files', 'pdf merger without watermark', 'join pdf files free', 'merge pdf no signup'],
})

export default function PdfMergerPage() {
    return (
        <ToolSEOWrapper
            title="Merge PDF Files"
            description="Merge multiple PDF files into one document instantly. Free, secure, and purely client-side."
            canonical="https://www.tooli.in/document/pdf-merger"
            category="UtilitiesApplication"
            faqs={PDF_MERGER_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Merge PDF Files Online – Combine PDFs for Free</h1>
                <p className="text-lg text-muted-foreground">
                    Combine multiple PDF files into a single document. No signup, no watermark.
                </p>
            </div>

            <PdfMerger />
        </ToolSEOWrapper>
    )
}
