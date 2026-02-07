import type { Metadata } from 'next'
import { UnitConverter } from "@/components/tools/utility/unit-converter";

export const metadata: Metadata = {
    title: 'Unit Converter Online – Convert Measurements Instantly',
    description: 'Convert between different units of measurement instantly. Supports Length, Mass, Volume, Temperature, and Digital Storage. Free online tool.',
    keywords: [
        'unit converter online', 'convert units online', 'measurement converter',
        'length weight unit converter', 'online converter'
    ]
}

export default function UnitConverterPage() {
    return (
        <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2 text-left items-start mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Unit Converter Online – Convert Measurements Instantly</h1>
                <p className="text-lg text-muted-foreground">
                    Convert between common units of measurement instantly.
                </p>
            </div>

            <UnitConverter />
        </div>
    )
}
