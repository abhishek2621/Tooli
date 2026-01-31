import type { Metadata } from 'next'
import { CurrencyConverter } from "@/components/tools/finance/currency-converter";

export const metadata: Metadata = {
    title: 'Free Currency Converter | Live Exchange Rates',
    description: 'Convert between USD, EUR, INR, GBP and more with live exchange rates. Free, fast, and works on all devices.',
    keywords: [
        'currency converter', 'exchange rates', 'money converter', 'usd to eur',
        'usd to inr', 'forex calculator'
    ]
}

export default function CurrencyConverterPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">Currency Converter</h1>
                <p className="text-lg text-muted-foreground">
                    Check live foreign exchange rates and convert currencies instantly.
                </p>
            </div>

            <CurrencyConverter />
        </div>
    )
}
