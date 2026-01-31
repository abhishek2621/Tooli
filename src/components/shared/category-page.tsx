import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tool } from "@/config/tools";

interface CategoryPageProps {
    title: string;
    description: string;
    tools: Tool[];
}

export function CategoryPage({ title, description, tools }: CategoryPageProps) {
    return (
        <div className="space-y-12">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={tool.path}
                        className="group relative overflow-hidden rounded-xl border bg-background p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-lg text-primary transition-colors">{tool.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                        </div>
                        <div className="absolute right-4 bottom-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <ArrowRight className="h-5 w-5 text-primary" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
