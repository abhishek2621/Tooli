"use client";

import { useState } from "react";
import Link from "next/link";
import { Tool, ToolCategory } from "@/config/tools";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search, ArrowRight,
    Calculator, Percent, Landmark, TrendingUp, RefreshCcw,
    FileText, Minimize2, Merge, Type,
    Image as ImageIcon, FileImage, RefreshCw,
    Scale, QrCode, Lock, Calendar, Globe,
    GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, Variants } from "framer-motion";

const iconMap: Record<string, any> = {
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

interface ToolExplorerProps {
    initialTools: Record<ToolCategory, Tool[]>;
}

export function ToolExplorer({ initialTools }: ToolExplorerProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Flatten tools for easier searching
    const allTools = Object.values(initialTools).flat();

    // Filter tools based on search query
    const filteredTools = allTools.filter((tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered tools by category (if standard view) or show flat list (if searching)
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

    return (
        <div className="space-y-12">
            {/* Search Bar - Floating in Hero Area essentially */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative max-w-2xl mx-auto -mt-8 mb-12 shadow-xl shadow-primary/5 rounded-full"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for tools (e.g. 'PDF', 'GST', 'Compressor')..."
                        className="w-full h-14 pl-12 pr-4 rounded-full border-muted text-base bg-background/80 backdrop-blur-sm focus-visible:ring-primary/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </motion.div>

            {/* Results Grid */}
            <div className="container space-y-12 py-8 bg-slate-50/50 dark:bg-slate-900/40 border border-transparent dark:border-slate-800 rounded-3xl mb-12 min-h-[400px]">
                <AnimatePresence mode="wait">
                    {filteredTools.length === 0 ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20 text-muted-foreground"
                        >
                            <p className="text-xl">No tools found matching "{searchQuery}"</p>
                            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2 text-primary">
                                Clear search
                            </Button>
                        </motion.div>
                    ) : isSearching ? (
                        <motion.div
                            key="search-results"
                            variants={containerVars}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0 }}
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
                            {(Object.keys(initialTools) as ToolCategory[]).map((category) => (
                                <motion.div key={category} variants={itemVars} className="space-y-6">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold capitalize tracking-tight text-foreground/80">{category}</h2>
                                        <div className="h-px flex-1 bg-border/60"></div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {initialTools[category].map((tool) => (
                                            <ToolCard key={tool.slug} tool={tool} /> // Categories themselves fade in, cards inside could animate too but letting the block animate is cleaner for large lists
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ToolCard({ tool, variants }: { tool: Tool, variants?: any }) {
    // Resolve icon from map, fallback to generic
    const IconComponent = iconMap[tool.icon] || ArrowRight;

    return (
        <motion.div variants={variants} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
            <Link
                href={tool.path}
                className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-card/60 hover:bg-card/90 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
            >
                <div className="flex items-start gap-4 flex-1">
                    <div className="shrink-0 rounded-lg p-3 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-2 pt-0.5">
                        <h3 className="font-semibold text-lg transition-colors group-hover:text-primary">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    </div>
                </div>

                <div className="absolute right-4 bottom-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="h-5 w-5 text-primary" />
                </div>
            </Link>
        </motion.div>
    );
}
