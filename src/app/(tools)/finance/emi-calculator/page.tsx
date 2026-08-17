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

            {/* Rich SEO Content */}
            <div className="mt-16 space-y-12 border-t pt-12 text-left">
                {/* 1. Formula Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">EMI Calculation Formula</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Equated Monthly Installment (EMI) is calculated using a standard mathematical formula that accounts for compounding interest over the tenure:
                        </p>
                        <div className="my-6 p-4 bg-muted rounded-xl text-center font-mono text-lg overflow-x-auto text-foreground">
                            {"\\(EMI = P \\times r \\times \\frac{(1 + r)^n}{(1 + r)^n - 1}\\)"}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Where:
                            <br />• <strong>P:</strong> Principal loan amount.
                            <br />• <strong>r:</strong> Monthly interest rate (Annual interest rate / 12 / 100).
                            <br />• <strong>n:</strong> Loan tenure in months.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">How to Use the EMI Calculator</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Follow these simple steps to estimate your monthly payouts and budget accordingly:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                            <li><strong>Enter Principal:</strong> Input the total sum you plan to borrow.</li>
                            <li><strong>Set Interest Rate:</strong> Enter the annual rate offered by banks.</li>
                            <li><strong>Choose Tenure:</strong> Set the duration in years or months. The tool will instantly generate your amortization schedule.</li>
                        </ul>
                    </div>
                </section>

                {/* 2. Comparison Table */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Comparing Types of Loan Repayments</h2>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Repayment Type</th>
                                    <th className="px-4 py-3 text-left font-semibold">Monthly Payout Behaviour</th>
                                    <th className="px-4 py-3 text-left font-semibold">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 font-medium">Standard EMI</td>
                                    <td className="px-4 py-3 text-muted-foreground">Remains flat/constant throughout the loan term.</td>
                                    <td className="px-4 py-3 text-muted-foreground">Salaried individuals seeking predictable budgeting.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Step-Up EMI</td>
                                    <td className="px-4 py-3 text-muted-foreground">Starts lower and increases as your income grows.</td>
                                    <td className="px-4 py-3 text-muted-foreground">Young professionals expecting quick career growth.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Balloon Repayment</td>
                                    <td className="px-4 py-3 text-muted-foreground">Lower monthly EMIs with a large lump-sum payment at the end.</td>
                                    <td className="px-4 py-3 text-muted-foreground">Businesses expecting future capital injections.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Limitations & Common Errors */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Limitations</h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Does not account for processing fees, documentation charges, or stamp duty.</li>
                            <li>Assumes a fixed rate of interest; floating rate loan payments will change when benchmark rates are modified.</li>
                            <li>Does not compute compounding changes due to prepayment or foreclosure.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Payout Miscalculations</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong>Error: Yearly vs. Monthly Rates:</strong> Inputting the monthly interest rate instead of the yearly rate or vice versa.</li>
                            <li><strong>Error: Overlooking Amortization:</strong> Underestimating the proportion of initial payments going towards interest rather than principal.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. FAQs */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">How does loan tenure affect the EMI?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">A longer tenure lowers your monthly payment but increases the overall interest paid over the life of the loan. A shorter tenure increases monthly payments but saves interest cost.</p>
                        </div>
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Can floating rate EMIs change?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Yes, if you choose a floating rate, banks will adjust either the tenure or the EMI amount when benchmark lending rates (like Repo Rate or MCLR) are revised.</p>
                        </div>
                    </div>
                </section>
            </div>
        </ToolSEOWrapper>
    )
}
