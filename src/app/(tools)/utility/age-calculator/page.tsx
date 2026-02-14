import type { Metadata } from 'next'
import { AgeCalculator } from "@/components/tools/utility/age-calculator";
import { SEOContent } from "@/components/shared/seo-content";

export const metadata: Metadata = {
    title: 'Age Calculator – Calculate Exact Age from Date of Birth',
    description: 'Calculate your exact age in years, months, days, and even minutes from your date of birth. Free, private, and instant age calculation tool.',
    keywords: ['age calculator', 'calculate age', 'date of birth calculator', 'exact age', 'how old am i'],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: '/utility/age-calculator',
    },
}

export default function AgeCalculatorPage() {
    return (
        <div className="space-y-6 w-full">
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

            <SEOContent
                title="Exact Age Calculation Benefits 2026"
                items={[
                    {
                        heading: "Precise Accuracy",
                        content: "Calculate your chronological age down to the minute. Perfect for legal documents, retirement planning, or just curious milestones."
                    },
                    {
                        heading: "Leap Year Handling",
                        content: "Our algorithm accurately accounts for leap years (including 2024 and 2028), ensuring your day count is never off by a single digit."
                    },
                    {
                        heading: "Life Phase Tracking",
                        content: "Understand your age in different units: weeks for health tracking, months for infant development, and days for goal setting."
                    },
                    {
                        heading: "Next Birthday Countdown",
                        content: "Get an exact countdown to your next big celebration. Plan ahead for birthdays and anniversaries with zero guesswork."
                    },
                    {
                        heading: "Privacy Guaranteed",
                        content: "Your date of birth is processed locally in your browser. We never store or transmit personal data, making it 100% secure."
                    },
                    {
                        heading: "Shareable Stats",
                        content: "Visualize your age in fun ways, like total hours lived or upcoming half-birthdays. Share interesting milestones with friends and family."
                    }
                ]}
            />
        </div>
    )
}
