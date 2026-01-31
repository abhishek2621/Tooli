import type { Metadata } from 'next'
import { EMICalculator } from "@/components/tools/finance/emi-calculator";

export const metadata: Metadata = {
    title: 'Loan EMI Calculator | Home, Car & Personal Loan',
    description: 'Calculate your monthly EMI, total interest, and repayment schedule for Home, Car, and Personal loans.',
    keywords: [
        'emi calculator', 'loan calculator', 'home loan emi', 'car loan emi',
        'personal loan emi', 'interest calculator'
    ]
}

export default function EMICalculatorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Loan EMI Calculator</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate your monthly loan payments and plan your finances.
                </p>
            </div>

            <EMICalculator />
        </div>
    )
}
