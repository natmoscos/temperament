# 세션 인계 문서 — 2026-04-17

다음 세션에서 이 문서 하나만 읽으면 바로 이어갈 수 있도록 작성.

---

## 프로젝트 현황 (스냅샷)

- **사이트**: 192types.com (MBTI × 히포크라테스 4기질 × 3강도 = 192유형)
- **스택**: Next.js 14 App Router (커스텀 포크 — `node_modules/next/dist/docs/` 참조 필수), TypeScript, Tailwind v4
- **블로그 포스트**: 177개
- **제휴 시스템**: 쿠팡파트너스 3% / 올리브영 7% / 토스쇼핑 쉐어링크 10% — 전부 활성

## 최근 커밋 (최신 → 과거)

1. `c419a12` fix(blog): add markdown bold parser to renderContentWithLinks
   - `**text**` 리터럴 노출 버그 수정
   - `src/app/blog/[slug]/page.tsx` 에 `renderBoldInText()` 추가
2. `1bdf4d6` 훅(hook) 섹션 9개 글 스토리텔링 리라이트
3. `5e6a0ab` 9개 신규 글 배포 (batch5 5개 + trend4 4개)

## 미완료 작업 (다음 세션 우선순위)

### 🔴 높음
1. **신규 9개 글 중간/결론 섹션 리라이트** — 훅만 고쳤음, 본문은 아직 "핵심 정리" 톤
   - batch5: drinking / driving / crush / 고윤정 / 손빈아
   - trend4: mbti 무료 +150% 검색어 기반 4개
2. **기존 글 전체 리라이트** — 사용자가 "이전 글들도 수정해달라" 요청함. 168개 기존 글 중 핵심만 정리된 것들 선별 필요
3. **워크플로우 효율화 논의** — 사용자가 컨텍스트 최적화 전 마지막으로 물어본 주제

### 🟡 중간
- markdown bold 파서 프로덕션 배포 확인
- 연예인 사진 저작권 리스크 (AdSense 심사 중 — 심사 완료 전 건드리지 말 것)

## 핵심 아키텍처 결정

### 제휴 3-tier fallback
```
affiliateSection (글별 수동 지정)
  ↓ 없으면
POST_SPECIFIC_SECTIONS[slug] (`src/data/affiliate-category-defaults.ts`)
  ↓ 없으면
CATEGORY_DEFAULT_SECTIONS[category] (현재 전부 null)
```

### 인라인 제품 카드 (mid-article)
- **왜**: 글 끝 노출은 클릭 전환율 낮음 → 스크롤 흐름 중간 삽입
- **구현**: `BlogPost.sections[].inlineProducts?: AffiliateProduct[]`
- **렌더**: `InlineProductCard.tsx` — 가로 레이아웃(모바일 세로 스택), 플랫폼 브랜드 컬러 CTA
- **고지**: 카드 한 장당 검정색 고지 1개 (법적 안전 + 가독성)

### 페르소나
- **박서연** (ENFP 24세, 라이프스타일 크리에이터) — 메인 저자, Article JSON-LD
- **민지** (부차) — 댓글/상호작용용
- **이준형** (ISTJ 41세, 증권사 차장) — 제품 추천 전용 페르소나

파일: `src/data/affiliate-personas.ts` (LEE_JUNHYUNG, PARK_SEOYEON, PLATFORMS, buildDisclosureText)

## 제휴 링크 (활성)

| 제품 | 플랫폼 | URL |
|------|--------|-----|
| 스탠리 퀜처 텀블러 | 쿠팡 | https://link.coupang.com/a/eq4d2F |
| 이름 각인 실버 목걸이 | 쿠팡 | https://link.coupang.com/a/eq4eVu |
| 양키캔들 | 쿠팡 | https://link.coupang.com/a/eq4fK8 |
| 아뜰리에페이 퍼퓸 | 올리브영 | https://oy.run/jWQ1FZvnMNvzH0 |
| 록시땅 핸드크림 | 올리브영 | https://oy.run/sk7FaLoOdU92i6 |

제품 이미지: `public/blog/products/*.webp` (handcream / tumbler / necklace / candle / perfume)

## GEO (Generative Engine Optimization) 활성 항목

- `llms.txt` / `robots.txt` AI 크롤러 허용
- Schema.org: Article(Person author), FAQPage, Product(제휴 카드)
- TL;DR 자동 생성 (description + 첫/마지막 섹션에서 추출)

## 주의사항 (학습된 것)

- **CWD 문제**: bash 명령 앞에 `cd /d/claude/temperament &&` 붙이기 (루트가 /d/claude 로 튐)
- **SVG 이스케이프**: `&` → `&amp;`, `<` → `&lt;` (M&A, < 기호 있을 때)
- **한국 정서**: Unsplash 스톡 사진 ❌ — 커스텀 SVG + Sharp WebP 사용
- **여자친구 선물 != 공부법**: 기능성 제품 중복 피하고 감성+유틸 균형
- **Next.js 포크**: 학습 데이터와 다를 수 있음 → `node_modules/next/dist/docs/` 먼저 확인

## 주요 파일 경로

```
src/
├── app/blog/[slug]/page.tsx       # 본문 렌더 + renderBoldInText + InlineProductCard 연동
├── components/
│   ├── InlineProductCard.tsx      # 중간 삽입 카드
│   └── AffiliateSection.tsx       # 글 끝 PICK 블록
├── data/
│   ├── blog-posts.ts              # 177개 포스트 (~5000줄, 거대)
│   ├── affiliate-personas.ts      # 이준형/박서연/PLATFORMS
│   └── affiliate-category-defaults.ts  # 3-tier fallback 맵
public/blog/products/*.webp        # 제품 이미지 5개
scripts/generate-*.mjs             # SVG→WebP 변환 스크립트들
```

## 다음 세션 시작 시 할 일

1. 이 문서 읽기
2. `git log --oneline -10` 으로 최신 상태 확인
3. 사용자에게 **워크플로우 효율화** 논의부터 시작 — 컨텍스트 최적화 직전에 물어본 주제
4. 그 후 미완료 작업 우선순위대로 진행
