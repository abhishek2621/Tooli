import type { Metadata } from 'next'
import { QrCodeGenerator } from "@/components/tools/utility/qr-code-generator";

export const metadata: Metadata = {
    title: 'Free QR Code Generator | Create Custom QR Codes',
    description: 'Generate free custom QR codes for URLs, text, and emails. Download high-quality PNGs with custom colors.',
    keywords: ['qr code generator', 'create qr code', 'free qr code', 'custom qr code', 'qrcode maker'],
}

export default function QrCodePage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
                <p className="text-lg text-muted-foreground">
                    Create and customize standard QR codes instantly.
                </p>
            </div>

            <QrCodeGenerator />
        </div>
    )
}
