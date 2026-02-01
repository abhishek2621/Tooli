import Link from "next/link";
import { siteConfig } from "@/config/site";
import { toolsByCategory, ToolCategory } from "@/config/tools";
import { RequestToolCta } from "@/components/shared/request-tool-cta";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-slate-50 dark:bg-slate-950 relative z-10">
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
                        <div className="flex items-center gap-4 mt-6">
                            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span className="sr-only">X (formerly Twitter)</span>
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
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
                        Made in <span className="font-medium text-foreground">INDIA</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
