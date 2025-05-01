import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todas as imagens HTTPS
      },
    ],
    minimumCacheTTL: 60,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuração para redirecionamentos de autenticação
  async rewrites() {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
      },
      {
        source: '/api/auth/callback',
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`,
      }
    ];
  },
  
  env: {
    NEXT_PUBLIC_FORCE_REDIRECT_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'https://zeuslightning.vercel.app'
  }
};

export default nextConfig;