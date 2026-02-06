import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Home, Search } from "lucide-react";

export const metadata: Metadata = {
    title: "Page Not Found | Tooli",
    description: "The page you are looking for does not exist. Browse our free online tools.",
    robots: {
        index: false,
        follow: true,
    },
};

// Select a few popular tools to suggest
const popularTools = [
    {
        name: "Image Compressor",
        description: "Compress images without losing quality.",
        path: "/image/image-compressor",
    },
    {
        name: "PDF Compressor",
        description: "Reduce PDF file size instantly.",
        path: "/document/pdf-compressor",
    },
    {
        name: "EMI Calculator",
        description: "Calculate accurate loan EMIs.",
        path: "/finance/emi-calculator",
    },
];

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500">
            <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-8">

                {/* Brand & Error Status */}
                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4">
                        <span className="font-bold text-xl">T</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                        Page not found
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-[600px]">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or feels a bit shy today.
                    </p>
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button asChild size="lg" className="min-w-[140px]">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="min-w-[140px]">
                        <Link href="/#tools">
                            <Search className="mr-2 h-4 w-4" />
                            Browse Tools
                        </Link>
                    </Button>
                </div>

                {/* Suggested Tools Section */}
                <div className="w-full pt-12 border-t border-border/50">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                        Popular Tools
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {popularTools.map((tool) => (
                            <Card
                                key={tool.path}
                                className="group p-4 hover:shadow-md transition-all duration-200 border-border/60 hover:border-primary/20 bg-card/50"
                            >
                                <Link href={tool.path} className="block space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {tool.name}
                                        </h3>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 text-left">
                                        {tool.description}
                                    </p>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-sm text-muted-foreground pt-8">
                    Need help? <Link href="/contact" className="hover:text-primary underline underline-offset-4">Contact Support</Link>
                </div>
            </div>
        </div>
    );
}
