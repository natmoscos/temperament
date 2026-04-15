import { BlogPost, blogPosts as localPosts, getBlogPost as getLocalPost } from '@/data/blog-posts';

// ═══ Notion REST API 직접 호출 (SDK 버전 의존성 제거) ═══
const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const API_KEY = process.env.NOTION_API_KEY ?? '';
const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function notionFetch(path: string, body?: Record<string, unknown>): Promise<any> {
  const res = await fetch(`${NOTION_API}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Notion API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// ═══ 타입 헬퍼 ═══
type RichTextItem = { plain_text: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotionBlock = { type: string; [key: string]: any };

function extractPlainText(richText: RichTextItem[]): string {
  return richText?.map((rt) => rt.plain_text).join('') ?? '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getProperty(page: any, name: string): any {
  return page.properties?.[name];
}

// ═══ Notion 블록 → 섹션 변환 ═══
function parseBlocksToSections(blocks: NotionBlock[]): BlogPost['sections'] {
  const sections: BlogPost['sections'] = [];
  let currentHeading = '';
  let contentParts: string[] = [];
  let currentImage: string | undefined;

  function flush() {
    if (currentHeading || contentParts.length > 0) {
      sections.push({
        heading: currentHeading || '소개',
        content: contentParts.join('\n\n'),
        ...(currentImage ? { image: currentImage } : {}),
      });
    }
    currentHeading = '';
    contentParts = [];
    currentImage = undefined;
  }

  for (const block of blocks) {
    switch (block.type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        flush();
        currentHeading = extractPlainText(block[block.type].rich_text);
        break;

      case 'paragraph': {
        const text = extractPlainText(block.paragraph.rich_text);
        if (text) contentParts.push(text);
        break;
      }

      case 'bulleted_list_item':
        contentParts.push('\u2022 ' + extractPlainText(block.bulleted_list_item.rich_text));
        break;

      case 'numbered_list_item':
        contentParts.push('- ' + extractPlainText(block.numbered_list_item.rich_text));
        break;

      case 'quote':
        contentParts.push(extractPlainText(block.quote.rich_text));
        break;

      case 'callout':
        contentParts.push(extractPlainText(block.callout.rich_text));
        break;

      case 'image': {
        const url =
          block.image.type === 'file'
            ? block.image.file.url
            : block.image.external?.url;
        if (url && !currentImage) currentImage = url;
        break;
      }

      default:
        break;
    }
  }

  flush();
  return sections;
}

// ═══ Notion 페이지 → BlogPost 메타데이터 변환 ═══
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToMetadata(page: any): Omit<BlogPost, 'sections'> & { pageId: string } {
  const titleProp = getProperty(page, 'Title') ?? getProperty(page, '제목');
  const title = extractPlainText(titleProp?.title ?? []);

  const slug = extractPlainText(getProperty(page, 'Slug')?.rich_text ?? []);

  const descProp = getProperty(page, 'Description') ?? getProperty(page, '설명');
  const description = extractPlainText(descProp?.rich_text ?? []);

  const kwProp = getProperty(page, 'Keywords') ?? getProperty(page, '키워드');
  const keywordsRaw = extractPlainText(kwProp?.rich_text ?? []);
  const keywords = keywordsRaw.split(',').map((k: string) => k.trim()).filter(Boolean);

  const catProp = getProperty(page, 'Category') ?? getProperty(page, '카테고리');
  const category = (catProp?.select?.name ?? 'mbti') as BlogPost['category'];

  const dateProp = getProperty(page, 'PublishDate') ?? getProperty(page, '발행일');
  const publishDate = dateProp?.date?.start ?? new Date().toISOString().split('T')[0];

  const thumbProp = getProperty(page, 'Thumbnail') ?? getProperty(page, '썸네일');
  const thumbnail = thumbProp?.url || undefined;

  const relatedRaw = extractPlainText(getProperty(page, 'RelatedTypes')?.rich_text ?? []);
  const relatedTypes = relatedRaw ? relatedRaw.split(',').map((s: string) => s.trim()).filter(Boolean) : undefined;

  return { pageId: page.id, slug, title, description, keywords, category, publishDate, thumbnail, relatedTypes };
}

// ═══ Notion에서 페이지 블록 가져오기 (페이지네이션) ═══
async function fetchAllBlocks(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const url = `/blocks/${pageId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`;
    const data = await notionFetch(url);
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return blocks;
}

// ═══ 공개 API ═══

/**
 * 모든 블로그 글 가져오기 (Notion + 로컬 TS 병합)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!API_KEY || !DATABASE_ID) {
    return [...localPosts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  }

  try {
    const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
      filter: {
        property: 'Status', select: { equals: 'published' },
      },
      sorts: [{ property: 'PublishDate', direction: 'descending' }],
    });

    const notionPosts: BlogPost[] = [];

    for (const page of response.results) {
      try {
        const { pageId, ...meta } = pageToMetadata(page);
        if (!meta.slug) continue;

        const blocks = await fetchAllBlocks(pageId);
        const sections = parseBlocksToSections(blocks);

        notionPosts.push({ ...meta, sections });
      } catch {
        continue;
      }
    }

    // 병합: Notion 글 우선
    const notionSlugs = new Set(notionPosts.map((p) => p.slug));
    const localOnly = localPosts.filter((p) => !notionSlugs.has(p.slug));
    const merged = [...notionPosts, ...localOnly];

    return merged.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  } catch (error) {
    console.error('Notion API error, falling back to local data:', error);
    return [...localPosts].sort((a, b) => b.publishDate.localeCompare(a.publishDate));
  }
}

/**
 * slug로 블로그 글 1개 가져오기
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!API_KEY || !DATABASE_ID) {
    return getLocalPost(slug);
  }

  try {
    const response = await notionFetch(`/databases/${DATABASE_ID}/query`, {
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: 'published' } },
        ],
      },
      page_size: 1,
    });

    if (response.results.length > 0) {
      const { pageId, ...meta } = pageToMetadata(response.results[0]);
      const blocks = await fetchAllBlocks(pageId);
      const sections = parseBlocksToSections(blocks);
      return { ...meta, sections };
    }
  } catch (error) {
    console.error('Notion query error for slug:', slug, error);
  }

  return getLocalPost(slug);
}

/**
 * 모든 slug 목록 (빌드 + 사이트맵용)
 */
export async function getAllSlugsFromNotion(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return posts.map((p) => p.slug);
}
