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
                    {(Object.keys(toolsByCategory) as ToolCategory[]).map((category, catIndex) => (
                        <div
                            key={category}
                            className="flex flex-col gap-2 opacity-0 animate-slide-in-left"
                            style={{ animationDelay: `${0.1 + (catIndex * 0.1)}s` }}
                        >
                            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80 px-2">{category}</h4>
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
                    ))}
                </div>
            </div>
        </aside>
    );
}
