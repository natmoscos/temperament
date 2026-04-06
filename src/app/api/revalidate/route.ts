import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

/**
 * 블로그 콘텐츠 갱신 API
 * Notion에서 글을 작성/수정 후 이 엔드포인트를 호출하면 즉시 반영
 *
 * 사용법:
 * POST /api/revalidate
 * Headers: { "x-revalidation-secret": "YOUR_SECRET" }
 * Body: { "slug": "optional-specific-slug" }
 *
 * 또는 전체 블로그 갱신:
 * POST /api/revalidate (slug 없이)
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const slug = body?.slug as string | undefined;

    // 블로그 목록 갱신
    revalidatePath('/blog');

    // 특정 글 갱신
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    // 사이트맵 갱신
    revalidatePath('/sitemap.xml');

    return Response.json({
      revalidated: true,
      slug: slug ?? 'all',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      { error: 'Revalidation failed', details: String(error) },
      { status: 500 }
    );
  }
}
