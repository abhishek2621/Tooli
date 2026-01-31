
// In a real app, importing icons here might bloat the bundle if not careful, 
// but for config it's fine or use string names.
// For now we will just define the shape.

export type ToolCategory = "finance" | "document" | "image" | "utility" | "education";

export interface Tool {
    name: string;
    slug: string; // e.g., "gst-calculator"
    category: ToolCategory;
    description: string;
    path: string;
    icon: string; // Store as string to avoid serialization issues
}

export const tools: Tool[] = [
    // Image (Ordered 1st)
    {
        name: "Image Compressor",
        slug: "image-compressor",
        category: "image",
        description: "Compress images without losing quality.",
        path: "/image/image-compressor",
        icon: "image",
    },
    {
        name: "Image to PDF",
        slug: "image-to-pdf",
        category: "image",
        description: "Convert images (JPG, PNG) to PDF format.",
        path: "/image/image-to-pdf",
        icon: "file-image",
    },
    {
        name: "Image Converter",
        slug: "image-converter",
        category: "image",
        description: "Convert images between formats (JPG, PNG, WEBP).",
        path: "/image/image-converter",
        icon: "refresh-cw",
    },

    // Document (Ordered 2nd)
    {
        name: "Text to PDF",
        slug: "text-to-pdf",
        category: "document",
        description: "Convert plain text to PDF files.",
        path: "/document/text-to-pdf",
        icon: "file-text",
    },
    {
        name: "PDF Compressor",
        slug: "pdf-compressor",
        category: "document",
        description: "Reduce PDF file size without losing quality.",
        path: "/document/pdf-compressor",
        icon: "minimize-2",
    },
    {
        name: "PDF Merger",
        slug: "pdf-merger",
        category: "document",
        description: "Combine multiple PDF files into one.",
        path: "/document/pdf-merger",
        icon: "merge",
    },
    {
        name: "Word Counter",
        slug: "word-counter",
        category: "document",
        description: "Count words, characters, and sentences in your text.",
        path: "/document/word-counter",
        icon: "type",
    },

    // Finance (Ordered 3rd)
    {
        name: "GST Calculator",
        slug: "gst-calculator",
        category: "finance",
        description: "Calculate GST inclusive and exclusive amounts easily.",
        path: "/finance/gst-calculator",
        icon: "percent",
    },
    {
        name: "EMI Calculator",
        slug: "emi-calculator",
        category: "finance",
        description: "Calculate your monthly EMI for loans.",
        path: "/finance/emi-calculator",
        icon: "calculator",
    },
    {
        name: "SIP Calculator",
        slug: "sip-calculator",
        category: "finance",
        description: "Calculate returns on your monthly SIP investments.",
        path: "/finance/sip-calculator",
        icon: "trending-up",
    },
    {
        name: "Currency Converter",
        slug: "currency-converter",
        category: "finance",
        description: "Convert currencies between different countries.",
        path: "/finance/currency-converter",
        icon: "refresh-ccw",
    },

    // Utility (Ordered 4th - counting 5th in user list but 4th unique)
    {
        name: "Unit Converter",
        slug: "unit-converter",
        category: "utility",
        description: "Convert between different units of measurement.",
        path: "/utility/unit-converter",
        icon: "scale",
    },
    {
        name: "QR Code Generator",
        slug: "qr-generator",
        category: "utility",
        description: "Generate QR codes for URLs, text, and more.",
        path: "/utility/qr-code-generator",
        icon: "qr-code",
    },
    {
        name: "Password Generator",
        slug: "password-generator",
        category: "utility",
        description: "Generate strong, secure random passwords.",
        path: "/utility/password-generator",
        icon: "lock",
    },
    {
        name: "Age Calculator",
        slug: "age-calculator",
        category: "utility",
        description: "Calculate your exact age in years, months, and days.",
        path: "/utility/age-calculator",
        icon: "calendar",
    },
    {
        name: "Time Zone Converter",
        slug: "timezone-converter",
        category: "utility",
        description: "Convert time between different time zones.",
        path: "/utility/timezone-converter",
        icon: "globe",
    },

    // Education (Ordered 5th - User said 6th but finance repeated)
    {
        name: "GPA Calculator",
        slug: "gpa-calculator",
        category: "education",
        description: "Calculate your Grade Point Average.",
        path: "/education/gpa-calculator",
        icon: "graduation-cap",
    },
];

export const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
        acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
}, {} as Record<ToolCategory, Tool[]>);
