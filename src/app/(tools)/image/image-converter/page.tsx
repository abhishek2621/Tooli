import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { IMAGE_CONVERTER_FAQS } from "@/components/shared/faq-section";

const ImageConverter = dynamic(
    () => import("@/components/tools/image/image-converter").then(mod => mod.ImageConverter),
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
    title: 'Image Converter Online – Convert JPG, PNG & WEBP',
    description: 'Convert images between formats (JPG, PNG, WEBP). Free online image converter with no file size limit.',
    canonical: 'https://www.tooli.in/image/image-converter',
    keywords: ['image format converter', 'jpg to png converter', 'png to webp converter', 'convert images online', 'image converter free online', 'image converter 2026'],
})

export default function ImageConverterPage() {
    return (
        <ToolSEOWrapper
            title="Image Converter"
            description="Convert images between formats (JPG, PNG, WEBP). Free online image converter with no file size limit."
            canonical="https://www.tooli.in/image/image-converter"
            category="MultimediaApplication"
            faqs={IMAGE_CONVERTER_FAQS}
        >
            <div className="flex flex-col gap-2 text-left mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image Converter Online – Convert JPG, PNG & WEBP</h1>
                <p className="text-lg text-muted-foreground">
                    Change image file formats easily (JPG, PNG, WEBP). Works in browser.
                </p>
            </div>


            <ImageConverter />
        </ToolSEOWrapper>
    )
}
