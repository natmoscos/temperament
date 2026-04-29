<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 블로그 글쓰기 필독

블로그 콘텐츠(신규 작성, 리라이트, 섹션 확장) 작업 시 **반드시** 먼저 읽을 것:

- **`docs/writing-style.md` — 메인 가이드** (446줄, 톤·구조·SEO·학술·Hook 6패턴·CTA 8변형·FAQ 필수·마크다운 표 금지)
- `docs/blog-persona.md` — 박서연 페르소나 배경 (사용 빈도 제한)

핵심 규칙:
- 핵심 정리체 금지 (~입니다/~합니다 X)
- Information Gain 2개 이상 필수 (1차 자료·학술·비교 등)
- Hook 6패턴 다양화 (같은 패턴 두 글 연속 ❌)
- 분석 깊이 3단계 이상 (학술 인용 1회+)
- FAQ 섹션 1개 필수
- **마크다운 표 사용 금지** (렌더러 미지원 — bullet list로 대체)
- **TL;DR 박스 사용 금지** (한국 톤 어색·체류시간 ↓)

기본값은 "핵심 정리체" 회귀다. 가이드 없이 쓰면 망한다.

# 커밋 전 검증

`.husky/pre-commit` 훅이 `npm run check:posts` 를 자동 실행한다. 에러 나오면 커밋 차단.

수동 실행:
```
npm run check:posts       # 마크다운 볼드 짝, 스톡 이미지, 누락 이미지, SVG 엔티티
node scripts/score-posts.mjs --top 20   # 리라이트 시급한 포스트 랭킹
```

`score-posts.mjs` 는 docs/writing-style.md 의 금지 패턴 기준으로 "핵심 정리 지수"를 계산한다. 점수 20+ 는 긴급 리라이트, 0 이하는 톤 OK.

# 작업 디렉토리

Bash 명령은 항상 `D:\claude\temperament` 기준. CWD가 튀면 `cd /d/claude/temperament &&` 앞에 붙일 것.
