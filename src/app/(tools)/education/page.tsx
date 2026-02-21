import { Metadata } from "next";
import { toolsByCategory } from "@/config/tools";
import { CategoryPage } from "@/components/shared/category-page";

export const metadata: Metadata = {
    title: "Education Tools | GPA Calculator & More",
    description: "Free education tools for students. Calculate GPA, organize assignments, and more.",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    alternates: {
        canonical: 'https://www.tooli.in/education',
    },
};

export default function EducationCategory() {
    return (
        <CategoryPage
            title="Education Tools"
            description="Boost your academic productivity with our student-focused calculators and utilities."
            tools={toolsByCategory["education"] || []}
        />
    );
}


