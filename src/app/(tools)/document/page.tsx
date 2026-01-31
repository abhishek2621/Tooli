import { Metadata } from "next";
import { toolsByCategory } from "@/config/tools";
import { CategoryPage } from "@/components/shared/category-page";

export const metadata: Metadata = {
    title: "Document Tools | Convert, Compress & Merge PDFs",
    description: "All-in-one document management. Compress PDFs, merge files, and convert text to PDF without uploading.",
};

export default function DocumentCategory() {
    return (
        <CategoryPage
            title="Document Tools"
            description="Essential tools for handling PDF files and text documents with ease and privacy."
            tools={toolsByCategory["document"] || []}
        />
    );
}
