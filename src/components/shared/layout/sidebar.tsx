"use client";

import Link from "next/link";
import { toolsByCategory, ToolCategory } from "@/config/tools";
import { cn } from "@/lib/utils";

export function ToolSidebar() {
    return (
        <aside className="hidden md:flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 py-6 pr-4">
            <div
                className="h-full w-full rounded-xl border bg-background/40 backdrop-blur-md p-4 shadow-sm overflow-y-auto animate-slide-in-left"
            >
                <div className="flex flex-col gap-6">
                    {(Object.keys(toolsByCategory) as ToolCategory[]).map((category, catIndex) => {
                        const categoryStyles: Record<ToolCategory, { bg: string, text: string, border: string, dot: string }> = {
                            image: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20", dot: "bg-blue-500" },
                            document: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/20", dot: "bg-purple-500" },
                            finance: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-500" },
                            utility: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20", dot: "bg-amber-500" }
                        };
                        const style = categoryStyles[category];

                        return (
                            <div
                                key={category}
                                className="flex flex-col gap-2 opacity-0 animate-slide-in-left"
                                style={{ animationDelay: `${0.1 + (catIndex * 0.1)}s`, animationFillMode: 'forwards' }}
                            >
                                <div className="flex items-center gap-2 px-2 mb-1">
                                    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm transition-all duration-300", style.bg, style.border)}>
                                        <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", style.dot)} />
                                        <h4 className={cn("font-bold text-[10px] uppercase tracking-[0.2em]", style.text)}>
                                            {category}
                                        </h4>
                                    </div>
                                    <div className={cn("h-px flex-1 bg-gradient-to-r to-transparent", style.dot.replace('bg-', 'from-').concat('/20'))} />
                                </div>
                                <div className="flex flex-col gap-1 text-sm">
                                    {toolsByCategory[category].map((tool) => (
                                        <Link
                                            key={tool.slug}
                                            href={tool.path}
                                            className={cn(
                                                "block rounded-md px-3 py-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium"
                                            )}
                                        >
                                            {tool.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
