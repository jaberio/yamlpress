/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    // Enable static export for fully static site
    output: 'export',
    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },
    // Trailing slash for better static hosting compatibility
    trailingSlash: true,
}

module.exports = nextConfig
