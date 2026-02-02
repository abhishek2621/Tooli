import Link from "next/link";
import { type Metadata } from "next";
import { toolsByCategory, ToolCategory } from "@/config/tools";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ToolExplorer } from "@/components/home/tool-explorer";
import { BackgroundBlobs } from "@/components/shared/background-blobs";

export const metadata: Metadata = {
    title: "Free Online Tools – Image, PDF, Finance & Utility Tools | Tooli",
    description: "Use Tooli’s free online tools for images, PDFs, finance calculators, and utilities. Fast, secure, no sign-up, no tracking. Works directly in your browser.",
    keywords: [
        "free online tools",
        "all-in-one online tools",
        "online utility tools",
        "browser based tools",
        "no sign up online tools",
        "instant online tools",
        "image compressor online",
        "pdf tools online",
        "finance calculators india"
    ],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: "Free Online Tools – Image, PDF, Finance & Utility Tools | Tooli",
        description: "Use Tooli’s free online tools for images, PDFs, finance calculators, and utilities. Fast, secure, no sign-up, no tracking. Works directly in your browser.",
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
                        100% Free  • No Sign-up • Secure
                    </div>
                    <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                        Free Online Tools to <br className="hidden sm:inline" />
                        <span className="text-primary bg-clip-text">Convert, Compress & Calculate Instantly</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
                        Image, PDF, Finance & Utility Tools — No Login, No Tracking
                    </h2>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8">
                        Tooli is an all-in-one platform offering free online image tools, PDF tools, finance calculators, utility tools, and productivity tools designed for fast, private, and secure use directly in your browser.
                    </p>
                </div>
            </section>

            {/* Tool Explorer Section (Search + Grid) */}
            <ToolExplorer initialTools={toolsByCategory} />
        </div>
    );
}
