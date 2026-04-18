<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 블로그 글쓰기 필독

블로그 콘텐츠(신규 작성, 리라이트, 섹션 확장) 작업 시 **반드시** 먼저 읽을 것:

- `docs/writing-style.md` — 톤·리듬·금지 표현·체크리스트
- `docs/blog-persona.md` — 박서연 페르소나 배경

기본값은 "핵심 정리체" 회귀다. 가이드 없이 쓰면 망한다.

# 커밋 전 검증

```
npm run check:posts
```

마크다운 볼드 짝, 스톡 이미지 URL, 누락 이미지, SVG 엔티티 오류를 자동 검사한다.
에러 나오면 반드시 고치고 커밋.

# 작업 디렉토리

Bash 명령은 항상 `D:\claude\temperament` 기준. CWD가 튀면 `cd /d/claude/temperament &&` 앞에 붙일 것.
