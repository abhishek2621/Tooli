import { MetadataRoute } from 'next'
import { siteConfig } from "@/config/site";
import { toolsByCategory } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/about',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const toolRoutes = Object.values(toolsByCategory).flatMap(categoryTools =>
        categoryTools.map(tool => ({
            url: `${siteConfig.url}${tool.path}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))
    );

    return [...routes, ...toolRoutes];
}
