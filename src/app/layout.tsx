import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSenseScript from "@/components/AdSenseScript";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '192 성격 유형 검사 | 16가지 성격 × 4가지 기질',
    template: '%s | 192 성격 유형 검사',
  },
  description: '16가지 성격 유형과 히포크라테스 기질론을 결합한 192가지 성격 유형 검사. 100문항으로 당신의 진짜 성격을 발견하세요.',
  keywords: ['성격 유형', '성격 유형 검사', '16가지 성격 유형', '기질론', '192 성격 유형', '히포크라테스', '성격 궁합'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '192 성격 유형 검사',
    title: '192 성격 유형 검사 | 16가지 성격 × 4가지 기질',
    description: '16가지 성격 유형과 히포크라테스 기질론을 결합한 192가지 성격 유형 검사. 100문항으로 당신의 진짜 성격을 발견하세요.',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: '192 성격 유형 검사' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ry36Wa0KGdON4bM2LL6vTmxw8P9oHj6PaIfWUwJy5VE',
    other: {
      'naver-site-verification': ['d3b022cd877c1137c525fd4e70262e6faa322e4b'],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ── 사이트 전역 Organization + WebSite JSON-LD ──
  // GEO 관점에서 AI가 "192types"라는 엔터티를 지식 그래프에 등록하도록 함.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: '192 성격 유형 검사',
    alternateName: ['192types', '192types.com', '192가지 성격 유형 검사'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    description:
      'MBTI 16유형과 히포크라테스 4기질론을 결합한 192가지 성격 유형 검사. 100문항 정밀 검사와 빠른 검사를 무료로 제공합니다.',
    knowsAbout: [
      'MBTI',
      '히포크라테스 기질론',
      '성격 유형 검사',
      '인지기능',
      'Jungian cognitive functions',
      '다혈질',
      '담즙질',
      '점액질',
      '우울질',
      '성격 궁합',
      '성격 유형별 커리어',
    ],
    inLanguage: 'ko-KR',
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: '192 성격 유형 검사',
    url: SITE_URL,
    description:
      '16가지 성격 유형 × 4가지 히포크라테스 기질 × 3단계 강도 = 192가지 성격 유형 검사',
    inLanguage: 'ko-KR',
    publisher: { '@id': `${SITE_URL}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <GoogleAnalytics />
        <AdSenseScript />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
