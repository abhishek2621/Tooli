import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize package imports for smaller bundle
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'filesize', 'browser-image-compression'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  async headers() {
    return [
      // ============================================
      // STATIC ASSETS - Cache forever (immutable)
      // ============================================
      {
        source: '/_next/static/:path*',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },

      // ============================================
      // IMAGES - Cache forever
      // ============================================
      {
        source: '/:path*.(svg|jpg|jpeg|png|webp|gif|ico|avif|avifs)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },

      // ============================================
      // FONTS - Cache forever
      // ============================================
      {
        source: '/:path*.(woff|woff2|ttf|otf|eot)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },

      // ============================================
      // MANIFEST & ICONS - Cache long term
      // ============================================
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/icon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },

      // ============================================
      // OPENGRAPH IMAGE - Cache for 1 day
      // ============================================
      {
        source: '/opengraph-image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },

      // ============================================
      // TOOL PAGES - Cache for 1 hour (high traffic, changes rarely)
      // ============================================
      {
        source: '/(tools)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },

      // ============================================
      // CATEGORY PAGES - Cache for 1 hour
      // ============================================
      {
        source: '/(document|image|finance|utility|education)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },

      // ============================================
      // MARKETING PAGES - Cache with revalidation
      // ============================================
      {
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },

      // ============================================
      // API ROUTES - No caching
      // ============================================
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate, private',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },

      // ============================================
      // SECURITY HEADERS - All routes
      // ============================================
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
