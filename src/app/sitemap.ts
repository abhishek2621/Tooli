import { MetadataRoute } from 'next'
import { siteConfig } from "@/config/site";
import { toolsByCategory } from "@/config/tools";
import { getAllBlogPosts } from "@/lib/blog";

function buildUrl(base: string, path: string) {
    const cleanBase = base.trim().replace(/^(https?:\/\/)+/, "https://").replace(/\/$/, "")
    const cleanPath = path.trim().replace(/^\//, "")
    return `${cleanBase}/${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/blog',
        '/about',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: buildUrl(siteConfig.url, route),
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const toolRoutes = Object.values(toolsByCategory).flatMap(categoryTools =>
        categoryTools.map(tool => ({
            url: buildUrl(siteConfig.url, tool.path),
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    );

    const compressionSizes = [50, 100, 200, 500];
    const compressionRoutes = compressionSizes.map(size => ({
        url: buildUrl(siteConfig.url, `/compress-image-to-${size}kb`),
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    const blogRoutes = getAllBlogPosts().map(post => ({
        url: buildUrl(siteConfig.url, `/blog/${post.slug}`),
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...routes, ...toolRoutes, ...compressionRoutes, ...blogRoutes];
}
