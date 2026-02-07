import type { Metadata } from 'next'
import { ImageCompressor } from "@/components/tools/image/image-compressor";
import { SEOContent } from "@/components/shared/seo-content";

export const metadata: Metadata = {
    title: 'Free Image Compressor – Reduce Image Size Online (WebP, PNG, JPG)',
    description: 'Compress images online instantly. Reduce file size by up to 90% without losing quality. Secure, client-side compression for WebP, PNG, and JPG. No sign-up.',
    keywords: [
        'image compressor', 'compress image online', 'reduce image size',
        'compress under 100kb', 'compress under 30kb', 'compress jpg', 'compress png', 'webp compressor'
    ],
    alternates: {
        canonical: '/image/image-compressor',
    },
}

export default function ImageCompressorPage() {
    return (
        <div className="space-y-6 w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Tooli Image Compressor",
                        "applicationCategory": "MultimediaApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "description": "Compress and optimize images online without losing quality. Supports JPG, PNG, and WebP formats."
                    })
                }}
            />
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Free Image Compressor – Reduce Image Size Online</h1>
                <p className="text-lg text-muted-foreground">
                    Optimize your images for the web. Compress JPG, PNG, and WebP files by up to 90% securely in your browser.
                </p>
            </div>

            <ImageCompressor />


            <SEOContent
                title="Image Compression Best Practices 2026"
                items={[
                    {
                        heading: "WebP Format",
                        content: "Modern WebP delivers 30% better compression than JPEG with superior quality. Essential for Core Web Vitals and page speed optimization."
                    },
                    {
                        heading: "Target File Size",
                        content: "Compress images under 100KB for hero sections, under 30KB for thumbnails. Smaller files boost SEO rankings and mobile performance."
                    },
                    {
                        heading: "Quality vs Size",
                        content: "Use 80-85% quality for photos, 90-95% for graphics. Maintain visual quality while maximizing compression ratio."
                    },
                    {
                        heading: "Batch Processing",
                        content: "Compress multiple images simultaneously to save time. Bulk optimization improves workflow efficiency for web developers."
                    },
                    {
                        heading: "Privacy First",
                        content: "100% client-side compression. Your images never upload to servers, ensuring complete data privacy and GDPR compliance."
                    },
                    {
                        heading: "SEO Impact",
                        content: "Compressed images improve page load speed, reduce bounce rates, and boost Google rankings. Critical for mobile-first indexing."
                    }
                ]}
            />
        </div>
    )
}
