import type { Metadata } from 'next'
import { QrCodeGenerator } from "@/components/tools/utility/qr-code-generator";

export const metadata: Metadata = {
    title: 'QR Code Generator – Create QR Codes Online Free',
    description: 'Generate free custom QR codes for URLs, text, and email. Download high-quality PNGs with custom colors. No watermark.',
    keywords: ['qr code generator free', 'generate qr code online', 'qr code generator for url', 'qr code no watermark', 'online qr code maker'],
}

export default function QrCodePage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-2 mb-8 text-center items-center">
                <h1 className="text-3xl font-bold tracking-tight">QR Code Generator – Create QR Codes Online Free</h1>
                <p className="text-lg text-muted-foreground">
                    Create and customize standard QR codes instantly. No signup, no watermark.
                </p>
            </div>

            <QrCodeGenerator />
        </div>
    )
}
