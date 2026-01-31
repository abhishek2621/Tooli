import { Metadata } from "next";
import { toolsByCategory } from "@/config/tools";
import { CategoryPage } from "@/components/shared/category-page";

export const metadata: Metadata = {
    title: "Image Tools | Compress & Convert Images",
    description: "Optimize your images for the web. Compress JPGs/PNGs and convert image formats quickly.",
};

export default function ImageCategory() {
    return (
        <CategoryPage
            title="Image Tools"
            description="Powerful image processing tools to optimize, convert, and manage your visual assets."
            tools={toolsByCategory["image"] || []}
        />
    );
}
