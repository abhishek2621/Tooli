import { getBlogPostBySlug, getBlogSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { Metadata } from 'next';
import { tools } from '@/config/tools';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | Tooli Blog`,
    description: post.frontmatter.description,
    authors: post.frontmatter.author ? [{ name: post.frontmatter.author }] : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-extrabold mt-8 mb-4 tracking-tight lg:text-5xl" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mt-8 mb-4 tracking-tight border-b pb-2" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-6 mb-3 tracking-tight" {...props} />,
  p: (props: any) => <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4" {...props} />,
  ul: (props: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
  ol: (props: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
  a: (props: any) => <a className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors" {...props} />,
  blockquote: (props: any) => <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground bg-secondary/20 py-2 pr-4 rounded-r-lg" {...props} />,
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
      
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          {post.frontmatter.title}
        </h1>
        <div className="flex items-center text-muted-foreground space-x-4 mb-6">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          {post.frontmatter.author && (
            <div>By <span className="font-medium text-foreground">{post.frontmatter.author}</span></div>
          )}
        </div>
        {post.frontmatter.tags && (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map(tag => (
              <span key={tag} className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="text-lg">
        <MDXRemote source={post.content} components={components} />
      </div>

      {post.frontmatter.relatedTools && post.frontmatter.relatedTools.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-2xl font-bold mb-6">Related Tools</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {post.frontmatter.relatedTools.map(toolSlug => {
              const tool = tools.find(t => t.slug.toLowerCase() === toolSlug.toLowerCase());
              const href = tool ? tool.path : `/${toolSlug.toLowerCase()}`;
              const displayName = tool ? tool.name : toolSlug.replace(/-/g, ' ');

              return (
                <Link key={toolSlug} href={href} className="block">
                  <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:border-primary/50 hover:shadow-md transition-all h-full flex flex-col justify-center">
                    <span className="font-semibold block text-lg capitalize">{displayName}</span>
                    <span className="text-sm text-muted-foreground mt-2 inline-block">Try this tool &rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
