import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { QR_CODE_FAQS } from "@/components/shared/faq-section";

const QrCodeGenerator = dynamic(() => import("@/components/tools/utility/qr-code-generator").then(mod => mod.QrCodeGenerator), {
    loading: () => <div className="h-96 w-full bg-slate-100/50 animate-pulse rounded-xl" />
});

export const metadata: Metadata = generateToolMetadata({
    title: 'QR Code Generator – Create QR Codes Online Free',
    description: 'Generate free custom QR codes for URLs, text, and email. Download high-quality PNGs with custom colors. No watermark.',
    canonical: 'https://www.tooli.in/utility/qr-code-generator',
    keywords: ['qr code generator free', 'generate qr code online', 'qr code generator for url', 'qr code no watermark', 'online qr code maker', 'qr code generator 2026'],
})

export default function QrCodePage() {
    return (
        <ToolSEOWrapper
            title="QR Code Generator"
            description="Generate free custom QR codes for URLs, text, and email. Download high-quality PNGs with custom colors."
            canonical="https://www.tooli.in/utility/qr-code-generator"
            category="UtilitiesApplication"
            faqs={QR_CODE_FAQS}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">QR Code Generator – Create QR Codes Online Free</h1>
                <p className="text-lg text-muted-foreground">
                    Create and customize standard QR codes instantly. No signup, no watermark.
                </p>
            </div>

            <QrCodeGenerator />
        </ToolSEOWrapper>
    )
}
