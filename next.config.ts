import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todas as imagens HTTPS
      },
    ],
    minimumCacheTTL: 60, // Cache de 60 segundos
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros do ESLint durante o build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignora erros do TypeScript durante o build
  },
};

export default nextConfig;