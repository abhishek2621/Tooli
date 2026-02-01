import type { Metadata } from 'next'
import { EMICalculator } from "@/components/tools/finance/emi-calculator";

export const metadata: Metadata = {
    title: 'EMI Calculator Online – Calculate Monthly Loan EMI',
    description: 'Calculate your monthly EMI, total interest, and repayment schedule for Home, Car, and Personal loans. Accurate loan repayment calculator.',
    keywords: [
        'emi calculator online', 'loan emi calculator', 'monthly emi calculator',
        'home loan emi calculator', 'loan repayment calculator'
    ]
}

export default function EMICalculatorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">EMI Calculator Online – Calculate Monthly Loan EMI</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate your monthly loan payments and plan your finances. Free and fast.
                </p>
            </div>

            <EMICalculator />
        </div>
    )
}
