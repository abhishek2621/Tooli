import type { Metadata } from 'next'
import { GSTCalculatorForm } from '@/components/tools/finance/gst-form'

export const metadata: Metadata = {
    title: 'GST Calculator Online (India) – Inclusive & Exclusive',
    description: 'Calculate GST inclusive and exclusive amounts easily. Supports 5%, 12%, 18%, and 28% tax slabs. Free GST tax calculator for India.',
    keywords: [
        'gst calculator online india', 'gst inclusive exclusive calculator', 'calculate gst amount',
        'gst tax calculator india', 'gst calculation tool'
    ],
    openGraph: {
        title: 'GST Calculator Online (India) – Inclusive & Exclusive',
        description: 'Calculate GST inclusive and exclusive amounts online instantly.',
        type: 'website',
    }
}

export default function GSTCalculatorPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">GST Calculator Online (India) – Inclusive & Exclusive</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate Goods and Services Tax (GST) effortlessly. No signup.
                </p>
            </div>

            <div className="max-w-xl">
                <GSTCalculatorForm />
            </div>

            <div className="prose prose-gray max-w-none dark:prose-invert">
                <h2>How to use this GST Calculator</h2>
                <p>1. Enter the net amount.</p>
                <p>2. Select the applicable GST Slab.</p>
                <p>3. View the tax breakup instantly.</p>
            </div>
        </div>
    )
}
