"use client";

import Link from "next/link";
import { toolsByCategory } from "@/config/tools";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function DesktopNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {((["image", "document", "finance", "utility"] as const)).map((category) => (
                    <NavigationMenuItem key={category}>
                        <NavigationMenuTrigger className="capitalize bg-transparent">
                            {category}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-background">
                                {toolsByCategory[category]?.map((tool) => (
                                    <div key={tool.slug}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={tool.path}
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <div className="flex flex-col space-y-1">
                                                    <div className="text-sm font-medium leading-none">{tool.name}</div>
                                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                                        {tool.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </div>
                                ))}
                                <div className="col-span-full border-t pt-2 mt-1">
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={`/${category}`}
                                            className="flex items-center justify-center w-full py-2.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-md transition-all group"
                                        >
                                            View all {category} tools
                                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
