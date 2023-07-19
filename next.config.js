/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://staging.adamspay.com/api/:path*',
            },
        ];
    },
}

module.exports = nextConfig
