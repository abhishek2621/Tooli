import type { Metadata } from 'next'
import dynamic from 'next/dynamic';

const TextToPdfConverter = dynamic(() => import("@/components/tools/document/text-to-pdf-converter").then(mod => mod.TextToPdfConverter));

export const metadata: Metadata = {
    title: 'Text to PDF Converter – Convert Text Files Online',
    description: 'Convert plain text files (.txt) or specific text content to high-quality PDF documents quickly. Free, secure. Works in browser.',
    keywords: [
        'text to pdf online', 'convert text to pdf free', 'txt to pdf converter',
        'plain text to pdf', 'online pdf converter'
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
        canonical: 'https://www.tooli.in/document/text-to-pdf',
    },
    openGraph: {
        title: 'Text to PDF Converter – Convert Text Files Online',
        description: 'Convert plain text to PDF documents directly in your browser.',
        type: 'website',
    }
}

export default function TextToPdfPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Text to PDF Converter – Convert Text Files Online</h1>
                <p className="text-lg text-muted-foreground">
                    Convert text files or typed content into PDF format instantly. No signup, privacy-first.
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
