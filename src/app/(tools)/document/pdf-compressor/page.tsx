import type { Metadata } from 'next'
import dynamic from 'next/dynamic';

const PdfCompressorWrapper = dynamic(() => import("@/components/tools/document/pdf-compressor-wrapper").then(mod => mod.PdfCompressorWrapper));
import { SEOContent } from "@/components/shared/seo-content";

export const metadata: Metadata = {
    title: 'Compress PDF Online – Free, Ad-Free & Instant',
    description: 'Reduce PDF file size instantly without compromising quality. Ad-free, browser-based PDF compression. No sign-up, no upload necessary.',
    keywords: [
        'compress pdf', 'reduce pdf size', 'shrink pdf',
        'pdf optimizer', 'online pdf tool', 'free pdf compressor', 'ad-free pdf compressor'
    ],
    alternates: {
        canonical: '/document/pdf-compressor',
    },
}

export default function PdfCompressorPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">PDF Compressor Online – Free, Instant & Ad-Free</h1>
                <p className="text-lg text-muted-foreground">
                    Reduce file size while optimizing for quality in your browser. No ads, no signup, no watermark.
                </p>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Free PDF Compressor",
                        "applicationCategory": "UtilitiesApplication",
                        "operatingSystem": "Any",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "description": "Compress and optimize PDF files online for free. Reduce file size efficiently while maintaining quality."
                    })
                }}
            />
            <PdfCompressorWrapper />

            <SEOContent
                title="PDF Compression Best Practices 2026"
                items={[
                    {
                        heading: "Compression Levels",
                        content: "Choose low compression for documents with text, high for image-heavy PDFs. Balance file size with readability for optimal results."
                    },
                    {
                        heading: "Email Attachments",
                        content: "Compress PDFs under 10MB for email compatibility. Most email providers limit attachments to 25MB, smaller files send faster."
                    },
                    {
                        heading: "Image Optimization",
                        content: "PDF compression reduces embedded image quality. Use medium settings to maintain readability while achieving 40-60% size reduction."
                    },
                    {
                        heading: "Document Quality",
                        content: "Preserve text clarity with smart compression algorithms. Our tool maintains font sharpness while reducing file size significantly."
                    },
                    {
                        heading: "Privacy & Security",
                        content: "Client-side processing ensures your PDFs never leave your device. No file uploads, no data storage, complete confidentiality guaranteed."
                    },
                    {
                        heading: "Use Cases",
                        content: "Ideal for resumes, invoices, presentations, and reports. Compressed PDFs load faster, save bandwidth, and improve user experience."
                    }
                ]}
            />
        </div>
    )
}
