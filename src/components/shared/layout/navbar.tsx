"use client";

import Link from "next/link";
import { useState } from "react";
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
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X, Github } from "lucide-react";
import { cn } from "@/lib/utils";
// import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                        <span className="font-bold text-xl inline-block tracking-tight">{siteConfig.name}</span>
                    </Link>
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            {(["image", "document", "finance", "utility", "education"] as const).map((category) => (
                                <NavigationMenuItem key={category}>
                                    <NavigationMenuTrigger className="capitalize bg-transparent">
                                        {category}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background">
                                            {toolsByCategory[category]?.map((tool) => (
                                                <li key={tool.slug}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={tool.path}
                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                        >
                                                            <div className="text-sm font-medium leading-none">{tool.name}</div>
                                                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                                                {tool.description}
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                            <li className="col-span-full border-t pt-2 mt-1">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        href={`/${category}`}
                                                        className="flex items-center justify-center w-full py-2 text-sm text-muted-foreground hover:text-primary transition-colors bg-muted/50 rounded-md"
                                                    >
                                                        View all {category} tools
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden md:flex items-center gap-3">

                    <Button size="sm" asChild className="shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all bg-primary text-primary-foreground hover:bg-primary/90">

                    </Button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">

                    <Button size="sm" asChild className="shadow-md shadow-primary/20 text-xs h-8 px-3">
                        <Link href="/#tools">All Tools</Link>
                    </Button>
                    <button className="text-foreground" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border/50 bg-background">
                    <div className="container flex flex-col space-y-4 py-6 px-4">
                        <Link href="/finance" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Finance</Link>
                        <Link href="/document" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Document</Link>
                        <Link href="/image" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Image</Link>
                        <Link href="/utility" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>Utility</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
