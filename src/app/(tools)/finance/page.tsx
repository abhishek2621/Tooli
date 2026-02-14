import { Metadata } from "next";
import { toolsByCategory } from "@/config/tools";
import { CategoryPage } from "@/components/shared/category-page";

export const metadata: Metadata = {
    title: "Finance Tools | GST, EMI, & Currency Calculators",
    description: "Free finance calculators for everyday use. Calculate GST, loan EMIs, and convert currencies instantly.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/finance',
    },
};

export default function FinanceCategory() {
    return (
        <CategoryPage
            title="Finance Tools"
            description="Manage your money smarter with our collection of financial calculators and converters."
            tools={toolsByCategory["finance"] || []}
        />
    );
}
