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
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                            <span className="font-bold text-xl inline-block tracking-tight">{siteConfig.name}</span>
                        </Link>
                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList>
                                {((["image", "document", "finance", "utility", "education"] as const)).map((category) => (
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
                                                            className="flex items-center justify-center w-full py-2.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-md transition-all group"
                                                        >
                                                            View all {category} tools
                                                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
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
                    <div className="flex items-center md:hidden">
                        <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu" className="h-10 w-10 rounded-full hover:bg-muted/60 active:scale-95 transition-all">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Right Side Drawer with Premium Animation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 top-16 z-40 bg-background/50 backdrop-blur-sm md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-16 right-0 bottom-0 z-50 w-full max-w-[320px] border-l bg-background shadow-2xl md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col min-h-full p-6">
                            

                                <div className="space-y-6 flex-1">
                                    {((["image", "document", "finance", "utility", "education"] as const)).map((category) => (
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
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
