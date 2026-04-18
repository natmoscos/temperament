// 블로그 포스트 통합 export. 실제 데이터는 chunk-NN.ts 에 있다.
// 새 글 추가 시: 가장 최근 chunk-NN.ts 에 append, 25개 넘으면 다음 번호로.

export * from './types';
import type { BlogPost } from './types';
import { chunk01 } from './chunk-01';
import { chunk02 } from './chunk-02';
import { chunk03 } from './chunk-03';
import { chunk04 } from './chunk-04';
import { chunk05 } from './chunk-05';
import { chunk06 } from './chunk-06';

export const blogPosts: BlogPost[] = [...chunk01, ...chunk02, ...chunk03, ...chunk04, ...chunk05, ...chunk06];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map(p => p.slug);
}
