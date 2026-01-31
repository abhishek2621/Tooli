"use client";

import Link from "next/link";
import { toolsByCategory, ToolCategory } from "@/config/tools";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ToolSidebar() {
    return (
        <aside className="hidden md:flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 py-6 pr-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full w-full rounded-xl border bg-background/40 backdrop-blur-md p-4 shadow-sm overflow-y-auto"
            >
                <div className="flex flex-col gap-6">
                    {(Object.keys(toolsByCategory) as ToolCategory[]).map((category, catIndex) => (
                        <motion.div
                            key={category}
                            className="flex flex-col gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (catIndex * 0.1), duration: 0.4 }}
                        >
                            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground/80 px-2">{category}</h4>
                            <div className="flex flex-col gap-1 text-sm">
                                {toolsByCategory[category].map((tool, index) => (
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
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </aside>
    );
}
