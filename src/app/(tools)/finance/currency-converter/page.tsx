import type { Metadata } from 'next'
import { CurrencyConverter } from "@/components/tools/finance/currency-converter";

export const metadata: Metadata = {
    title: 'Currency Converter Online – Live Exchange Rates',
    description: 'Convert between USD, EUR, INR, GBP and more with live exchange rates. Free currency converter online.',
    keywords: [
        'currency converter online', 'usd to inr converter', 'convert currency online',
        'forex rate converter', 'live currency converter'
    ]
}

export default function CurrencyConverterPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Currency Converter Online – Live Exchange Rates</h1>
                <p className="text-lg text-muted-foreground">
                    Check live foreign exchange rates and convert currencies instantly.
                </p>
            </div>

            <CurrencyConverter />
        </div>
    )
}
