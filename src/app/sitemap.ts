import { MetadataRoute } from 'next'
import { siteConfig } from "@/config/site";
import { toolsByCategory } from "@/config/tools";
function buildUrl(base: string, path: string) {
    const cleanBase = base.trim().replace(/^(https?:\/\/)+/, "https://").replace(/\/$/, "")
    const cleanPath = path.trim().replace(/^\//, "")
    return `${cleanBase}/${cleanPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
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

    return [...routes, ...toolRoutes];
}

