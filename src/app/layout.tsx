import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

// Define the base URL for the application
const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tooli - Free Online Tools & Calculators",
    template: "%s | Tooli",
  },
  description: "A comprehensive collection of free online calculators, converters, and productivity tools. No registration required.",
  keywords: ["online tools", "calculators", "converters", "productivity", "free utilities", "developer tools"],
  authors: [{ name: "Tooli Team" }],
  creator: "Tooli",
  publisher: "Tooli",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Tooli - Free Online Tools & Calculators",
    description: "Simply your daily tasks with our collection of free online tools.",
    siteName: "Tooli",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tooli - Free Online Tools",
    description: "Your go-to place for free online utilities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
