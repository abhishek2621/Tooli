import type { Metadata } from 'next'
import { UnitConverter } from "@/components/tools/utility/unit-converter";

export const metadata: Metadata = {
    title: 'Free Unit Converter | Length, Mass, Volume, Temperature',
    description: 'Convert between different units of measurement instantly. Supports Length, Mass, Volume, Temperature, and Digital Storage.',
    keywords: [
        'unit converter', 'online converter', 'length converter', 'weight converter',
        'temperature converter', 'digital storage converter', 'free tools'
    ]
}

export default function UnitConverterPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2 text-center items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Unit Converter</h1>
                <p className="text-lg text-muted-foreground">
                    Convert between common units of measurement instantly.
                </p>
            </div>

            <UnitConverter />
        </div>
    )
}
