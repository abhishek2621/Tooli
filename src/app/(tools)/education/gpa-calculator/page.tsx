import type { Metadata } from 'next'
import { GpaCalculator } from "@/components/tools/education/gpa-calculator";

export const metadata: Metadata = {
    title: 'Free GPA Calculator | Calculate College Grade Point Average',
    description: 'Calculate your semester and cumulative GPA easily. Supports 4.0 scale and custom credits.',
    keywords: ['gpa calculator', 'college gpa', 'semester gpa', 'cloud gpa calculator', 'grade point average'],
}

export default function GpaCalculatorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">GPA Calculator</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate your semester grades and grade point average.
                </p>
            </div>

            <GpaCalculator />
        </div>
    )
}
