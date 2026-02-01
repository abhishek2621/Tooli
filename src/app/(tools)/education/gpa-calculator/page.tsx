import type { Metadata } from 'next'
import { GpaCalculator } from "@/components/tools/education/gpa-calculator";

export const metadata: Metadata = {
    title: 'GPA Calculator Online – Calculate Your Grade Point Average',
    description: 'Calculate your semester and cumulative GPA easily. Supports 4.0 scale and custom credits. Free GPA calculator for students.',
    keywords: ['gpa calculator online', 'college gpa calculator', 'semester gpa calculator', 'grade point average calculator'],
}

export default function GpaCalculatorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">GPA Calculator Online – Calculate Your Grade Point Average</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate your semester grades and grade point average.
                </p>
            </div>

            <GpaCalculator />
        </div>
    )
}
