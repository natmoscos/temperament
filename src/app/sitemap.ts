import { MetadataRoute } from 'next';
import { getAllSlugsFromNotion } from '@/lib/notion';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://192types.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mbtiTypes = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
  const tempCodes = ['SC','SP','SM','CS','CP','CM','PS','PC','PM','MS','MC','MP'];

  // 핵심 페이지
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/quick-test`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/compatibility`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/temperaments`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/types`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 블로그 글 (Notion + 로컬 병합)
  const allSlugs = await getAllSlugsFromNotion();
  const blogPages: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 유형별 페이지
  const typePages: MetadataRoute.Sitemap = mbtiTypes.map((type) => ({
    url: `${SITE_URL}/types/${type.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 공유 랜딩 페이지 (192개)
  const sharePages: MetadataRoute.Sitemap = [];
  for (const m of mbtiTypes) {
    for (const t of tempCodes) {
      sharePages.push({
        url: `${SITE_URL}/share/${m}-${t}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      });
    }
  }

  return [...staticPages, ...blogPages, ...typePages, ...sharePages];
}
