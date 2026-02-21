import type { Metadata } from 'next'
import { GSTCalculatorForm } from '@/components/tools/finance/gst-form'
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { GST_CALCULATOR_FAQS } from "@/components/shared/faq-section";

export const metadata: Metadata = generateToolMetadata({
    title: 'GST Calculator India – Inclusive & Exclusive Tax Calculator',
    description: 'Calculate GST (Goods and Services Tax) for India instantly. Easy calculations for 5%, 12%, 18%, and 28% tax slabs. Determine inclusive and exclusive amounts accurately.',
    canonical: 'https://www.tooli.in/finance/gst-calculator',
    keywords: ['gst calculator', 'gst calculator india', 'calculate gst inclusive', 'gst exclusive calculator', 'tax calculator india', 'gst amount formula', 'gst calculator 2026'],
})

export default function GSTCalculatorPage() {
    return (
        <ToolSEOWrapper
            title="GST Calculator"
            description="Calculate GST (Goods and Services Tax) for India instantly. Easy calculations for 5%, 12%, 18%, and 28% tax slabs."
            canonical="https://www.tooli.in/finance/gst-calculator"
            category="FinanceApplication"
            faqs={GST_CALCULATOR_FAQS}
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">GST Calculator India – Inclusive & Exclusive</h1>
                <p className="text-lg text-muted-foreground">
                    Instantly calculate Goods and Services Tax (GST). Select your tax slab (5%, 12%, 18%, 28%) to see final amounts.
                </p>
            </div>

            <div className="max-w-xl">
                <GSTCalculatorForm />
            </div>
        </ToolSEOWrapper>
    )
}
