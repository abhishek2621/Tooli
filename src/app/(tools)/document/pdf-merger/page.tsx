import type { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper, generateToolMetadata } from "@/components/shared/tool-seo-wrapper";

import { SEOContent } from "@/components/shared/seo-content";
import { RelatedTools } from "@/components/shared/related-tools";

const PdfMerger = dynamic(
    () => import("@/components/tools/document/pdf-merger").then(mod => mod.PdfMerger),
    {
        loading: () => (
            <div className="space-y-6">
                <Skeleton className="h-96 rounded-xl" />
            </div>
        )
    }
);

export const metadata: Metadata = generateToolMetadata({
    title: 'Merge PDF Files Online – Combine PDFs Free & Securely',
    description: 'Merge multiple PDF files into one document instantly. Free, secure, and purely client-side. No signup required. Combine PDFs without watermarks or file uploads.',
    canonical: 'https://www.tooli.in/document/pdf-merger',
    keywords: ['merge pdf online', 'combine pdf files for email', 'merge pdf for job applications', 'pdf merger without watermark', 'secure pdf merger', 'merge scanned documents'],
})

export default function PdfMergerPage() {
    return (
        <ToolSEOWrapper
            title="Merge PDF Files"
            description="Merge multiple PDF files into one document instantly. Free, secure, and purely client-side."
            canonical="https://www.tooli.in/document/pdf-merger"
            category="UtilitiesApplication"
            showRelatedAtBottom={false}
        >
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-left">Merge PDF Files Online – Combine PDFs for Free</h1>
                <p className="text-lg text-muted-foreground text-left">
                    Combine multiple PDF files into a single document. No signup, no watermark, 100% private.
                </p>
            </div>

            <PdfMerger />

            <RelatedTools />

            <SEOContent
                title="Professional PDF Merging with Privacy at the Core"
                sections={[
                    {
                        title: "Why Tooli is the Best PDF Merger in 2026",
                        content: [
                            "Merging documents often involves handling sensitive personal or business information. Traditional PDF mergers require you to upload your files to their cloud servers, posing a significant security risk. Tooli revolutionizes this by performing the entire merging operation directly within your browser.",
                            "Our PDF merger uses advanced logic to join pages and combine document structures while preserving all original formatting, links, and high-resolution content without ever seeing your data."
                        ]
                    },
                    {
                        title: "Safe & Secure Document Management",
                        content: "We've built Tooli to handle complex PDF structures securely. Your browser becomes the engine that powers the merge, eliminating the 'middleman' server.",
                        subsections: [
                            { title: "No File Uploads", content: "Your documents stay on your machine. We only use your local RAM for the merging process." },
                            { title: "Zero Data Logging", content: "Since no data reaches our servers, we have no logs to store or expose." },
                            { title: "High-Resolution Output", content: "Maintain the crisp text and sharp images of your original PDF files." },
                            { title: "No Watermarks", content: "Get clean, professional PDF results without any unwanted branding." }
                        ]
                    },
                    {
                        title: "Strategic Use Cases for PDF Merging",
                        content: "Tooli is optimized for high-performance tasks across various industries:",
                        subsections: [
                            { title: "Job Applications", content: "Combine your cover letter, resume, and portfolio into a single professional PDF for easy submission." },
                            { title: "Financial Reports", content: "Merge monthly bank statements and receipts for tax filing or business accounting." },
                            { title: "Academic Submissions", content: "Join multiple research chapters or assignment parts into one cohesive document." },
                            { title: "Legal & Legal Forms", content: "Securely combine scanned contracts and identity proofs for official purposes." }
                        ]
                    },
                    {
                        title: "Efficient Browser-Based Performance",
                        content: [
                            "Processing PDFs locally is not just safer—it's often faster. Skip the 'Upload-Wait-Merge-Download' cycle. With Tooli, the merge is nearly instantaneous as it happens directly on your CPU.",
                            "This approach ensures you can work with large files or multiple smaller ones without hitting server-side processing limits or bandwidth bottlenecks."
                        ]
                    }
                ]}
            />
        </ToolSEOWrapper>
    )
}
