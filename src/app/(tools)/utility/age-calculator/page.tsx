import type { Metadata } from 'next'
import { AgeCalculator } from "@/components/tools/utility/age-calculator";

export const metadata: Metadata = {
    title: 'Age Calculator – Calculate Exact Age from Date of Birth',
    description: 'Calculate your exact age in years, months, days, and even minutes from your date of birth. Free, private, and instant age calculation tool.',
    keywords: ['age calculator', 'calculate age', 'date of birth calculator', 'exact age', 'how old am i'],
    alternates: {
        canonical: '/utility/age-calculator',
    },
}

export default function AgeCalculatorPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Tooli Age Calculator",
                        "applicationCategory": "UtilitiesApplication",
                        "operatingSystem": "Any",
                        "description": "Calculate exact age from date of birth in years, months, and days.",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        }
                    })
                }}
            />
            <div className="flex flex-col gap-2 text-left items-start mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Age Calculator – Calculate Exact Age</h1>
                <p className="text-lg text-muted-foreground">
                    Find out exactly how old you are in years, months, weeks, days, and minutes based on your DOB.
                </p>
            </div>

            <AgeCalculator />
        </div>
    )
}
