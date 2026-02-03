import type { Metadata } from 'next'
import { PdfCompressorWrapper } from "@/components/tools/document/pdf-compressor-wrapper";

export const metadata: Metadata = {
    title: 'Compress PDF Online – Reduce File Size for Free',
    description: 'Reduce PDF file size instantly without compromising quality. Secure, browser-based PDF compression. Ideal for email attachments and uploads.',
    keywords: [
        'compress pdf', 'reduce pdf size', 'shrink pdf',
        'pdf optimizer', 'online pdf tool', 'free pdf compressor'
    ],
    alternates: {
        canonical: '/document/pdf-compressor',
    },
}

export default function PdfCompressorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">PDF Compressor Online – Reduce File Size Without Quality Loss</h1>
                <p className="text-lg text-muted-foreground">
                    Reduce file size while optimizing for quality. No signup, no watermark.
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
        </div>
    )
}
