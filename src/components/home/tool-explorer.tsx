"use client";

import { useState, useEffect } from "react";
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
import { motion, AnimatePresence, Variants } from "framer-motion";

const iconMap: Record<string, any> = {
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

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(inputValue);
        }, 200);
        return () => clearTimeout(timer);
    }, [inputValue]);

    const allTools = Object.values(initialTools).flat();
    const filteredTools = allTools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isSearching = searchQuery.length > 0;

    const containerVars: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0 : 0.05
            }
        }
    };

    const itemVars: Variants = {
        hidden: { opacity: 0, y: isMobile ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    return (
        <div className="space-y-12">
            <motion.div
                initial={isMobile ? false : { opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative w-full max-w-2xl mx-auto -mt-4 mb-8 px-4 z-20"
            >
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-purple-500/50 to-blue-500/50 rounded-full opacity-20 group-hover:opacity-60 blur-md transition duration-500 group-focus-within:opacity-100 group-focus-within:blur-lg" />
                    <div className="relative flex items-center bg-background/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg group-hover:shadow-2xl transition-all duration-300 rounded-full">
                        <div className="pl-6 flex items-center justify-center text-muted-foreground group-focus-within:text-primary transition-colors duration-300">
                            <Search className="h-6 w-6" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search for tools (e.g. 'PDF', 'Tax')..."
                            className="w-full h-16 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-lg px-4"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
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
                {filteredTools.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-xl">No tools found matching "{searchQuery}"</p>
                        <Button variant="link" onClick={() => setInputValue("")} className="mt-2 text-primary">
                            Clear search
                        </Button>
                    </div>
                ) : isSearching ? (
                    <motion.div
                        key="search-results"
                        variants={containerVars}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-bold tracking-tight text-foreground/80">
                                Search Results ({filteredTools.length})
                            </h2>
                            <div className="h-px flex-1 bg-border/60"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredTools.map((tool) => (
                                <ToolCard key={tool.slug} tool={tool} variants={itemVars} />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="categories"
                        variants={containerVars}
                        initial="hidden"
                        animate="show"
                        className="space-y-12"
                    >
                        {(Object.keys(initialTools) as ToolCategory[]).map((category) => {
                            const categoryHeadings: Record<ToolCategory, string> = {
                                image: "Free Image Tools Online",
                                document: "Online PDF & Document Tools",
                                finance: "Finance & Calculator Tools Online",
                                utility: "Everyday Utility Tools",
                                education: "Study & Education Tools Online"
                            };
                            return (
                                <motion.div key={category} variants={itemVars} className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold capitalize tracking-tight text-foreground/80">{categoryHeadings[category]}</h2>
                                        <div className="h-px flex-1 bg-border/60"></div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {initialTools[category].map((tool) => (
                                            <ToolCard key={tool.slug} tool={tool} />
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function ToolCard({ tool, variants }: { tool: Tool, variants?: any }) {
    const IconComponent = iconMap[tool.icon] || ArrowRight;

    return (
        <motion.div
            variants={variants}
            className="h-full transition-all duration-300 hover:-translate-y-2 active:scale-95"
        >
            <Link
                href={tool.path}
                className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-card/40 hover:bg-card/80 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 backdrop-blur-sm"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start gap-4 flex-1 relative z-10">
                    <div className="shrink-0 rounded-lg p-3 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-sm">
                        <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2 pt-0.5">
                        <h3 className="font-semibold text-lg transition-colors group-hover:text-primary tracking-tight">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    </div>
                </div>

                <div className="absolute right-4 bottom-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-10">
                    <ArrowRight className="h-5 w-5 text-primary" />
                </div>
            </Link>
        </motion.div>
    );
}
