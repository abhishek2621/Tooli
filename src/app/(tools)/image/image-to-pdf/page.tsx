import type { Metadata } from 'next'
import { ImageToPdf } from "@/components/tools/image/image-to-pdf";

export const metadata: Metadata = {
    title: 'Image to PDF Converter Online – Free & Secure',
    description: 'Convert JPG, PNG to PDF instantly. Works in browser, no upload necessary for privacy.',
    keywords: [
        'image to pdf converter', 'jpg to pdf online', 'png to pdf converter',
        'convert image to pdf free', 'image to pdf without watermark'
    ]
}

export default function ImageToPdfPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image to PDF Converter Online – Free & Secure</h1>
                <p className="text-lg text-muted-foreground">
                    Turn your images into professional PDF documents. No signup, no watermark.
                </p>
            </div>

            <ImageToPdf />
        </div>
    )
}
