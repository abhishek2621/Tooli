import type { Metadata } from 'next'
import { SIPCalculator } from "@/components/tools/finance/sip-calculator";

export const metadata: Metadata = {
    title: 'SIP Calculator | Systematic Investment Plan Calculator',
    description: 'Calculate returns on your monthly SIP investments accurately. Visualise growth with charts.',
    keywords: [
        'sip calculator', 'mutual fund calculator', 'investment calculator',
        'sip returns', 'systematic investment plan'
    ]
}

export default function SIPCalculatorPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">SIP Calculator</h1>
                <p className="text-lg text-muted-foreground">
                    Estimate future returns for your monthly mutual fund investments.
                </p>
            </div>

            <SIPCalculator />
        </div>
    )
}
