import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ToolSEOWrapper } from "@/components/shared/tool-seo-wrapper";
import { SEOContent } from "@/components/shared/seo-content";
import { RelatedTools } from "@/components/shared/related-tools";
import { notFound } from "next/navigation";

const ImageCompressor = dynamic(
    () => import("@/components/tools/image/image-compressor").then(mod => mod.ImageCompressor),
    {
        loading: () => (
            <div className="space-y-6">
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-96 rounded-xl" />
            </div>
        )
    }
);

const VALID_SIZES = [50, 100, 200, 500] as const;

type PageProps = {
    params: Promise<{ size: string }>;
};

export async function generateStaticParams() {
    return VALID_SIZES.map((size) => ({
        size: size.toString(),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { size } = await params;
    const sizeNum = parseInt(size);

    if (!VALID_SIZES.includes(sizeNum as (typeof VALID_SIZES)[number])) {
        return {};
    }

    const title = `Compress Image to ${size}KB Online Free | Tooli`;
    const description = `Compress images to ${size}KB online for free. Reduce JPG, PNG, and WebP image size to ${size}KB instantly without losing quality. Browser-based, no signup required.`;
    const canonical = `https://www.tooli.in/compress-image-to-${size}kb`;

    return {
        title,
        description,
        keywords: [
            `compress image to ${size}kb`,
            `reduce image size to ${size}kb`,
            `${size}kb image compressor`,
            `compress photo to ${size}kb`,
            `resize image to ${size}kb`,
            "image compressor online free",
            "compress jpg png webp",
        ],
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            type: "website",
            url: canonical,
        },
    };
}

export default async function CompressImageToSizePage({ params }: PageProps) {
    const { size } = await params;
    const sizeNum = parseInt(size);

    if (!VALID_SIZES.includes(sizeNum as (typeof VALID_SIZES)[number])) {
        notFound();
    }

    const canonical = `https://www.tooli.in/compress-image-to-${size}kb`;

    return (
        <ToolSEOWrapper
            title={`Compress Image to ${size}KB`}
            description={`Compress images to ${size}KB online for free. Reduce JPG, PNG, and WebP image size to ${size}KB instantly without losing quality.`}
            canonical={canonical}
            category="MultimediaApplication"
            showRelatedAtBottom={false}
        >
            <div className="flex flex-col gap-2 mb-8 text-left items-start">
                <h1 className="text-3xl font-bold tracking-tight">
                    Compress Image to {size}KB Online – Free & Instant
                </h1>
                <p className="text-lg text-muted-foreground">
                    Upload an image and compress it to {size}KB using our free online image compressor.
                    Works with JPG, PNG, and WebP files — no sign-up, no ads, fully private.
                </p>
            </div>

            <ImageCompressor />

            <p className="text-sm text-muted-foreground mt-6">
                Quickly compress your image to {size}KB for exam forms, job applications, passport photos, and website uploads.
            </p>

            <RelatedTools />

            <SEOContent
                title={`How to Compress Images to ${size}KB`}
                sections={[
                    {
                        title: `Why Compress Images to ${size}KB?`,
                        content: [
                            `Many online forms, government portals, and application websites require images under ${size}KB. Uploading a larger file results in errors like "file too large" or "invalid size." Tooli lets you compress any image to ${size}KB instantly, right in your browser.`,
                            `Whether it's a passport photo, signature scan, or profile picture — our compressor handles it without losing clarity.`,
                        ],
                    },
                    {
                        title: `Steps to Compress Image to ${size}KB`,
                        content: `Follow these simple steps to reduce your image to ${size}KB:`,
                        subsections: [
                            { title: "Step 1: Upload", content: "Drag and drop or click to select a JPG, PNG, or WebP image." },
                            { title: "Step 2: Set Target Size", content: `Enable "Set Target File Size" in settings and enter ${size} KB.` },
                            { title: "Step 3: Download", content: `Your image is compressed to ${size}KB instantly. Click Download to save.` },
                            { title: "Batch Support", content: "Need to compress multiple images? Upload them all at once and download as a ZIP." },
                        ],
                    },
                    {
                        title: "Why Use Tooli for Image Compression?",
                        content: [
                            "Tooli compresses images entirely in your browser — no files are uploaded to any server. This means faster results, total privacy, and zero risk of data leaks.",
                            "Unlike other tools filled with ads and slow server uploads, Tooli gives you instant, high-quality compression with a clean interface.",
                        ],
                    },
                    {
                        title: `Common Use Cases for ${size}KB Compression`,
                        subsections: [
                            { title: "Government Exam Forms", content: `Compress passport photos and signatures to ${size}KB for SSC, UPSC, railway, and banking exam applications.` },
                            { title: "Job & Internship Portals", content: `Reduce profile photos to ${size}KB for resume uploads and career websites.` },
                            { title: "University Admissions", content: `Meet image size requirements for college and university admission forms.` },
                            { title: "Website & Email", content: `Optimize images to ${size}KB for faster page loads and email attachments.` },
                        ],
                    },
                ]}
            />
        </ToolSEOWrapper>
    );
}
