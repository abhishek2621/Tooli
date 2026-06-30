import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import { CalendarIcon, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Tooli',
  description: 'Read the latest articles, tutorials, and guides on Tooli.',
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Our Blog</h1>
        <p className="text-xl text-muted-foreground">
          Discover insights, tutorials, and updates to help you get the most out of our tools.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="transition-transform hover:-translate-y-1 block">
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
                  <span className="flex items-center">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <CardTitle className="line-clamp-2">{post.frontmatter.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="line-clamp-3 mb-4">
                  {post.frontmatter.description}
                </CardDescription>
                {post.frontmatter.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p>No blog posts found. Check back later!</p>
        </div>
      )}
    </div>
  );
}
