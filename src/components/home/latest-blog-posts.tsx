import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, ArrowRight } from "lucide-react";

export function LatestBlogPosts() {
    const posts = getAllBlogPosts().slice(0, 3); // Get top 3 latest posts

    if (posts.length === 0) {
        return null; // Don't show the section if there are no posts
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-2">
                            Our Blog
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest from Tooli</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Tips, guides, and tutorials to get the most out of our tools and improve your productivity.
                        </p>
                    </div>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} className="transition-transform hover:-translate-y-1 block h-full">
                            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                                <CardHeader>
                                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                                        <CalendarIcon className="mr-1 h-3 w-3" />
                                        {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                    <CardTitle className="line-clamp-2 text-xl">{post.frontmatter.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <CardDescription className="line-clamp-3">
                                        {post.frontmatter.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2"
                    >
                        View all posts
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
