"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { toolsByCategory } from "@/config/tools";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, Smartphone } from "lucide-react";
import { DesktopNav } from "./desktop-nav";

export function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    interface BeforeInstallPromptEvent extends Event {
        prompt: () => Promise<void>;
        userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    }
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                            <span className="font-bold text-xl inline-block tracking-tight">{siteConfig.name}</span>
                        </Link>
                        <div className="hidden md:flex">
                            {mounted && <DesktopNav />}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {deferredPrompt && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleInstall}
                                className="flex items-center gap-2 border-primary/20 hover:bg-primary/5 text-primary"
                            >
                                <Smartphone className="h-4 w-4" />
                                Install App
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center md:hidden gap-2">
                        {deferredPrompt && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleInstall}
                                className="h-10 w-10 rounded-full text-primary"
                            >
                                <Smartphone className="h-5 w-5" />
                            </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className="h-10 w-10 rounded-full hover:bg-muted/60 active:scale-95 transition-all">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Optimized with CSS Transitions */}
            {isMobile && (
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 top-16 z-40 bg-background/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div
                        className={`fixed top-16 right-0 bottom-0 z-50 w-full max-w-[320px] border-l bg-background shadow-2xl transition-transform duration-300 ease-in-out transform overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex flex-col min-h-full p-6">
                            <div className="space-y-6 flex-1">
                                {((["image", "document", "finance", "utility"] as const)).map((category) => (
                                    <div key={category} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-bold capitalize text-primary flex items-center gap-2">
                                                {category} Tool
                                            </h4>
                                        </div>

                                        <div className="flex flex-col space-y-1 pl-2 border-l border-border/50">
                                            {toolsByCategory[category]?.map((tool) => (
                                                <Link
                                                    key={tool.slug}
                                                    href={tool.path}
                                                    className="text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 py-2 px-3 rounded-md transition-all flex items-center"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {tool.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
