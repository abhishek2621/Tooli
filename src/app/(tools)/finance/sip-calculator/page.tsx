import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";

const SIPCalculator = dynamic(() => import("@/components/tools/finance/sip-calculator").then(mod => mod.SIPCalculator), {
    loading: () => <div className="h-[600px] w-full bg-slate-100/50 animate-pulse rounded-xl" />
});

export const metadata: Metadata = generateToolMetadata({
    title: 'SIP Calculator Online – Calculate Mutual Fund Returns',
    description: 'Calculate returns on your monthly SIP investments accurately. Visualise growth with charts. Free mutual fund SIP calculator.',
    canonical: 'https://www.tooli.in/finance/sip-calculator',
    keywords: ['sip calculator online', 'mutual fund sip calculator', 'monthly sip calculator', 'sip return calculator', 'sip investment calculator', 'sip calculator 2026'],
})

export default function SIPCalculatorPage() {
    return (
        <ToolSEOWrapper
            title="SIP Calculator"
            description="Calculate returns on your monthly SIP investments accurately. Visualise growth with charts."
            canonical="https://www.tooli.in/finance/sip-calculator"
            category="FinanceApplication"
        >
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">SIP Calculator Online – Calculate Mutual Fund Returns</h1>
                <p className="text-lg text-muted-foreground">
                    Estimate future returns for your monthly mutual fund investments. No login needed.
                </p>
            </div>

            <SIPCalculator />

            {/* Rich SEO Content */}
            <div className="mt-16 space-y-12 border-t pt-12 text-left">
                {/* 1. Formula Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">SIP Return Formula</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            A Systematic Investment Plan (SIP) uses the compound interest future value formula to estimate maturity amounts:
                        </p>
                        <div className="my-6 p-4 bg-muted rounded-xl text-center font-mono text-lg overflow-x-auto text-foreground">
                            {"\\(FV = P \\times \\frac{(1 + r)^n - 1}{r} \\times (1 + r)\\)"}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Where:
                            <br />• <strong>FV:</strong> Future Value (expected maturity amount).
                            <br />• <strong>P:</strong> Amount invested monthly.
                            <br />• <strong>r:</strong> Monthly rate of return (Annual expected rate / 12 / 100).
                            <br />• <strong>n:</strong> Total number of monthly installments (Tenure in years × 12).
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Why Invest via SIP?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            SIPs offer structural advantages for individual retail investors looking to build long-term wealth:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-muted-foreground">
                            <li><strong>Rupee Cost Averaging:</strong> Automatically buy more units when prices are low and fewer units when prices are high.</li>
                            <li><strong>Disciplined Investing:</strong> Automate monthly contributions directly from your bank.</li>
                            <li><strong>Power of Compounding:</strong> Small, regular investments accumulate substantial interest over decades.</li>
                        </ul>
                    </div>
                </section>

                {/* 2. Comparison Table */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">SIP vs. Lumpsum vs. Fixed Deposit (FD)</h2>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Criteria</th>
                                    <th className="px-4 py-3 text-left font-semibold">SIP (Mutual Funds)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Lumpsum (Mutual Funds)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Fixed Deposit (FD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 font-medium">Investment Style</td>
                                    <td className="px-4 py-3 text-muted-foreground">Periodic (Monthly/Weekly)</td>
                                    <td className="px-4 py-3 text-muted-foreground">One-time payment</td>
                                    <td className="px-4 py-3 text-muted-foreground">One-time payment</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Market Risk</td>
                                    <td className="px-4 py-3 text-muted-foreground">Medium to High (Averaged out)</td>
                                    <td className="px-4 py-3 text-muted-foreground">High (Depends on entry timing)</td>
                                    <td className="px-4 py-3 text-muted-foreground">None (Guaranteed return)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Average Returns</td>
                                    <td className="px-4 py-3 text-emerald-600 font-semibold">12% - 15% (Historical average)</td>
                                    <td className="px-4 py-3 text-emerald-600 font-semibold">12% - 15% (Historical average)</td>
                                    <td className="px-4 py-3 text-muted-foreground">5% - 7% (Fixed by bank)</td>
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
                            <li>Does not account for expense ratio, mutual fund exit load, or capital gains tax.</li>
                            <li>Past performance does not guarantee future returns. The interest rate entered is assumed constant, but market returns fluctuate daily.</li>
                            <li>Inflation is not automatically deducted; purchasing power of the maturity sum will change.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Misconceptions</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong>Error: "SIP guarantees returns":</strong> Unlike bank deposits, SIP returns are linked to equity/debt markets and contain risk.</li>
                            <li><strong>Error: Short Term Expectation:</strong> Expecting massive wealth in 1-2 years. Compounding benefits become significant only after 7-10 years.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. FAQs */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Can I modify my monthly SIP amount?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Yes, most asset management companies (AMCs) allow you to increase (top-up) or decrease your SIP contributions, or pause them for a few months if needed.</p>
                        </div>
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">What happens if I miss a monthly SIP installment?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Missing an installment will not cancel your investment or attract legal penalty. The fund house simply does not buy units for that month. However, your bank might charge an ECS bounce fee.</p>
                        </div>
                    </div>
                </section>
            </div>
        </ToolSEOWrapper>
    )
}
