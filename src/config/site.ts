export const siteConfig = {
  name: "Tooli",
  description: "Your all-in-one free online utility belt. Calculators, converters, PDF tools, and image optimizers. No ads, no signup, privacy-first.",
  url: process.env.NEXT_PUBLIC_APP_URL ? `https://${process.env.NEXT_PUBLIC_APP_URL}` : "https://www.tooli.in",
  ogImage: "https://www.tooli.in/opengraph-image",
  links: {
    twitter: "https://twitter.com/tooli",
    github: "https://github.com/tooli",
  },
  creator: "Tooli Team",
  keywords: [
    // Brand
    "Tooli", "Tooli Tools", "Free Online Tools",

    // Finance - High Volume
    "GST Calculator", "GST India Calculator", "EMI Calculator", "Home Loan EMI Calculator", "SIP Calculator", "Mutual Fund Returns",
    "Currency Converter", "Live Exchange Rates", "USD to INR", "EUR to USD",

    // Documents - High Volume
    "PDF Compressor", "Compress PDF Online", "Reduce PDF Size",
    "Merge PDF", "Combine PDF Files", "PDF Joiner",
    "Text to PDF", "Convert TXT to PDF",
    "Word Counter", "Character Counter", "Sentence Counter",

    // Images - High Volume
    "Image Compressor", "Compress JPEG", "Compress PNG", "Optimize Images for Web",
    "Image to PDF", "JPG to PDF", "PNG to PDF",
    "Image Converter", "WebP to JPG", "PNG to JPG",

    // Utilities - Long Tail
    "Password Generator", "Secure Password Creator", "Random String Generator",
    "QR Code Generator", "Free QR Creator",
    "Age Calculator", "Date Difference Calculator", "Time Zone Converter", "World Clock Converter",
    "Unit Converter", "Length Converter", "Weight Converter",

    // Education
    "GPA Calculator", "College GPA Calculator",

    // General Attributes
    "Privacy Focused Tools", "No Login Tools", "Fast Online Tools", "Mobile Friendly Tools", "PWA Tools"
  ],
}
