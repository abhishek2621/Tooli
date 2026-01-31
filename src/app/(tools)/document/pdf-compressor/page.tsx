import type { Metadata } from 'next'
import { PdfCompressorWrapper } from "@/components/tools/document/pdf-compressor-wrapper";

export const metadata: Metadata = {
    title: 'Free PDF Compressor | Reduce PDF File Size',
    description: 'Compress PDF files online for free. Optimize documents for faster sharing while maintaining quality.',
    keywords: [
        'pdf compressor', 'compress pdf', 'reduce pdf size', 'optimize pdf',
        'free pdf tool', 'online pdf compressor'
    ]
}

export default function PdfCompressorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">Compress PDF</h1>
                <p className="text-lg text-muted-foreground">
                    Reduce file size while optimizing for quality.
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
