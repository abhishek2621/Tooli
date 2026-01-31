import Link from "next/link";
import { siteConfig } from "@/config/site";
import { toolsByCategory, ToolCategory } from "@/config/tools";
import { RequestToolCta } from "@/components/shared/request-tool-cta";

export function Footer() {
    return (
        <footer className="border-t bg-slate-50 dark:bg-slate-950">
            <div className="container py-12 md:py-16 space-y-12">
                <RequestToolCta />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-xl">{siteConfig.name}</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {siteConfig.description}
                            <br />
                            Built for privacy and speed.
                        </p>

                    </div>

                    {/* Dynamic Category Columns */}
                    {(Object.keys(toolsByCategory) as ToolCategory[]).slice(0, 4).map((category) => (
                        <div key={category} className="flex flex-col gap-2">
                            <h4 className="font-semibold text-sm capitalize">{category} Tools</h4>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                {toolsByCategory[category].slice(0, 6).map((tool) => (
                                    <li key={tool.slug}>
                                        <Link href={tool.path} className="text-primary/90 hover:text-primary transition-colors block py-0.5">
                                            {tool.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-sm text-muted-foreground">
                        <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-right">
                        Made with <span className="font-medium text-foreground">❤️</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
