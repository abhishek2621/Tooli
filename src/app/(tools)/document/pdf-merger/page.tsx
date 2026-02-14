import type { Metadata } from 'next'
import dynamic from 'next/dynamic';

const PdfMerger = dynamic(() => import("@/components/tools/document/pdf-merger").then(mod => mod.PdfMerger));

export const metadata: Metadata = {
    title: 'Merge PDF Files Online – Combine PDFs for Free',
    description: 'Merge multiple PDF files into one document instantly. Free, secure, and purely client-side. No signup required.',
    keywords: [
        'merge pdf online', 'combine pdf files', 'pdf merger without watermark',
        'join pdf files free', 'merge pdf no signup'
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/document/pdf-merger',
    },
}

export default function PdfMergerPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Merge PDF Files Online – Combine PDFs for Free</h1>
                <p className="text-lg text-muted-foreground">
                    Combine multiple PDF files into a single document. No signup, no watermark.
                </p>
            </div>

            <PdfMerger />
        </div>
    )
}
