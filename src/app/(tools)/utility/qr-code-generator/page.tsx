import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";

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
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">QR Code Generator – Create QR Codes Online Free</h1>
                <p className="text-lg text-muted-foreground">
                    Create and customize standard QR codes instantly. No signup, no watermark.
                </p>
            </div>

            <QrCodeGenerator />

            {/* Rich SEO Content */}
            <div className="mt-16 space-y-12 border-t pt-12 text-left">
                {/* 1. Settings Guide */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">How to Choose QR Code Settings</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Generating a working QR code depends on error correction levels and link length. Higher error correction allows the QR code to be scanned even if partially damaged or obscured:
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
                            <li><strong>Level L (7% recovery):</strong> Best for simple URLs and text. Produces a cleaner, less dense QR pattern that is easy to scan at small sizes.</li>
                            <li><strong>Level H (30% recovery):</strong> Recommended if you plan to add a logo or print the QR code on physical surfaces where it might get scratched or dirty.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Website Links (URL):</strong> Direct users to portfolios, social pages, or product pages instantly.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Wi-Fi Access:</strong> Let guests connect to your home or office Wi-Fi network without typing passwords.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Digital Restaurant Menus:</strong> Print QR codes on table stands for contactless menu viewing.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Comparison Table */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Static vs. Dynamic QR Codes</h2>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                                    <th className="px-4 py-3 text-left font-semibold">Static QR Codes (Tooli)</th>
                                    <th className="px-4 py-3 text-left font-semibold">Dynamic QR Codes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 font-medium">Link Modification</td>
                                    <td className="px-4 py-3 text-muted-foreground">Permanent (cannot be changed after printing)</td>
                                    <td className="px-4 py-3 text-muted-foreground">Editable at any time</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Expiration</td>
                                    <td className="px-4 py-3 text-muted-foreground">Never expires (works forever)</td>
                                    <td className="px-4 py-3 text-muted-foreground">Often requires active subscription</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Scan Tracking</td>
                                    <td className="px-4 py-3 text-muted-foreground">None (Privacy-friendly)</td>
                                    <td className="px-4 py-3 text-muted-foreground">Tracks location, time, and device</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Cost</td>
                                    <td className="px-4 py-3 text-emerald-600 font-semibold">100% Free</td>
                                    <td className="px-4 py-3 text-muted-foreground">Paid monthly/yearly plans</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Limitations & Common Errors */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Limitations</h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Static QR codes encode the data directly. Longer URLs or extensive texts result in denser patterns, which require larger printing sizes to scan properly.</li>
                            <li>Colors must have high contrast (e.g., dark QR code on light background). Avoid light yellow or pastel colors for the QR modules.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Scanning Errors</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong>Error: &quot;QR Code is not scanning&quot;:</strong> Check the color contrast. If the background and foreground colors are too similar, phone cameras cannot read the modules.</li>
                            <li><strong>Error: &quot;Wrong destination page&quot;:</strong> Double-check the URL protocol (ensure `https://` is present) before downloading.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. FAQs */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Do these QR codes have scan limits?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">No. Because they are static QR codes that encode your data directly, they can be scanned unlimited times and will never expire.</p>
                        </div>
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Can I use the generated QR codes for commercial print?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Yes, all QR codes generated on Tooli are free to use for both personal and commercial purposes. You can print them on packaging, flyers, or business cards.</p>
                        </div>
                    </div>
                </section>
            </div>
        </ToolSEOWrapper>
    )
}
