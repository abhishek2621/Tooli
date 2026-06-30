import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export type BlogPostFrontmatter = {
  title: string;
  date: string;
  description: string;
  author?: string;
  relatedTools?: string[];
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
};

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  return fs.readdirSync(contentDirectory)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => file.replace(/\.mdx?$/, ''));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const fullPathMdx = path.join(contentDirectory, `${slug}.mdx`);
  const fullPathMd = path.join(contentDirectory, `${slug}.md`);

  let fullPath = '';
  if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else if (fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as BlogPostFrontmatter,
    content,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1));
  return posts;
}
