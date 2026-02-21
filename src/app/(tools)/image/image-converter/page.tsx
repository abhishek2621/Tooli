import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

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

export const metadata: Metadata = {
    title: 'Image Converter Online – Convert JPG, PNG & WEBP',
    description: 'Convert images between formats (JPG, PNG, WEBP). Free online image converter with no file size limit.',
    keywords: ['image format converter', 'jpg to png converter', 'png to webp converter', 'convert images online', 'image converter free online'],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/image/image-converter',
    },
}

export default function ImageConverterPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 text-left mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image Converter Online – Convert JPG, PNG & WEBP</h1>
                <p className="text-lg text-muted-foreground">
                    Change image file formats easily (JPG, PNG, WEBP). Works in browser.
                </p>
            </div>


            <ImageConverter />

            <SEOContent
                title="Image Format Conversion Guide 2026"
                items={[
                    {
                        heading: "JPG to WebP",
                        content: "Convert JPEG to WebP for 25-35% smaller file sizes. WebP supports both lossy and lossless compression, ideal for modern websites."
                    },
                    {
                        heading: "PNG to WebP",
                        content: "WebP maintains transparency like PNG but with 26% smaller files. Perfect for logos, icons, and graphics with alpha channels."
                    },
                    {
                        heading: "WebP to JPG",
                        content: "Convert WebP to JPEG for legacy browser compatibility. Useful when sharing images on platforms without WebP support."
                    },
                    {
                        heading: "Batch Conversion",
                        content: "Convert multiple images at once to save time. Bulk processing essential for migrating entire websites to modern formats."
                    },
                    {
                        heading: "Quality Preservation",
                        content: "Lossless conversion maintains original quality. Choose format based on use case: WebP for web, PNG for editing, JPG for photos."
                    },
                    {
                        heading: "Browser Support 2026",
                        content: "WebP now supported by 97% of browsers. Safe to use as primary format with JPG fallback for maximum compatibility."
                    }
                ]}
            />
        </div>
    )
}
