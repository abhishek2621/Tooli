import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { IMAGE_TO_PDF_FAQS } from "@/components/shared/faq-section";

const ImageToPdf = dynamic(
    () => import("@/components/tools/image/image-to-pdf").then(mod => mod.ImageToPdf),
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
    title: 'Image to PDF Converter Online – Free & Ad-Free',
    description: 'Convert JPG, PNG to PDF instantly. Ad-free, works in browser, no upload necessary for privacy. No sign-up.',
    canonical: 'https://www.tooli.in/image/image-to-pdf',
    keywords: ['image to pdf converter', 'jpg to pdf online', 'png to pdf converter', 'convert image to pdf free', 'image to pdf without watermark', 'ad-free image to pdf', 'image to pdf 2026'],
})

export default function ImageToPdfPage() {
    return (
        <ToolSEOWrapper
            title="Image to PDF Converter"
            description="Convert JPG, PNG to PDF instantly. Ad-free, works in browser, no upload necessary for privacy."
            canonical="https://www.tooli.in/image/image-to-pdf"
            category="MultimediaApplication"
            faqs={IMAGE_TO_PDF_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image to PDF Converter Online – Free & Ad-Free</h1>
                <p className="text-lg text-muted-foreground">
                    Turn your images into professional PDF documents instantly. No ads, no signup, no watermark.
                </p>
            </div>

            <ImageToPdf />
        </ToolSEOWrapper>
    )
}
