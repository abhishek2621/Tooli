
// In a real app, importing icons here might bloat the bundle if not careful, 
// but for config it's fine or use string names.
// For now we will just define the shape.

export type ToolCategory = "finance" | "document" | "image" | "utility";

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
        name: "Compress Image Online (No Quality Loss)",
        slug: "image-compressor",
        category: "image",
        description: "Lossless image compression for JPG, PNG and WEBP files.",
        path: "/image/image-compressor",
        icon: "image",
    },
    {
        name: "Convert Image to PDF Online Free",
        slug: "image-to-pdf",
        category: "image",
        description: "Convert JPG and PNG photos into professional PDF documents.",
        path: "/image/image-to-pdf",
        icon: "file-image",
    },
    {
        name: "Free Image Format Converter",
        slug: "image-converter",
        category: "image",
        description: "Fast conversion between JPG, PNG, WEBP and more.",
        path: "/image/image-converter",
        icon: "refresh-cw",
    },

    // Document (Ordered 2nd)
    {
        name: "Convert Text to PDF Online",
        slug: "text-to-pdf",
        category: "document",
        description: "Convert plain text or notes into clean, portable PDF files.",
        path: "/document/text-to-pdf",
        icon: "file-text",
    },
    {
        name: "Reduce PDF File Size Online",
        slug: "pdf-compressor",
        category: "document",
        description: "Compress PDF files for email while maintaining clarity.",
        path: "/document/pdf-compressor",
        icon: "minimize-2",
    },
    {
        name: "Merge PDF Files Online Free",
        slug: "pdf-merger",
        category: "document",
        description: "Combine multiple PDF documents into a single file securely.",
        path: "/document/pdf-merger",
        icon: "merge",
    },

    // Finance (Ordered 3rd)
    {
        name: "GST Calculator Online India",
        slug: "gst-calculator",
        category: "finance",
        description: "Fast GST calculations with current Indian tax rates (5%-28%).",
        path: "/finance/gst-calculator",
        icon: "percent",
    },
    {
        name: "Home & Personal Loan EMI Calculator",
        slug: "emi-calculator",
        category: "finance",
        description: "Calculate monthly EMI for home, car, or personal loans.",
        path: "/finance/emi-calculator",
        icon: "calculator",
    },
    {
        name: "SIP Investment Return Calculator",
        slug: "sip-calculator",
        category: "finance",
        description: "Estimate maturity amounts for monthly SIP investments.",
        path: "/finance/sip-calculator",
        icon: "trending-up",
    },

    // Utility (Ordered 4th)
    {
        name: "Universal Unit Converter Online",
        slug: "unit-converter",
        category: "utility",
        description: "Convert length, weight, and volume between metric & imperial.",
        path: "/utility/unit-converter",
        icon: "scale",
    },
    {
        name: "Free QR Code Generator",
        slug: "qr-generator",
        category: "utility",
        description: "Create custom QR codes for URLs, WiFi, or text instantly.",
        path: "/utility/qr-code-generator",
        icon: "qr-code",
    },
    {
        name: "Secure Password Generator",
        slug: "password-generator",
        category: "utility",
        description: "Generate strong, secure passwords for your online safety.",
        path: "/utility/password-generator",
        icon: "lock",
    },
    {
        name: "Exact Age Calculator Online",
        slug: "age-calculator",
        category: "utility",
        description: "Find your exact age in years, months, and days since birth.",
        path: "/utility/age-calculator",
        icon: "calendar",
    },
];

export const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
        acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
}, {} as Record<ToolCategory, Tool[]>);
