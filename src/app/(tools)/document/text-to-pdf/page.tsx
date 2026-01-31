import type { Metadata } from 'next'
import { TextToPdfConverter } from "@/components/tools/document/text-to-pdf-converter";

export const metadata: Metadata = {
    title: 'Free Text to PDF Converter | Convert TXT to PDF Online',
    description: 'Convert plain text files (.txt) or specific text content to high-quality PDF documents quickly. Free, secure, and purely client-side conversion.',
    keywords: [
        'text to pdf', 'txt to pdf', 'convert text to pdf', 'text to pdf converter',
        'online pdf converter', 'create pdf from text', 'free pdf tools'
    ],
    openGraph: {
        title: 'Text to PDF Converter | Tooli',
        description: 'Convert plain text to PDF documents directly in your browser.',
        type: 'website',
    }
}

export default function TextToPdfPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Text to PDF Converter</h1>
                <p className="text-lg text-muted-foreground">
                    Convert text files or typed content into PDF format instantly.
                </p>
            </div>

            <TextToPdfConverter />
            <div className="prose prose-gray max-w-none dark:prose-invert">
                <h2>Why use our Text to PDF Tool?</h2>
                <ul>
                    <li><strong>Privacy First:</strong> No files are uploaded to any server. Conversion happens in your browser.</li>
                    <li><strong>Fast & Free:</strong> generate PDFs in milliseconds without any cost.</li>
                    <li><strong>Simple:</strong> Just paste your text and download.</li>
                </ul>
            </div>
        </div>
    )
}
