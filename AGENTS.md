<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 블로그 글쓰기 필독

블로그 콘텐츠(신규 작성, 리라이트, 섹션 확장) 작업 시 **반드시** 먼저 읽을 것:

- **`docs/writing-style-v2.md` — 메인 가이드** (구조·다양성·SEO·학술 인용·Hook 6패턴·CTA 8변형·FAQ 필수)
- `docs/writing-style.md` — v1 보조 (톤·리듬·금지 표현·문장 규칙)
- `docs/blog-persona.md` — 박서연 페르소나 배경 (v2에서 사용 빈도 제한)

**v2 우선 적용 (2026-04-25부터). v1은 톤·문장 규칙만 폴백 참조.**

v2가 해결하려는 핵심 문제: 모든 글이 "5섹션 고정 + 기질 4종 비교 마무리 + 같은 도입 패턴"으로 비슷해 보임. v2는 Hook 6패턴·섹션 구조 매트릭스·분석 깊이 4단계·FAQ 섹션·CTA 8변형으로 다양성 확보.

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
