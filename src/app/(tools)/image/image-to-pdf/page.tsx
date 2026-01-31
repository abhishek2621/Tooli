import type { Metadata } from 'next'
import { ImageToPdf } from "@/components/tools/image/image-to-pdf";

export const metadata: Metadata = {
    title: 'Image to PDF Converter | JPG, PNG to PDF',
    description: 'Convert images to PDF format instantly. Supports JPG, PNG, and WebP.',
    keywords: [
        'image to pdf', 'jpg to pdf', 'combine images to pdf', 'merge photos to pdf',
        'free pdf converter', 'online image converter'
    ]
}

export default function ImageToPdfPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image to PDF Converter</h1>
                <p className="text-lg text-muted-foreground">
                    Turn your images into professional PDF documents.
                </p>
            </div>

            <ImageToPdf />
        </div>
    )
}
