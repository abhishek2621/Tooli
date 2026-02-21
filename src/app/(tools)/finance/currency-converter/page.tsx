import type { Metadata } from 'next'
import { CurrencyConverter } from "@/components/tools/finance/currency-converter";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { CURRENCY_FAQS } from "@/components/shared/faq-section";

export const metadata: Metadata = generateToolMetadata({
    title: 'Currency Converter Online – Live Exchange Rates',
    description: 'Convert between USD, EUR, INR, GBP and more with live exchange rates. Free currency converter online with real-time updates.',
    canonical: 'https://www.tooli.in/finance/currency-converter',
    keywords: ['currency converter online', 'usd to inr converter', 'convert currency online', 'forex rate converter', 'live currency converter'],
})

export default function CurrencyConverterPage() {
    return (
        <ToolSEOWrapper
            title="Currency Converter"
            description="Convert between currencies with live exchange rates."
            canonical="https://www.tooli.in/finance/currency-converter"
            category="FinanceApplication"
            faqs={CURRENCY_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">Currency Converter Online – Live Exchange Rates</h1>
                <p className="text-lg text-muted-foreground">
                    Check live foreign exchange rates and convert currencies instantly.
                </p>
            </div>

            <CurrencyConverter />
        </ToolSEOWrapper>
    )
}
