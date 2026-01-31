import type { Metadata } from 'next'
import { ImageConverter } from "@/components/tools/image/image-converter";

export const metadata: Metadata = {
    title: 'Free Image Converter | Convert JPG, PNG, WEBP',
    description: 'Convert images between extensions online. Change JPG to PNG, PNG to WEBP, and more instantly.',
    keywords: ['image converter', 'jpg to png', 'png to jpg', 'webp converter', 'change image extension'],
}

export default function ImageConverterPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image Converter</h1>
                <p className="text-lg text-muted-foreground">
                    Change image file formats easily (JPG, PNG, WEBP).
                </p>
            </div>

            <ImageConverter />
        </div>
    )
}
