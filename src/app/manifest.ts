import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Tooli - Free Online Tools",
        short_name: "Tooli",
        description: "Your privacy-first online utility belt.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0f172a",
    };
}
