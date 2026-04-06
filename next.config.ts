import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Notion 이미지 허용 (외부 이미지 도메인)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // 보안: X-Powered-By 헤더 제거
  poweredByHeader: false,

  // 성능: gzip 압축 활성화
  compress: true,

  // SEO: trailing slash 일관성
  trailingSlash: false,

  // 성능: 보안 헤더
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // 폰트 캐싱 (CDN 폰트 로드 성능)
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
