import { MetadataRoute } from "next";
import { tools } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
        ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
        : "http://localhost:3000";

    // Static routes
    const routes = ["", "/about", "/privacy"];

    // Dynamic tool routes
    const toolRoutes = tools.map((tool) => tool.path);

    const allRoutes = [...routes, ...toolRoutes];

    return allRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
    }));
}
