import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";

const PdfCompressorWrapper = dynamic(
    () => import("@/components/tools/document/pdf-compressor-wrapper").then(mod => mod.PdfCompressorWrapper),
    {
        loading: () => (
            <div className="space-y-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
            </div>
        )
    }
);
export const metadata: Metadata = generateToolMetadata({
    title: 'Compress PDF Online – Free, Secure & Instant',
    description: 'Reduce PDF file size instantly without compromising quality. Secure, browser-based PDF compression. No sign-up, no upload necessary.',
    canonical: 'https://www.tooli.in/document/pdf-compressor',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf optimizer', 'online pdf tool', 'free pdf compressor', 'secure pdf compressor', 'compress pdf online 2026'],
})

export default function PdfCompressorPage() {
    return (
        <ToolSEOWrapper
            title="Compress PDF Files"
            description="Reduce PDF file size instantly without compromising quality. Secure, browser-based PDF compression."
            canonical="https://www.tooli.in/document/pdf-compressor"
            category="UtilitiesApplication"
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">PDF Compressor Online – Free, Instant & Secure</h1>
                <p className="text-lg text-muted-foreground">
                    Reduce file size while optimizing for quality in your browser. Secure, no signup, no watermark.
                </p>
            </div>

            <PdfCompressorWrapper />

            {/* Rich SEO Content */}
            <div className="mt-16 space-y-12 border-t pt-12 text-left">
                {/* 1. How it works & How to choose settings */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">How to Choose PDF Compression Settings</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            PDF compression works by optimizing images, removing duplicate object streams, and subsetting embedded fonts. Choosing the right preset depends on your use case:
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
                            <li><strong>Screen / Web (Recommended):</strong> Compresses images to 72/150 DPI. Ideal for email attachments, web upload forms, and quick sharing.</li>
                            <li><strong>Prepress / High Quality:</strong> Preserves higher resolution (300 DPI) for printing and high-end reading while still reducing metadata bloat.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Use Cases</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Government Portals:</strong> Easily meet the 2MB or 500KB limits of UPSC, SSC, and college admissions.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Email Attachments:</strong> Reduce large scans to fit Gmail's 25MB attachment limit.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Comparison Table */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">PDF Quality & Size Comparison</h2>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Preset</th>
                                    <th className="px-4 py-3 text-left font-semibold">Image Resolution</th>
                                    <th className="px-4 py-3 text-left font-semibold">Expected Size Reduction</th>
                                    <th className="px-4 py-3 text-left font-semibold">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 font-medium">Low (Max Compression)</td>
                                    <td className="px-4 py-3 text-muted-foreground">72 DPI</td>
                                    <td className="px-4 py-3 text-muted-foreground">Up to 80%</td>
                                    <td className="px-4 py-3 text-muted-foreground">Quick web uploads, low-bandwidth viewing</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">Medium (Standard)</td>
                                    <td className="px-4 py-3 text-muted-foreground">150 DPI</td>
                                    <td className="px-4 py-3 text-muted-foreground">Up to 50%</td>
                                    <td className="px-4 py-3 text-muted-foreground">Everyday sharing, job applications, resumes</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">High (Print Quality)</td>
                                    <td className="px-4 py-3 text-muted-foreground">300 DPI</td>
                                    <td className="px-4 py-3 text-muted-foreground">Up to 25%</td>
                                    <td className="px-4 py-3 text-muted-foreground">Printing, official legal documents</td>
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
                            <li>Cannot compress password-protected or encrypted PDF files unless unlocked first.</li>
                            <li>Already-compressed files (e.g. text-only PDFs containing few embedded fonts) will show minimal size reduction.</li>
                            <li>Image quality may degrade slightly at the highest compression setting.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Errors & Troubleshooting</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong>Error: "File is encrypted":</strong> Decrypt the PDF using a removal tool before uploading.</li>
                            <li><strong>Error: "Size did not decrease":</strong> The PDF may already have optimized images. Try a lower quality preset.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. FAQs */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Will my text quality change after compression?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">No, vector text, shapes, and layouts are preserved in high quality. Only bitmap images inside the PDF are resampled and compressed.</p>
                        </div>
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Is the tool safe to use with sensitive files?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Yes, Tooli processes your PDF locally in your browser. No files are uploaded to our servers, keeping your financial statements, IDs, and resumes 100% private.</p>
                        </div>
                    </div>
                </section>
            </div>
        </ToolSEOWrapper>
    )
}
