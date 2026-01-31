import type { Metadata } from 'next'
import { AgeCalculator } from "@/components/tools/utility/age-calculator";

export const metadata: Metadata = {
    title: 'Age Calculator | Calculate Your Exact Age',
    description: 'Calculate your age in years, months, weeks, and days based on your date of birth.',
}

export default function AgeCalculatorPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 text-center items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Age Calculator</h1>
                <p className="text-lg text-muted-foreground">
                    Find out your exact age down to the minute.
                </p>
            </div>

            <AgeCalculator />
        </div>
    )
}
