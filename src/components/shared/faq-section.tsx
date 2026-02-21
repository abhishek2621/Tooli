"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ title = "Frequently Asked Questions", items, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className={cn("mt-16 space-y-6", className)}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="divide-y divide-border rounded-lg border">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-muted-foreground">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Pre-defined FAQ templates for common tool types
export const PDF_FAQS: FAQItem[] = [
  {
    question: "Is PDF compression secure?",
    answer: "Yes, all PDF compression happens in your browser. Your files are never uploaded to any server, ensuring complete privacy and security.",
  },
  {
    question: "Will the quality be reduced?",
    answer: "Our smart compression algorithm reduces file size while maintaining optimal quality. You can adjust compression levels to balance size and quality.",
  },
  {
    question: "Is there a file size limit?",
    answer: "You can compress PDFs up to 50MB. For larger files, try splitting them into smaller documents first.",
  },
  {
    question: "Do I need to install any software?",
    answer: "No installation required. Our tool works entirely in your browser - just upload your PDF and download the compressed version.",
  },
];

export const IMAGE_FAQS: FAQItem[] = [
  {
    question: "What image formats are supported?",
    answer: "We support JPEG, PNG, WebP, and GIF formats. You can convert between these formats easily.",
  },
  {
    question: "Is image compression lossy or lossless?",
    answer: "We offer both options. Lossless preserves original quality while lossy achieves maximum compression with minimal visible difference.",
  },
  {
    question: "Do you keep my images?",
    answer: "No, all processing happens in your browser. Your images are never uploaded or stored on any server.",
  },
  {
    question: "What's the maximum file size?",
    answer: "You can upload images up to 25MB. For best results with large images, consider resizing before compression.",
  },
];

export const CALCULATOR_FAQS: FAQItem[] = [
  {
    question: "Are the calculations accurate?",
    answer: "Yes, our calculators use industry-standard formulas and formulas. Results are for informational purposes only.",
  },
  {
    question: "Is my data saved?",
    answer: "No, all calculations happen locally in your browser. No data is stored or transmitted.",
  },
  {
    question: "Can I use these for official purposes?",
    answer: "While we strive for accuracy, these tools should be used as estimates. For official financial decisions, consult a professional.",
  },
];

export const CURRENCY_FAQS: FAQItem[] = [
  {
    question: "How often are exchange rates updated?",
    answer: "Rates are fetched from Frankfurter API and updated in real-time. We also cache results for 1 hour for better performance.",
  },
  {
    question: "What if the API is unavailable?",
    answer: "We provide fallback rates from the last known values. An indicator will show when offline rates are being used.",
  },
  {
    question: "Are these rates official?",
    answer: "Rates are provided by Frankfurter API, which sources from the European Central Bank. They're indicative and may vary from your bank.",
  },
];
