import type { Metadata } from 'next'
import { PdfMerger } from "@/components/tools/document/pdf-merger";

export const metadata: Metadata = {
    title: 'Free PDF Merger | Combine PDF Files Online',
    description: 'Merge multiple PDF files into one document instantly. Free, secure, and purely client-side.',
    keywords: [
        'pdf merger', 'combine pdf', 'merge pdf files', 'join pdfs',
        'combine pdf online', 'free pdf tool'
    ]
}

export default function PdfMergerPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">PDF Merger</h1>
                <p className="text-lg text-muted-foreground">
                    Combine multiple PDF files into a single document.
                </p>
            </div>

            <PdfMerger />
        </div>
    )
}
