import type { Metadata } from 'next'
import { GSTCalculatorForm } from '@/components/tools/finance/gst-form'

export const metadata: Metadata = {
    title: 'GST Calculator India – Inclusive & Exclusive Tax Calculator',
    description: 'Calculate GST (Goods and Services Tax) for India instantly. Easy calculations for 5%, 12%, 18%, and 28% tax slabs. Determine inclusive and exclusive amounts accurately.',
    keywords: [
        'gst calculator', 'gst calculator india', 'calculate gst inclusive',
        'gst exclusive calculator', 'tax calculator india', 'gst amount formula'
    ],
    alternates: {
        canonical: '/finance/gst-calculator',
    },
    openGraph: {
        title: 'GST Calculator India – Inclusive & Exclusive Tax Calculator',
        description: 'Calculate GST inclusive and exclusive amounts online instantly.',
        type: 'website',
    }
}

export default function GSTCalculatorPage() {
    return (
        <div className="space-y-6">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Tooli GST Calculator",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "Any",
                        "description": "Calculate Goods and Services Tax (GST) inclusive and exclusive amounts for Indian tax slabs.",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "INR"
                        }
                    })
                }}
            />
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">GST Calculator India – Inclusive & Exclusive</h1>
                <p className="text-lg text-muted-foreground">
                    Instantly calculate Goods and Services Tax (GST). Select your tax slab (5%, 12%, 18%, 28%) to see final amounts.
                </p>
            </div>

            <div className="max-w-xl">
                <GSTCalculatorForm />
            </div>

            <div className="prose prose-gray max-w-none dark:prose-invert">
                <h2>How to use this GST Calculator</h2>
                <p>1. Enter the net amount.</p>
                <p>2. Select the applicable GST Slab.</p>
                <p>3. View the tax breakup instantly.</p>
            </div>
        </div>
    )
}
