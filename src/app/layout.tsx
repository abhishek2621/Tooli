import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// ✅ Use www version as primary canonical domain
const baseUrl = "https://www.tooli.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "Tooli - Free Online Tools & Calculators",
    template: "%s | Tooli",
  },

  description:
    "A comprehensive collection of free online calculators, converters, and productivity tools. No registration required.",

  keywords: [
    "online tools",
    "calculators",
    "converters",
    "pdf tools",
    "image tools",
    "free utilities",
    "online utilities",
  ],

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
    siteName: "Tooli",
    title: "Tooli - 100% Free Online Tools & Calculators",
    description:
      "Pro-grade online tools: PDF, Image, Finance, and Utilities. 100% Free, No Sign-up.",
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Tooli - Free Online Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tooli - Free Online Tools",
    description:
      "Access pro-grade online tools for free. No registration required.",
    images: [`${baseUrl}/opengraph-image`],
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#6366f1" />
        <link rel="manifest" href="/manifest.json" />
        {process.env.NODE_ENV === "production" ? (
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
        ) : (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (let registration of registrations) {
                      registration.unregister().then(function(success) {
                        if (success) console.log('Successfully unregistered development service worker.');
                      });
                    }
                  });
                }
              `,
            }}
          />
        )}
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Toaster position="bottom-center" richColors />
        <SpeedInsights />
        <Analytics />

        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
          />
        )}
      </body>
    </html>
  );
}
