import type { Metadata } from 'next'
import { ImageCompressor } from "@/components/tools/image/image-compressor";

export const metadata: Metadata = {
    title: 'Free Image Compressor | Compress JPG, PNG, WEBP Online',
    description: 'Compress images online without losing quality. Reduce image file size by up to 90% for faster website loading. Free and secure.',
    keywords: [
        'image compressor', 'compress jpg', 'compress png', 'online image optimizer',
        'reduce image size', 'photo compression', 'free image tool'
    ]
}

export default function ImageCompressorPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">Image Compressor</h1>
                <p className="text-lg text-muted-foreground">
                    Reduce file size up to 90% while maintaining quality.
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
