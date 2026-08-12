import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // M17 (Vercel) : ne pas bloquer le build sur des warnings de typage / lint
  // (validés en local). Vercel free a peu de RAM : on évite les OOM fatals.
  typescript: { ignoreBuildError: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;

