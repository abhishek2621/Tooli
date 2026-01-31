import { Metadata } from "next";
import { toolsByCategory } from "@/config/tools";
import { CategoryPage } from "@/components/shared/category-page";

export const metadata: Metadata = {
    title: "Utility Tools | Unit Converters, Password Generators & More",
    description: "Helpful utilities for everyday tasks. Generate passwords, calculate age, and convert units.",
};

export default function UtilityCategory() {
    return (
        <CategoryPage
            title="Utility Tools"
            description="A Swiss Army knife of digital tools to help you solve small problems quickly."
            tools={toolsByCategory["utility"] || []}
        />
    );
}
