import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      // テスト用（placekitten）
      {
        protocol: "https",
        hostname: "placekitten.com",
        pathname: "/**",
      },
      // Supabase Storage（本番）
      {
        protocol: "https",
        hostname: "gbcflvgploreclamiutu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
