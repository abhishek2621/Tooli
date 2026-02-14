import type { Metadata } from 'next'
import dynamic from 'next/dynamic';

const ImageToPdf = dynamic(() => import("@/components/tools/image/image-to-pdf").then(mod => mod.ImageToPdf));

export const metadata: Metadata = {
    title: 'Image to PDF Converter Online – Free & Ad-Free',
    description: 'Convert JPG, PNG to PDF instantly. Ad-free, works in browser, no upload necessary for privacy. No sign-up.',
    keywords: [
        'image to pdf converter', 'jpg to pdf online', 'png to pdf converter',
        'convert image to pdf free', 'image to pdf without watermark', 'ad-free image to pdf'
    ]
}

export default function ImageToPdfPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Image to PDF Converter Online – Free & Ad-Free</h1>
                <p className="text-lg text-muted-foreground">
                    Turn your images into professional PDF documents instantly. No ads, no signup, no watermark.
                </p>
            </div>

            <ImageToPdf />
        </div>
    )
}
