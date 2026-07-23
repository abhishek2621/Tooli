import { type Metadata } from "next";
import dynamic from "next/dynamic";
import { toolsByCategory } from "@/config/tools";
import { siteConfig } from "@/config/site";

// Optimization 1: Using Full Static Generation (SSG) instead of Edge.
// This ensures <50ms TTFB by serving the pre-rendered HTML directly from the CDN.

// Optimization 2: Lazy load interactive components. (Force rebuild: v2)
const BackgroundBlobs = dynamic(() => import("@/components/shared/background-blobs").then(mod => mod.BackgroundBlobs));
const ToolExplorer = dynamic(() => import("@/components/home/tool-explorer").then(mod => mod.ToolExplorer));
import { SEOJsonLd } from "@/components/shared/seo-json-ld";
import { WhyChooseTooli } from "@/components/home/why-choose-tooli";

export const metadata: Metadata = {
    title: "Free Image & PDF Tools Online — Compress, Convert, Merge & Calculate | Tooli",
    description: "Access high-performance, privacy-first online tools for free. Compress images, merge PDFs, and calculate GST instantly in your browser. No uploads, no sign-up, 100% secure. Try Tooli now!",
    keywords: [
        "free image compressor",
        "free image converter",
        "no ads",
        "no sign up online tools",
        "privacy focused tools",
        "image compressor online",
        "pdf compressor",
        "pdf tools online",
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: "Free Image & PDF Tools Online — Compress, Convert, Merge & Calculate | Tooli",
        description: "Access high-performance, privacy-first online tools for free. Compress images, merge PDFs, and calculate GST instantly in your browser. No uploads, no sign-up, 100% secure.",
        siteName: siteConfig.name,
    },
};

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen relative isolate">
            <BackgroundBlobs />
            {/* Hero Section */}
            <section className="relative space-y-6 pb-4 pt-12 md:pb-6 md:pt-16 lg:pt-20 lg:pb-8 overflow-hidden">
                <div className="container flex max-w-5xl flex-col items-center gap-6 text-center z-10">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-4 transition-all hover:bg-primary/10 hover:border-primary/30 cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        100% Free • No Sign-up • No Ads
                    </div>

                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground drop-shadow-sm">
                        Free Online Image, PDF & Calculator Tools — <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">
                            Fast, Private & No Signup
                        </span>
                    </h1>
                    <div className="max-w-3xl mx-auto space-y-4">
                        <p className="leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                            Your all-in-one privacy-focused utility platform. <br className="hidden sm:inline" />
                            Image, PDF, Finance & Utility tools directly in your browser.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar + Trust Badges + Tool Catalog */}
            <ToolExplorer initialTools={toolsByCategory}>
                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-2 mb-4 px-4">
                    {[
                        { label: "Privacy First", icon: "🛡️" },
                        { label: "No Advertisements", icon: "✨" },
                        { label: "Runs Locally", icon: "💻" },
                        { label: "No Signup", icon: "🚫" },
                        { label: "Made in India", icon: "🇮🇳" }
                    ].map((badge) => (
                        <div key={badge.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-muted-foreground hover:bg-white/10 transition-colors">
                            <span>{badge.icon}</span>
                            <span>{badge.label}</span>
                        </div>
                    ))}
                </div>
            </ToolExplorer>


            <WhyChooseTooli />
            
            



            <SEOJsonLd
                softwareApp={{
                    name: siteConfig.name,
                    description: siteConfig.description,
                    url: siteConfig.url,
                    category: "UtilitiesApplication",
                    price: "0",
                    priceCurrency: "USD"
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": siteConfig.name,
                        "url": siteConfig.url,
                        "description": siteConfig.description,
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": `${siteConfig.url}/?q={search_term_string}`
                            },
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />
        </div>
    );
}
