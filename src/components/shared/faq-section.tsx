"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <section className={cn("mt-16 w-full", className)}>
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
          <HelpCircle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative overflow-hidden rounded-xl border bg-card transition-all duration-200",
              openIndex === index ? "border-primary/50 shadow-sm" : "hover:border-border"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className={cn(
                "font-medium transition-colors",
                openIndex === index ? "text-primary" : "text-foreground"
              )}>
                {item.question}
              </span>
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg bg-muted transition-all duration-200",
                openIndex === index && "bg-primary/10 rotate-180"
              )}>
                {openIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-primary" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-out",
                openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 pt-1 text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
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

// Tool-specific FAQs with 2026 SEO keywords
export const IMAGE_COMPRESSOR_FAQS: FAQItem[] = [
  {
    question: "How does AI-powered image compression work in 2026?",
    answer: "Our advanced compression algorithm uses intelligent content-aware analysis to preserve visual quality while reducing file size. It automatically detects important image regions and optimizes compression accordingly, achieving up to 90% size reduction without visible quality loss.",
  },
  {
    question: "What is the best image compressor for web optimization in 2026?",
    answer: "Tooli offers the best free online image compressor for web optimization, supporting WebP, AVIF, and traditional formats. Our browser-based compression delivers excellent results without any software installation, making it ideal for SEO-focused web developers.",
  },
  {
    question: "Can I compress multiple images at once?",
    answer: "Yes, our batch compression feature allows you to upload and compress multiple images simultaneously. This is perfect for optimizing entire image galleries or website assets in one go, saving valuable time.",
  },
  {
    question: "Does image compression affect SEO rankings?",
    answer: "Yes, image compression significantly impacts SEO. Faster loading times improve Core Web Vitals scores (LCP, CLS), which are critical ranking factors in 2026. Compressed images improve page speed, user experience, and search engine rankings.",
  },
  {
    question: "What is the difference between lossy and lossless compression?",
    answer: "Lossy compression achieves maximum file size reduction by removing some image data, ideal for photos and web images. Lossless compression preserves all original data, perfect for archival or professional use where every detail matters.",
  },
];

export const PDF_MERGER_FAQS: FAQItem[] = [
  {
    question: "How to merge PDF files online for free?",
    answer: "Simply drag and drop your PDF files into our merger tool, arrange them in your preferred order, and click merge. The process happens entirely in your browser with no file size limits or watermarks.",
  },
  {
    question: "Is PDF merger secure for confidential documents?",
    answer: "Absolutely. All PDF merging happens client-side in your browser. Your documents are never uploaded to any server, ensuring complete data privacy and security for sensitive business files.",
  },
  {
    question: "Can I merge scanned PDF documents?",
    answer: "Yes, our PDF merger handles scanned documents. However, for best results with scanned content, ensure all pages are legible and properly oriented before merging.",
  },
  {
    question: "How many PDFs can I merge at once?",
    answer: "You can merge up to 20 PDF files in a single batch. For larger projects, simply run multiple merge operations. There's no file count limit across sessions.",
  },
  {
    question: "Will the merged PDF maintain original quality?",
    answer: "Yes, our merger preserves all original PDF quality, including text clarity, image resolution, and formatting. The output maintains the exact quality of your source documents.",
  },
];

export const IMAGE_TO_PDF_FAQS: FAQItem[] = [
  {
    question: "How to convert JPG to PDF without losing quality?",
    answer: "Our image to PDF converter maintains original image resolution and quality. Simply upload your JPG, PNG, or WebP images, arrange them in order, and download a high-quality PDF document instantly.",
  },
  {
    question: "Can I convert multiple images to a single PDF?",
    answer: "Yes, batch conversion allows you to combine multiple images into one PDF. You can reorder images, set page sizes, and choose layout options for professional results.",
  },
  {
    question: "Is image to PDF conversion free and watermark-free?",
    answer: "完全免费且无水印。Our converter produces clean PDF documents without any branding or watermarks, perfect for professional and commercial use.",
  },
  {
    question: "What image formats are supported for PDF conversion?",
    answer: "We support all major formats including JPEG, PNG, WebP, GIF, BMP, and TIFF. Our converter handles high-resolution images up to 25MB per file.",
  },
  {
    question: "How to create a PDF from photos for printing?",
    answer: "Upload your photos, select print-ready PDF settings including A4 or Letter size, adjust image positioning, and download. Our tool optimizes images for high-quality printing.",
  },
];

export const IMAGE_CONVERTER_FAQS: FAQItem[] = [
  {
    question: "What is the best image format for website SEO in 2026?",
    answer: "WebP and AVIF are the best formats for website SEO in 2026, offering 25-50% smaller file sizes than JPEG with superior quality. Our converter makes it easy to batch convert to modern formats.",
  },
  {
    question: "How to convert PNG to WebP without quality loss?",
    answer: "Our converter offers lossless WebP conversion that preserves all original image data. Simply select PNG as input, choose WebP with lossless setting, and download optimized images.",
  },
  {
    question: "Does image format affect website loading speed?",
    answer: "Yes, image format significantly impacts page load times. Modern formats like WebP and AVIF load 30-50% faster than traditional JPEG/PNG, improving Core Web Vitals and SEO rankings.",
  },
  {
    question: "Can I batch convert multiple images to different formats?",
    answer: "Yes, our batch converter handles multiple images simultaneously. You can convert entire folders to any supported format while maintaining original quality settings.",
  },
  {
    question: "What is the difference between JPEG and WebP?",
    answer: "WebP provides superior compression (26% smaller than JPEG) with transparency support like PNG. It's now supported by 97% of browsers, making it ideal for modern web performance.",
  },
];

export const TEXT_TO_PDF_FAQS: FAQItem[] = [
  {
    question: "How to convert text to PDF without formatting issues?",
    answer: "Our text to PDF converter preserves your text formatting, including fonts, spacing, and layout. Simply paste or type your content, customize styling options, and download a perfectly formatted PDF.",
  },
  {
    question: "Can I customize fonts and styles in text to PDF conversion?",
    answer: "Yes, you can choose from multiple font options (Times New Roman, Arial, Helvetica), set font sizes, adjust line spacing, and add headers or page numbers to your PDF.",
  },
  {
    question: "Is text to PDF conversion secure for sensitive content?",
    answer: "完全安全。All text conversion happens locally in your browser. No content is ever stored or transmitted, making it perfect for confidential documents.",
  },
  {
    question: "How to create a multi-page PDF from text?",
    answer: "Our converter automatically handles pagination based on content length. You can set page size (A4/Letter), margins, and content density to control how text flows across pages.",
  },
  {
    question: "Can I convert TXT files to PDF directly?",
    answer: "Yes, you can upload .txt files or paste text content directly. Our converter processes plain text while preserving paragraph breaks and basic formatting.",
  },
];

export const QR_CODE_FAQS: FAQItem[] = [
  {
    question: "How to create a QR code that scans reliably in 2026?",
    answer: "Our QR code generator creates high-density codes optimized for modern smartphone cameras. Choose appropriate error correction levels (L, M, Q, H) based on your content size for maximum reliability.",
  },
  {
    question: "Can I customize QR code colors and branding?",
    answer: "Yes, you can customize foreground and background colors, add logos, and adjust error correction levels. Our generator ensures scannable codes even with custom branding.",
  },
  {
    question: "What data types can I encode in QR codes?",
    answer: "Support for URLs, plain text, email addresses, phone numbers, SMS, WiFi credentials, vCard contact information, and more. Perfect for marketing, payments, and authentication.",
  },
  {
    question: "Do QR codes expire or need renewal?",
    answer: "Static QR codes (text, URL) never expire. Dynamic QR codes (with our premium features) can be updated even after printing. Our free static codes work indefinitely.",
  },
  {
    question: "How to track QR code scans for marketing analytics?",
    answer: "For basic tracking, use UTM parameters in your URLs with Google Analytics. For enterprise analytics, our dynamic QR codes provide detailed scan metrics and geographic data.",
  },
];

export const PASSWORD_GENERATOR_FAQS: FAQItem[] = [
  {
    question: "What is the strongest password length for 2026 security?",
    answer: "NIST 2026 guidelines recommend 16+ character passwords as the new minimum. Longer passwords with passphrase-style generation provide exponentially better security against brute force attacks.",
  },
  {
    question: "Are generated passwords truly random?",
    answer: "Yes, our generator uses cryptographically secure random number generation (CSPRNG). Each password is unique and unpredictable, ensuring maximum security for your accounts.",
  },
  {
    question: "Should I use password managers in 2026?",
    answer: "Absolutely. Password managers are essential for 2026 security. Generate unique passwords for each account and store them securely in encrypted managers like Bitwarden or 1Password.",
  },
  {
    question: "What makes a password truly secure?",
    answer: "Strong passwords require: minimum 16 characters, mixed case, numbers, and symbols. Avoid dictionary words, personal info, and patterns. Our generator creates all of this automatically.",
  },
  {
    question: "Can I generate passwords offline for air-gapped systems?",
    answer: "Yes, our password generator works entirely in your browser with no server communication. It's safe to use for air-gapped or offline systems requiring secure credentials.",
  },
];

export const AGE_CALCULATOR_FAQS: FAQItem[] = [
  {
    question: "How accurate is the age calculator for leap years?",
    answer: "Our calculator handles leap years accurately, including 2024 and 2028. It precisely calculates days, accounting for all leap year rules in its algorithms.",
  },
  {
    question: "Can I calculate age in different time units?",
    answer: "Yes, get your age in years, months, weeks, days, hours, minutes, and even seconds. Perfect for precise age verification, legal documents, or milestone celebrations.",
  },
  {
    question: "Is age calculation private and secure?",
    answer: "完全私密。All calculations happen locally in your browser. Your date of birth is never stored or transmitted, ensuring complete privacy.",
  },
  {
    question: "How to calculate age from date of birth for official use?",
    answer: "Enter your date of birth and our calculator provides exact age for legal, government, or official documentation purposes with precise year, month, and day calculations.",
  },
  {
    question: "Can I calculate age difference between two dates?",
    answer: "Yes, calculate exact age differences or time between any two dates. Useful for comparing ages, determining eligibility, or historical date calculations.",
  },
];

export const UNIT_CONVERTER_FAQS: FAQItem[] = [
  {
    question: "What units are supported in the unit converter?",
    answer: "We support Length (km, miles, meters), Weight (kg, lbs, grams), Temperature (Celsius, Fahrenheit, Kelvin), Volume (liters, gallons), and Digital Storage (bytes, MB, GB, TB).",
  },
  {
    question: "How accurate are the unit conversions?",
    answer: "Our converter uses standard international conversion factors with high precision. Results are accurate to 10 decimal places for most conversions.",
  },
  {
    question: "Can I convert between metric and imperial units?",
    answer: "Yes, seamlessly convert between metric (SI) and imperial units. Popular conversions include km to miles, kg to pounds, Celsius to Fahrenheit, and liters to gallons.",
  },
  {
    question: "Is unit converter free for commercial use?",
    answer: "Yes, completely free for all use cases including commercial, educational, and professional applications. No registration or limitations.",
  },
];

export const GST_CALCULATOR_FAQS: FAQItem[] = [
  {
    question: "How to calculate GST inclusive and exclusive amounts?",
    answer: "For exclusive (add GST): Amount × (1 + GST Rate/100). For inclusive (remove GST): Amount / (1 + GST Rate/100). Our calculator handles both instantly.",
  },
  {
    question: "What are the current GST rates in India for 2026?",
    answer: "Current GST slabs: 0% (essential goods), 5% (life essentials), 12% (processed foods), 18% (most goods), 28% (luxury items). Check the GST Council for latest updates.",
  },
  {
    question: "How to calculate CGST, SGST, and IGST?",
    answer: "For intrastate: CGST = IGST = GST/2. For interstate: IGST = GST amount. Our calculator automatically splits these based on your transaction type.",
  },
  {
    question: "Can I calculate reverse GST from inclusive price?",
    answer: "Yes, use our reverse GST calculator to extract the tax component from inclusive prices. Perfect for businesses claiming input tax credit.",
  },
  {
    question: "Is GST calculator accurate for business invoicing?",
    answer: "Our calculator uses official GST formulas. For complex business calculations involving multiple items or input tax credit, consult a tax professional.",
  },
];

export const EMI_CALCULATOR_FAQS: FAQItem[] = [
  {
    question: "How is EMI calculated for loans in 2026?",
    answer: "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P = principal, r = monthly interest rate, n = number of months. Our calculator computes this instantly.",
  },
  {
    question: "What is the difference between fixed and reducing balance EMI?",
    answer: "Fixed interest is calculated on original principal throughout the loan. Reducing (diminishing) interest is calculated on remaining principal, making it more economical.",
  },
  {
    question: "Can I calculate EMI for home, car, and personal loans?",
    answer: "Yes, our versatile calculator handles all loan types. Just enter principal, interest rate, and tenure to get accurate monthly payment calculations.",
  },
  {
    question: "How does prepayment affect EMI and total interest?",
    answer: "Making prepayments reduces principal, lowering either your EMI or loan tenure. Use our calculator to compare scenarios and see potential interest savings.",
  },
  {
    question: "Is EMI calculation accurate for official loan decisions?",
    answer: "Our calculator provides accurate estimates. However, actual bank EMI may vary slightly due to rounding and processing fees. Verify with your lender.",
  },
];

export const SIP_CALCULATOR_FAQS: FAQItem[] = [
  {
    question: "How to calculate SIP returns accurately for 2026?",
    answer: "SIP returns use XIRR method accounting for periodic investments. Our calculator projects growth based on expected annual return rate, investment amount, and tenure.",
  },
  {
    question: "What is a good SIP return rate expectation for 2026?",
    answer: "Equity mutual funds historically return 12-15% annually. Debt funds return 6-8%. Our calculator lets you adjust rates to see conservative or optimistic projections.",
  },
  {
    question: "Can I calculate SIP with step-up (increasing monthly investment)?",
    answer: "Yes, use our advanced SIP calculator with step-up feature to see how increasing your investment annually impacts final corpus.",
  },
  {
    question: "How much should I invest in SIP for financial goals?",
    answer: "Use our calculator to reverse-engineer your SIP. Enter your target amount, expected returns, and time horizon to determine required monthly investment.",
  },
  {
    question: "Is SIP calculator results accurate for investment decisions?",
    answer: "Our calculator provides projections based on assumed returns. Past performance doesn't guarantee future results. Consult a financial advisor for investment decisions.",
  },
];
