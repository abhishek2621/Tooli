import type { Metadata } from 'next'
import { SIPCalculator } from "@/components/tools/finance/sip-calculator";

export const metadata: Metadata = {
    title: 'SIP Calculator Online – Calculate Mutual Fund Returns',
    description: 'Calculate returns on your monthly SIP investments accurately. Visualise growth with charts. Free mutual fund SIP calculator.',
    keywords: [
        'sip calculator online', 'mutual fund sip calculator', 'monthly sip calculator',
        'sip return calculator', 'sip investment calculator'
    ]
}

export default function SIPCalculatorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">SIP Calculator Online – Calculate Mutual Fund Returns</h1>
                <p className="text-lg text-muted-foreground">
                    Estimate future returns for your monthly mutual fund investments. No login needed.
                </p>
            </div>

            <SIPCalculator />
        </div>
    )
}
