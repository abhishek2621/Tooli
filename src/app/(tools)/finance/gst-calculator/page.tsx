import type { Metadata } from 'next'
import { GSTCalculatorForm } from '@/components/tools/finance/gst-form'
import { SEOContent } from "@/components/shared/seo-content";

export const metadata: Metadata = {
    title: 'GST Calculator India – Inclusive & Exclusive Tax Calculator',
    description: 'Calculate GST (Goods and Services Tax) for India instantly. Easy calculations for 5%, 12%, 18%, and 28% tax slabs. Determine inclusive and exclusive amounts accurately.',
    keywords: [
        'gst calculator', 'gst calculator india', 'calculate gst inclusive',
        'gst exclusive calculator', 'tax calculator india', 'gst amount formula'
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
        canonical: 'https://www.tooli.in/finance/gst-calculator',
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

            <SEOContent
                title="GST Calculation Guide & Best Practices 2026"
                items={[
                    {
                        heading: "GST Slabs in India",
                        content: "The GST Council defines 5 main tax slabs: 0%, 5%, 12%, 18%, and 28%. Common goods like electronics usually fall under the 18% slab, while luxury items attract 28%."
                    },
                    {
                        heading: "Inclusive vs Exclusive",
                        content: "GST Inclusive means the tax is already added to the price. GST Exclusive is the net price before adding tax. Business owners must distinguish between these for accurate invoicing."
                    },
                    {
                        heading: "CGST and SGST",
                        content: "For intrastate transactions, GST is split equally into Central GST (CGST) and State GST (SGST). For interstate trade, Integrated GST (IGST) is applied."
                    },
                    {
                        heading: "Filing Deadlines",
                        content: "Regular taxpayers must file GSTR-1 and GSTR-3B monthly. Keeping track of tax liability using an accurate calculator helps avoid last-minute filing errors and penalties."
                    },
                    {
                        heading: "Input Tax Credit (ITC)",
                        content: "Registered businesses can claim ITC on tax paid on inputs. Accurate GST calculation is crucial for reconciling invoices and maximizing tax savings."
                    },
                    {
                        heading: "2026 Tax Updates",
                        content: "Stay updated with the latest council revisions. Digital invoicing and AI-driven compliance are now standard, requiring precise real-time tax calculations."
                    }
                ]}
            />
        </div>
    )
}
