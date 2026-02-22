"use client";

interface SoftwareAppSchema {
  name: string;
  description: string;
  url: string;
  category?: string;
  price?: string;
  priceCurrency?: string;
}

interface FAQSchema {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOJsonLdProps {
  softwareApp?: SoftwareAppSchema;
  faq?: FAQSchema[];
  breadcrumbs?: BreadcrumbItem[];
}

export function generateSoftwareAppSchema(app: SoftwareAppSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "applicationCategory": app.category || "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": app.price || "0",
      "priceCurrency": app.priceCurrency || "USD",
    },
    "description": app.description,
    "url": app.url,
  };
}

export function generateFAQSchema(faqs: FAQSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function SEOJsonLd({ softwareApp, faq, breadcrumbs }: SEOJsonLdProps) {
  const schemas: object[] = [];

  if (softwareApp) {
    schemas.push(generateSoftwareAppSchema(softwareApp));
  }

  if (faq && faq.length > 0) {
    schemas.push(generateFAQSchema(faq));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  if (schemas.length === 0) return null;

  const result = schemas.length === 1
    ? schemas[0]
    : { "@context": "https://schema.org", "@graph": schemas };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(result) }}
    />
  );
}
