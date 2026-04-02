/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode for development
  reactStrictMode: true,

  // SWC minification (faster than Terser)
  swcMinify: true,

  // ==================== IMAGE OPTIMIZATION ====================
  images: {
    // Remote image patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],

    // Image optimization settings
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // ==================== COMPRESSION ====================
  compress: true,

  // ==================== HEADERS FOR CACHING & SECURITY ====================
  async headers() {
    return [
      {
        // Cache Next.js build assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public assets
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/:path*.(woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Security headers for all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
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

  // ==================== REWRITES ====================
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite API routes
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    };
  },

  // ==================== REDIRECTS ====================
  async redirects() {
    return [
      {
        source: '/contact-us',
        destination: '/#contact',
        permanent: false,
      },
      {
        source: '/services',
        destination: '/#services',
        permanent: false,
      },
    ];
  },

  // ==================== ENVIRONMENT VARIABLES ====================
  env: {
    // These will be available in both server and client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA4_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  },
};

module.exports = nextConfig;
