import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSenseScript from "@/components/AdSenseScript";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  },
  twitter: {
    card: 'summary_large_image',
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
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GoogleAnalytics />
        <AdSenseScript />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
