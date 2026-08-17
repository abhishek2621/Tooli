import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";
import { RelatedTools } from "@/components/shared/related-tools";

import { ImageCompressor } from "@/components/tools/image/image-compressor";



export const metadata: Metadata = generateToolMetadata({
    title: 'Compress Image to 50KB, 100KB Online – Photo & Signature Compressor | Tooli',
    description: 'Compress images to exact sizes like 50KB or 100KB without quality loss. Perfect for exam forms, job applications and website uploads. Private browser-based JPG PNG WebP compressor.',
    canonical: 'https://www.tooli.in/image/image-compressor',
    keywords: [
        'image compressor',
        'compress image to 50kb',
        'compress image to 100kb',
        'compress signature to 20kb',
        'exam photo compressor',
        'photo under 50kb',
        'free image compressor online',
        'jpg png webp compressor',
        'image size reducer',
    ],
})

export default function ImageCompressorPage() {
    return (
        <ToolSEOWrapper
            title="Image Compressor"
            description="Compress images to exact sizes like 50KB or 100KB without losing quality."
            canonical="https://www.tooli.in/image/image-compressor"
            category="MultimediaApplication"
            showRelatedAtBottom={false}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">
                    Free Image Compressor - | FAST | SECURE
                </h1>
                <p className="text-lg text-muted-foreground">
                    Reduce image size without losing clarity. Ideal for exam forms, job applications, and website uploads. Private browser-based JPG, PNG and WebP compression.
                </p>
            </div>

            <ImageCompressor />

            <p className="text-sm text-muted-foreground mt-6">
                Popular tasks: compress image to 50KB, compress signature to 20KB, passport photo under 50KB, fix photo upload size error.
            </p>

            {/* Rich SEO Content */}
            <div className="mt-16 space-y-12 border-t pt-12 text-left">
                {/* 1. How to choose settings */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">How to Choose Image Compression Settings</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Compressing images efficiently means balancing file size and visual clarity. Here is how you can customize your settings:
                        </p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground">
                            <li><strong>Quality (80% Recommended):</strong> The sweet spot for web use. Reduces file size by up to 70% with virtually indistinguishable quality loss.</li>
                            <li><strong>Quality (50% or less):</strong> Ideal when you need to meet strict submission limits like "under 50KB" or "under 20KB" for job applications and exam portals.</li>
                            <li><strong>Format Conversion:</strong> Convert to WebP for modern websites, JPEG for maximum compatibility, and PNG if you must preserve transparent backgrounds.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Popular Use Cases</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Exam & Job Portals:</strong> Compress signatures to under 20KB and passport photos to under 50KB for UPSC, SSC, and banking portals.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Website Speed:</strong> Optimize large banners and blog images to boost SEO rank and page load times.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">✓</span>
                                <span className="text-muted-foreground"><strong>Email & Messaging:</strong> Reduce huge camera shots (5MB+) to lightweight files for easy sharing.</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Format Comparison Table */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Choosing the Right Image Format</h2>
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-border text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Format</th>
                                    <th className="px-4 py-3 text-left font-semibold">Compression Type</th>
                                    <th className="px-4 py-3 text-left font-semibold">Transparency Support</th>
                                    <th className="px-4 py-3 text-left font-semibold">Best For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                <tr>
                                    <td className="px-4 py-3 font-medium">JPEG / JPG</td>
                                    <td className="px-4 py-3 text-muted-foreground">Lossy (High reduction)</td>
                                    <td className="px-4 py-3 text-muted-foreground">No</td>
                                    <td className="px-4 py-3 text-muted-foreground">Photos, signatures, scanned documents</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">PNG</td>
                                    <td className="px-4 py-3 text-muted-foreground">Lossless (Large size)</td>
                                    <td className="px-4 py-3 text-emerald-600 font-semibold">Yes</td>
                                    <td className="px-4 py-3 text-muted-foreground">Logos, icons, graphics, text screenshots</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-medium">WebP</td>
                                    <td className="px-4 py-3 text-muted-foreground">Lossy & Lossless (Next-gen)</td>
                                    <td className="px-4 py-3 text-emerald-600 font-semibold">Yes</td>
                                    <td className="px-4 py-3 text-muted-foreground">Website images, blog graphics, modern web apps</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. Limitations & Troubleshooting */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Limitations</h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Cannot compress vector formats like SVG or AI directly. Convert them to PNG first.</li>
                            <li>JPEG files compressed below 30% quality may exhibit visible compression artifacts (blurriness or pixelation).</li>
                            <li>Extremely large files (e.g., 50MB+ RAW camera files) may hit browser memory limits.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Common Compression Errors</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong>Error: "Output larger than input":</strong> Occurs when compressing a highly optimized PNG as a lossless WebP. Try reducing dimensions or quality slider.</li>
                            <li><strong>Error: "Invalid format":</strong> Ensure your file extension is strictly `.jpg`, `.jpeg`, `.png`, or `.webp`.</li>
                        </ul>
                    </div>
                </section>

                {/* 4. FAQs */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Are my photos uploaded to your server?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">No. Tooli works entirely client-side using Web Assembly and HTML5 Canvas API. Your pictures are compressed locally on your computer/phone and never touch our servers.</p>
                        </div>
                        <div className="rounded-xl border p-5 bg-card">
                            <h4 className="font-semibold mb-2">Can I batch compress multiple images at once?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">Yes! You can drop multiple images into the compression area, customize global settings, and download all compressed files in a single ZIP folder.</p>
                        </div>
                    </div>
                </section>
            </div>

            <RelatedTools />

        </ToolSEOWrapper>
    )
}