import type { Metadata } from "next";
import { SEOJsonLd } from "@/components/shared/seo-json-ld";
import { RelatedTools } from "@/components/shared/related-tools";
import { ReactNode } from "react";

interface ToolSEOProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  category?: string;
  showRelatedAtBottom?: boolean;
  children: ReactNode;
}

export function generateToolMetadata({
  title,
  description,
  canonical,
  keywords = [],
}: {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
}): Metadata {
  return {
    title: `${title} – Free Online Tool`,
    description,
    keywords: [...keywords, "free online tool", "no signup", "privacy first"],
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} – Free Online Tool`,
      description,
      type: "website",
      url: canonical,
    },
  };
}

export function ToolSEOWrapper({
  title,
  description,
  canonical,
  category,
  showRelatedAtBottom = true,
  children,
}: ToolSEOProps) {
  const jsonLd = {
    name: title,
    description,
    url: canonical,
    category: category || "UtilitiesApplication",
  };

  return (
    <>
      <SEOJsonLd
        softwareApp={jsonLd}
        breadcrumbs={[
          { name: "Home", url: "https://www.tooli.in" },
          { name: title, url: canonical },
        ]}
      />
      <div className="space-y-6 w-full">
        {children}
        {showRelatedAtBottom && <RelatedTools />}
      </div>
    </>
  );
}
