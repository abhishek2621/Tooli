import type { Metadata } from 'next'
import { UnitConverter } from "@/components/tools/utility/unit-converter";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { UNIT_CONVERTER_FAQS } from "@/components/shared/faq-section";

export const metadata: Metadata = generateToolMetadata({
    title: 'Unit Converter Online – Convert Measurements Instantly',
    description: 'Convert between different units of measurement instantly. Supports Length, Mass, Volume, Temperature, and Digital Storage. Free online tool.',
    canonical: 'https://www.tooli.in/utility/unit-converter',
    keywords: ['unit converter online', 'convert units online', 'measurement converter', 'length weight unit converter', 'online converter', 'unit converter 2026'],
})

export default function UnitConverterPage() {
    return (
        <ToolSEOWrapper
            title="Unit Converter"
            description="Convert between different units of measurement instantly. Supports Length, Mass, Volume, Temperature, and Digital Storage."
            canonical="https://www.tooli.in/utility/unit-converter"
            category="UtilitiesApplication"
            faqs={UNIT_CONVERTER_FAQS}
        >
            <div className="flex flex-col gap-2 text-left items-start mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Unit Converter Online – Convert Measurements Instantly</h1>
                <p className="text-lg text-muted-foreground">
                    Convert between common units of measurement instantly.
                </p>
            </div>

            <UnitConverter />
        </ToolSEOWrapper>
    )
}
