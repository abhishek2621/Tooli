import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { TEXT_TO_PDF_FAQS } from "@/components/shared/faq-section";

const TextToPdfConverter = dynamic(
    () => import("@/components/tools/document/text-to-pdf-converter").then(mod => mod.TextToPdfConverter),
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
    title: 'Text to PDF Converter – Convert Text Files Online',
    description: 'Convert plain text files (.txt) or specific text content to high-quality PDF documents quickly. Free, secure. Works in browser.',
    canonical: 'https://www.tooli.in/document/text-to-pdf',
    keywords: ['text to pdf online', 'convert text to pdf free', 'txt to pdf converter', 'plain text to pdf', 'online pdf converter', 'text to pdf 2026'],
})

export default function TextToPdfPage() {
    return (
        <ToolSEOWrapper
            title="Text to PDF Converter"
            description="Convert plain text files (.txt) or specific text content to high-quality PDF documents quickly."
            canonical="https://www.tooli.in/document/text-to-pdf"
            category="UtilitiesApplication"
            faqs={TEXT_TO_PDF_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Text to PDF Converter – Convert Text Files Online</h1>
                <p className="text-lg text-muted-foreground">
                    Convert text files or typed content into PDF format instantly. No signup, privacy-first.
                </p>
            </div>

            <TextToPdfConverter />
            <div className="prose prose-gray max-w-none dark:prose-invert">
                <h2>Why use our Text to PDF Tool?</h2>
                <ul>
                    <li><strong>Privacy First:</strong> No files are uploaded to any server. Conversion happens in your browser.</li>
                    <li><strong>Fast & Free:</strong> generate PDFs in milliseconds without any cost.</li>
                    <li><strong>Simple:</strong> Just paste your text and download.</li>
                </ul>
            </div>
        </ToolSEOWrapper>
    )
}
