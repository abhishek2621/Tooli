import Link from "next/link";
import { type Metadata } from "next";
import { toolsByCategory, ToolCategory } from "@/config/tools";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ToolExplorer } from "@/components/home/tool-explorer";
import { BackgroundBlobs } from "@/components/shared/background-blobs";

export const metadata: Metadata = {
    title: "Tooli - Free Online Tools for Everyone",
    description: "Access a suite of free online tools including GST Calculator, PDF Converter, Image Compressor, and more. No ads, no sign-up needed.",
    keywords: ["online tools", "free calculators", "pdf converter", "image compressor", "gst calculator", "productivity suite", "tooli"],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: "Tooli - Free Online Tools",
        description: "Your go-to privacy-focused utility belt for the web.",
        siteName: siteConfig.name,
    },
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen relative isolate">
            <BackgroundBlobs />
            {/* Hero Section */}
            <section className="relative space-y-6 pb-8 pt-12 md:pb-12 md:pt-16 lg:py-24 overflow-hidden">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <div className="rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-md">
                        Phase-1 MVP is now live.
                    </div>
                    <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                        Essential tools for <br className="hidden sm:inline" />
                        <span className="text-primary bg-clip-text">everyday tasks</span>.
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        A privacy-focused collection of calculators, converters, and generators.
                        No ads, no tracking, just utility.
                    </p>
                </div>
            </section>

            {/* Tool Explorer Section (Search + Grid) */}
            <ToolExplorer initialTools={toolsByCategory} />
        </div>
    );
}
