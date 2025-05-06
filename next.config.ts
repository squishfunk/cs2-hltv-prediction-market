import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Allow any HTTPS image source for flexibility with mock data if needed
      // In a real app, restrict this to known CDNs/image sources
      {
        protocol: 'https',
        hostname: '**', 
      }
    ],
  },
};

export default nextConfig;
