import type { Metadata } from 'next'
import { ImageConverter } from "@/components/tools/image/image-converter";

export const metadata: Metadata = {
    title: 'Image Converter Online – Convert JPG, PNG & WEBP',
    description: 'Convert images between formats (JPG, PNG, WEBP). Free online image converter with no file size limit.',
    keywords: ['image format converter', 'jpg to png converter', 'png to webp converter', 'convert images online', 'image converter free online'],
}

export default function ImageConverterPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 text-left mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image Converter Online – Convert JPG, PNG & WEBP</h1>
                <p className="text-lg text-muted-foreground">
                    Change image file formats easily (JPG, PNG, WEBP). Works in browser.
                </p>
            </div>

            <ImageConverter />
        </div>
    )
}
