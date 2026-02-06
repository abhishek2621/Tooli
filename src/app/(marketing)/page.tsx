import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { toolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ToolExplorer } from "@/components/home/tool-explorer";

const BackgroundBlobs = dynamic(() => import("@/components/shared/background-blobs").then(mod => mod.BackgroundBlobs));

export const metadata: Metadata = {
    title: "Tooli – Free Online Tools, Calculators & Converters (No Sign-up)",
    description: "Access free, privacy-focused online tools: PDF compressor, Image converter, GST calculator, and more. No sign-up required. Fast, secure, and mobile-friendly.",
    keywords: [
        "free online tools",
        "online utility tools",
        "browser based tools",
        "no sign up online tools",
        "privacy focused tools",
        "image compressor online",
        "pdf tools online",
        "finance calculators india"
    ],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: "Tooli – Free Online Tools, Calculators & Converters",
        description: "Access free, privacy-focused online tools: PDF compressor, Image converter, GST calculator, and more. No sign-up required.",
        siteName: siteConfig.name,
    },
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen relative isolate">
            <BackgroundBlobs />
            {/* Hero Section */}
            <section className="relative space-y-6 pb-8 pt-12 md:pb-12 md:pt-16 lg:py-24 overflow-hidden">
                <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center z-10">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-4 transition-all hover:bg-primary/10 hover:border-primary/30 cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        100% Free • No Sign-up • Secure
                    </div>

                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground drop-shadow-sm">
                        Free Online Tools to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600 animate-gradient-x">
                            Convert, Compress & Calculate
                        </span>
                    </h1>

                    <p className="max-w-[42rem] mx-auto leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                        Your all-in-one privacy-focused utility platform. <br className="hidden sm:inline" />
                        Image, PDF, Finance & Utility tools directly in your browser.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">

                    </div>
                </div>
            </section>

            {/* Tool Explorer Section (Search + Grid) */}
            <ToolExplorer initialTools={toolsByCategory} />
        </div>
    );
}
