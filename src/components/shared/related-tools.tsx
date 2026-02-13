"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools, Tool } from "@/config/tools";
import { ArrowRight, Calculator, Percent, TrendingUp, RefreshCcw, FileText, Minimize2, Merge, Type, Image as ImageIcon, FileImage, RefreshCw, Scale, QrCode, Lock, Calendar, Globe, GraduationCap } from "lucide-react";


const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    // Finance
    "percent": Percent,
    "calculator": Calculator,
    "trending-up": TrendingUp,
    "refresh-ccw": RefreshCcw,
    // Document
    "file-text": FileText,
    "minimize-2": Minimize2,
    "merge": Merge,
    "type": Type,
    // Image
    "image": ImageIcon,
    "file-image": FileImage,
    "refresh-cw": RefreshCw,
    // Utility
    "scale": Scale,
    "qr-code": QrCode,
    "lock": Lock,
    "calendar": Calendar,
    "globe": Globe,
    // Education
    "graduation-cap": GraduationCap,
};

export function RelatedTools() {
    const pathname = usePathname();

    // 1. Find the current tool
    const currentTool = tools.find((t) => t.path === pathname);

    // 2. Filter tools
    // We want tools from the same category first, then others. 
    // We use a deterministic approach based on the current tool's slug string length 
    // to pick "related" tools so it's consistent (better for SEO/User mental model) and avoids hydration mismatch.

    let relatedTools: Tool[] = [];

    // Simple pseudo-random seeded by string sum
    const getSeed = (str: string) => str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seed = currentTool ? getSeed(currentTool.slug) : 0;

    const allOtherTools = tools.filter(t => t.path !== pathname);

    // Sort all other tools deterministically based on connection to the current one
    // Priority 1: Same category
    // Priority 2: Deterministic "Raondom" shuffle

    relatedTools = allOtherTools.sort((a, b) => {
        // High priority if same category
        const aSameCat = currentTool && a.category === currentTool.category ? 1 : 0;
        const bSameCat = currentTool && b.category === currentTool.category ? 1 : 0;

        if (aSameCat !== bSameCat) return bSameCat - aSameCat; // Higher priority first

        // Otherwise use "seeded" sort order
        const aScore = (getSeed(a.slug) + seed) % 100;
        const bScore = (getSeed(b.slug) + seed) % 100;

        return aScore - bScore;
    });

    // limit to 3
    const finalSelection = relatedTools.slice(0, 3);

    // Don't render if we somehow have no tools (unlikely)
    if (finalSelection.length === 0) return null;

    return (
        <div className="w-full mt-16 pt-16 border-t">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold tracking-tight">More Useful Tools</h3>
                    <p className="text-muted-foreground">
                        Don&apos;t stop here. Check out these other free utilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {finalSelection.map((tool) => {
                        const IconComponent = iconMap[tool.icon] || ArrowRight;
                        return (
                            <Link
                                key={tool.slug}
                                href={tool.path}
                                className="group relative flex flex-col h-full rounded-xl border bg-card/40 hover:bg-card/80 p-5 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                            >
                                <div className="flex items-start gap-3 relative z-10">
                                    <div className="shrink-0 rounded-lg p-2.5 bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                        <IconComponent className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <h4 className="font-semibold transition-colors group-hover:text-primary">
                                            {tool.name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
