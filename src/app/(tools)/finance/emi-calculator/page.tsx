import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";

const EMICalculator = dynamic(() => import("@/components/tools/finance/emi-calculator").then(mod => mod.EMICalculator), {
    loading: () => <div className="h-[600px] w-full bg-slate-100/50 animate-pulse rounded-xl" />
});

export const metadata: Metadata = generateToolMetadata({
    title: 'EMI Calculator Online – Calculate Monthly Loan EMI',
    description: 'Calculate your monthly EMI, total interest, and repayment schedule for Home, Car, and Personal loans. Accurate loan repayment calculator.',
    canonical: 'https://www.tooli.in/finance/emi-calculator',
    keywords: ['emi calculator online', 'loan emi calculator', 'monthly emi calculator', 'home loan emi calculator', 'loan repayment calculator', 'emi calculator 2026'],
})

export default function EMICalculatorPage() {
    return (
        <ToolSEOWrapper
            title="EMI Calculator"
            description="Calculate your monthly EMI, total interest, and repayment schedule for Home, Car, and Personal loans."
            canonical="https://www.tooli.in/finance/emi-calculator"
            category="FinanceApplication"
        >
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">EMI Calculator Online – Calculate Monthly Loan EMI</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate your monthly loan payments and plan your finances. Free and fast.
                </p>
            </div>

            <EMICalculator />
        </ToolSEOWrapper>
    )
}
