/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate'
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate'
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store, no-cache, max-age=0, must-revalidate'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
