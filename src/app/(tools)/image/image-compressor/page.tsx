import type { Metadata } from 'next'
import { ImageCompressor } from "@/components/tools/image/image-compressor";

export const metadata: Metadata = {
    title: 'Free Image Compressor – Reduce Image Size Online (WebP, PNG, JPG)',
    description: 'Compress images online instantly. Reduce file size by up to 90% without losing quality. Secure, client-side compression for WebP, PNG, and JPG. No sign-up.',
    keywords: [
        'image compressor', 'compress image online', 'reduce image size',
        'optimize images for web', 'compress jpg', 'compress png', 'webp compressor'
    ],
    alternates: {
        canonical: '/image/image-compressor',
    },
}

export default function ImageCompressorPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
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
            <div className="flex flex-col gap-2 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Free Image Compressor – Reduce Image Size Online</h1>
                <p className="text-lg text-muted-foreground">
                    Optimize your images for the web. Compress JPG, PNG, and WebP files by up to 90% securely in your browser.
                </p>
            </div>

            <ImageCompressor />

            <div className="prose prose-gray max-w-none dark:prose-invert mt-12 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl">
                <h3>Best Practices for Image Compression</h3>
                <ul>
                    <li><strong>WebP Format:</strong> For the web, modern WebP format offers better compression than JPG or PNG.</li>
                    <li><strong>Target Size:</strong> Aim for under 100KB for hero images and under 30KB for smaller assets.</li>
                    <li><strong>Privacy:</strong> We use client-side compression. Your photos never leave your device to our server.</li>
                </ul>
            </div>
        </div>
    )
}
