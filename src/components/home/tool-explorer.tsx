"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Tool, ToolCategory } from "@/config/tools";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search, ArrowRight, X,
    Calculator, Percent, TrendingUp, RefreshCcw,
    FileText, Minimize2, Merge, Type,
    Image as ImageIcon, FileImage, RefreshCw,
    Scale, QrCode, Lock, Calendar, Globe,
    GraduationCap
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
    "percent": Percent,
    "calculator": Calculator,
    "trending-up": TrendingUp,
    "refresh-ccw": RefreshCcw,
    "file-text": FileText,
    "minimize-2": Minimize2,
    "merge": Merge,
    "type": Type,
    "image": ImageIcon,
    "file-image": FileImage,
    "refresh-cw": RefreshCw,
    "scale": Scale,
    "qr-code": QrCode,
    "lock": Lock,
    "calendar": Calendar,
    "globe": Globe,
    "graduation-cap": GraduationCap,
};

interface ToolExplorerProps {
    initialTools: Record<ToolCategory, Tool[]>;
}

export function ToolExplorer({ initialTools }: ToolExplorerProps) {
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                const input = document.getElementById("main-search") as HTMLInputElement;
                input?.focus();
            }
            if (e.key === "Escape") {
                setInputValue("");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Debounce search input for better performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(inputValue);
        }, 150);
        return () => clearTimeout(timer);
    }, [inputValue]);

    // Optimize: Memorialize flat tool list and filtered results
    const allTools = useMemo(() => Object.values(initialTools).flat(), [initialTools]);

    const filteredTools = useMemo(() => {
        if (!searchQuery) return [];
        const query = searchQuery.toLowerCase();
        return allTools.filter((tool) =>
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
        );
    }, [allTools, searchQuery]);

    const isSearching = searchQuery.length > 0;

    const containerVars: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVars: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    // Optimization: Handle motion overhead safely
    const shouldAnimate = mounted && !isMobile;

    return (
        <div className="space-y-12">
            <motion.div
                initial={shouldAnimate ? { opacity: 0, y: -20, scale: 0.95 } : false}
                animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-2xl mx-auto -mt-4 mb-4 px-4 z-20"
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-blue-500/50 rounded-full opacity-20 group-hover:opacity-60 blur-md transition duration-500 group-focus-within:opacity-100 group-focus-within:blur-lg" />
                    <div className="relative flex items-center bg-background/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg group-hover:shadow-2xl transition-all duration-300 rounded-full">
                        <div className="pl-6 flex items-center justify-center text-muted-foreground group-focus-within:text-primary transition-colors duration-300">
                            <Search className="h-6 w-6" />
                        </div>
                        <Input
                            id="main-search"
                            type="text"
                            autoComplete="off"
                            placeholder="Search for tools (e.g. 'Compress', 'Convert', 'Resize' )..."
                            className="w-full h-16 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-lg px-4"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="hidden md:flex items-center gap-1 pr-4">
                            <kbd className="pointer-events-none select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                        {inputValue && (
                            <div className="pr-4">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full hover:bg-muted"
                                    onClick={() => setInputValue("")}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            <div className="container space-y-12 py-8 bg-slate-50/50 dark:bg-slate-900/40 border border-transparent dark:border-slate-800 rounded-3xl mb-12 min-h-[400px]">
                {isSearching && filteredTools.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">No tools found matching "{searchQuery}"</p>
                        <Button variant="link" onClick={() => setInputValue("")} className="mt-2 text-primary">
                            Clear search
                        </Button>
                    </div>
                ) : isSearching ? (
                    <motion.div
                        key="search-results"
                        initial={shouldAnimate ? "hidden" : false}
                        animate={shouldAnimate ? "show" : false}
                        variants={containerVars}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground/80">
                                Search Results ({filteredTools.length})
                            </h2>
                            <div className="h-px flex-1 bg-border/60"></div>
                        </div>
                        <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto pb-6 no-scrollbar scroll-smooth">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.slug} tool={tool} variants={itemVars} isMobile={isMobile} mounted={mounted} />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="categories"
                        initial={shouldAnimate ? "hidden" : false}
                        animate={shouldAnimate ? "show" : false}
                        variants={containerVars}
                        className="space-y-12"
                    >
                        {(Object.keys(initialTools) as ToolCategory[]).map((category) => {
                            const categoryHeadings: Record<ToolCategory, string> = {
                                image: "Free Image Tools Online",
                                document: "Online PDF & Document Tools",
                                finance: "Finance & Calculator Tools Online",
                                utility: "Everyday Utility Tools"
                            };
                            const categoryDescriptions: Record<ToolCategory, string> = {
                                image: "Professional-grade image processing tools. Compress, convert, and resize images without losing quality.",
                                document: "Fast and secure document management. Compress, merge, and convert PDF files directly in your browser.",
                                finance: "Accurate financial calculators for GST, interest, and loans. Simplified math for smarter decisions.",
                                utility: "Essential daily utility tools. From QR codes to unit conversions, everything you need in one place."
                            };
                            return (initialTools[category].length > 0 && (
                                <div key={category} className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-2xl font-bold tracking-tight text-foreground/80">{categoryHeadings[category]}</h2>
                                            <div className="h-px flex-1 bg-border/60"></div>
                                        </div>
                                        <p className="text-sm md:text-base text-muted-foreground/70">
                                            {categoryDescriptions[category]}
                                        </p>
                                    </div>
                                    <div className="flex flex-row flex-nowrap gap-4 overflow-x-auto pb-6 no-scrollbar scroll-smooth">
                                        {initialTools[category].map((tool) => (
                                            <ToolCard key={tool.slug} tool={tool} isMobile={isMobile} mounted={mounted} />
                                        ))}
                                    </div>
                                </div>
                            ));
                        })}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function ToolCard({ tool, variants, isMobile, mounted }: { tool: Tool, variants?: Variants, isMobile?: boolean, mounted?: boolean }) {
    const IconComponent = useMemo(() => iconMap[tool.icon] || ArrowRight, [tool.icon]);
    const shouldAnimate = mounted && !isMobile;

    return (
        <motion.div
            initial={shouldAnimate ? (variants ? "hidden" : { opacity: 0, y: 20 }) : false}
            animate={shouldAnimate ? (variants ? "show" : { opacity: 1, y: 0 }) : false}
            variants={variants}
            className="flex-none w-[280px] sm:w-[320px] transition-all duration-300 md:hover:-translate-y-2 md:active:scale-95"
        >
            <Link
                href={tool.path}
                className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-card/40 md:hover:bg-card/80 p-6 transition-all duration-300 md:hover:shadow-xl md:hover:shadow-primary/10 md:hover:border-primary/30 backdrop-blur-sm"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start gap-4 flex-1 relative z-10">
                    <div className="shrink-0 rounded-lg p-3 bg-primary/10 text-primary transition-all duration-300 md:group-hover:bg-primary md:group-hover:text-primary-foreground md:group-hover:scale-110 shadow-sm">
                        <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2 pt-0.5">
                        <h3 className="font-semibold text-lg transition-colors md:group-hover:text-primary tracking-tight">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    </div>
                </div>

                <div className="absolute right-4 bottom-4 opacity-0 transform translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 z-10">
                    <ArrowRight className="h-5 w-5 text-primary" />
                </div>
            </Link>
        </motion.div>
    );
}
