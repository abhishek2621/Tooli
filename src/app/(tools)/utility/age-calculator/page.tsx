import type { Metadata } from 'next'
import { AgeCalculator } from "@/components/tools/utility/age-calculator";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";

export const metadata: Metadata = generateToolMetadata({
    title: 'Age Calculator – Calculate Exact Age from Date of Birth',
    description: 'Calculate your exact age in years, months, days, and even minutes from your date of birth. Free, private, and instant age calculation tool.',
    canonical: 'https://www.tooli.in/utility/age-calculator',
    keywords: ['age calculator', 'calculate age', 'date of birth calculator', 'exact age', 'how old am i', 'age calculator 2026'],
})

export default function AgeCalculatorPage() {
    return (
        <ToolSEOWrapper
            title="Age Calculator"
            description="Calculate your exact age in years, months, days, and even minutes from your date of birth."
            canonical="https://www.tooli.in/utility/age-calculator"
            category="UtilitiesApplication"
        >
            <div className="flex flex-col gap-2 text-left items-start mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Age Calculator – Calculate Exact Age</h1>
                <p className="text-lg text-muted-foreground">
                    Find out exactly how old you are in years, months, weeks, days, and minutes based on your DOB.
                </p>
            </div>

            <AgeCalculator />
        </ToolSEOWrapper>
    )
}
