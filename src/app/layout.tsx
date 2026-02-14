import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-sans',
});

// Define the base URL for the application
const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "https://www.tooli.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Tooli - Free Online Tools & Calculators (Ad-Free)",
    template: "%s | Tooli",
  },
  description: "A comprehensive collection of free, ad-free online calculators, converters, and productivity tools. No registration required.",
  keywords: ["online tools", "calculators", "converters", "productivity", "free utilities", "developer tools", "ad-free online tools"],
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
    title: "Tooli - 100% Free Online Tools & Calculators (Ad-Free)",
    description: "Pro-grade online tools: PDF, Image, Finance, and Utilities. 100% Free, No Ads, No Sign-up.",
    siteName: "Tooli",
    images: [
      {
        url: `/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Tooli - Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tooli - Free Online Tools (No Ads)",
    description: "Access pro-grade online tools for free. No ads, no registration.",
    images: [`/opengraph-image`],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tooli",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
    </html>
  );
}
