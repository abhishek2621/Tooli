import type { Metadata } from 'next'
import { GSTCalculatorForm } from '@/components/tools/finance/gst-form'

export const metadata: Metadata = {
    title: 'Free GST Calculator India (2025) | Calculate GST & Tax',
    description: 'Use our Free GST Calculator to find inclusive and exclusive tax amounts instantly. supports 5%, 12%, 18%, and 28% tax slabs. Best for business and students.',
    keywords: [
        'gst calculator', 'gst calculator india', 'calculate gst', 'gst inclusive calculator',
        'gst exclusive calculator', 'tax calculator', 'gst tax', 'india tax calculator',
        'goods and services tax'
    ],
    openGraph: {
        title: 'GST Calculator | Free Online Finance Tools',
        description: 'Calculate GST inclusive and exclusive amounts online instantly.',
        type: 'website',
    }
}

export default function GSTCalculatorPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">GST Calculator</h1>
                <p className="text-lg text-muted-foreground">
                    Calculate Goods and Services Tax (GST) effortlessly.
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
