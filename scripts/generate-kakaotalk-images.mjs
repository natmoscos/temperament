// Generate infographics for "MBTI 카톡 스타일 — 답장 속도 + 이모티콘 + 대화 패턴"
// Output: public/blog/kakao-{name}.{svg,webp}
//
// Image set (6):
//   01 hero             - 카톡 말풍선 브랜드 히어로
//   02 reply-speed      - 16유형 답장 속도 랭킹
//   03 emoji-usage      - 이모티콘 사용 패턴 매트릭스
//   04 message-pattern  - 4기질별 대화 패턴
//   05 ghost-risk       - 읽씹·잠수 위험도 4분면
//   06 ritual           - 기질별 카톡 대응 가이드

import fs from 'node:fs';
import sharp from 'sharp';

const OUT_DIR = 'D:/claude/temperament/public/blog';

const C = {
  bg: '#fafafa',
  card: '#ffffff',
  text: '#171717',
  textSoft: '#374151',
  textMuted: '#6b7280',
  textFaint: '#9ca3af',
  border: '#e5e7eb',
  divider: '#d1d5db',
  kakao: '#fee500', kakaoDeep: '#ffc107', kakaoBrown: '#3c1e1e',
  nt600: '#0891b2', nt500: '#06b6d4', nt50: '#ecfeff', nt700: '#0e7490',
  nf600: '#e11d48', nf500: '#f43f5e', nf50: '#fff1f2', nf700: '#be123c',
  sj600: '#059669', sj500: '#10b981', sj50: '#ecfdf5', sj700: '#047857',
  sp600: '#d97706', sp500: '#f59e0b', sp50: '#fffbeb', sp700: '#b45309',
  safe: '#16a34a', mid: '#84cc16', warn: '#f59e0b', danger: '#dc2626',
};

const FONT = `'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, sans-serif`;

const wrap = (inner) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" font-family="${FONT}">
<rect width="1200" height="900" fill="${C.bg}"/>
${inner}
<text x="1180" y="892" text-anchor="end" font-size="10" font-weight="500" fill="${C.textFaint}" opacity="0.85">192types.co.kr · 카톡 스타일 리포트</text>
</svg>`;

const COLOR_OF = { NT: C.nt600, NF: C.nf600, SJ: C.sj600, SP: C.sp600 };
const GROUP_OF = {
  INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
  INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
  ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
  ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP',
};

// ---------- 01 HERO ----------
function hero() {
  return wrap(`
  <defs>
    <linearGradient id="hBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff9e6"/>
      <stop offset="100%" stop-color="#fffdf5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#hBg)"/>

  <!-- Speech bubbles scattered background -->
  <g opacity="0.35">
    <rect x="120" y="160" width="260" height="62" rx="28" fill="${C.kakao}" stroke="${C.kakaoDeep}" stroke-width="2"/>
    <text x="250" y="200" text-anchor="middle" font-size="22" font-weight="700" fill="${C.kakaoBrown}">지금 뭐해? 😊</text>

    <rect x="820" y="230" width="240" height="62" rx="28" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
    <text x="940" y="270" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textSoft}">.........</text>

    <rect x="150" y="700" width="220" height="62" rx="28" fill="#ffffff" stroke="${C.border}" stroke-width="2"/>
    <text x="260" y="740" text-anchor="middle" font-size="22" font-weight="700" fill="${C.textSoft}">ㅇㅋ</text>

    <rect x="820" y="660" width="280" height="62" rx="28" fill="${C.kakao}" stroke="${C.kakaoDeep}" stroke-width="2"/>
    <text x="960" y="700" text-anchor="middle" font-size="22" font-weight="700" fill="${C.kakaoBrown}">ㅋㅋㅋㅋㅋㅋ 🤣</text>
  </g>

  <!-- Center brand card -->
  <rect x="120" y="270" width="960" height="400" rx="36" fill="#ffffff" stroke="${C.kakaoDeep}" stroke-width="4"/>
  <text x="600" y="345" text-anchor="middle" font-size="30" font-weight="800" fill="${C.kakaoDeep}">192TYPES · KAKAO REPORT 2026</text>
  <text x="600" y="450" text-anchor="middle" font-size="78" font-weight="900" fill="${C.text}">MBTI 카톡 스타일</text>
  <text x="600" y="525" text-anchor="middle" font-size="42" font-weight="700" fill="${C.textSoft}">답장 속도 · 이모티콘 · 대화 패턴</text>
  <text x="600" y="620" text-anchor="middle" font-size="24" font-weight="600" fill="${C.textMuted}">즉답형 · 생각형 · 잠수형 · 답정너형 4가지 카톡 DNA</text>
  `);
}

// ---------- 02 REPLY SPEED RANKING ----------
function replySpeed() {
  const data = [
    { type: 'ESFJ', score: 96, avg: '평균 30초', note: '보이자마자 답장' },
    { type: 'ENFJ', score: 92, avg: '평균 1분', note: '상대 감정 먼저 체크' },
    { type: 'ESTJ', score: 88, avg: '평균 2분', note: '업무적 답장 빠름' },
    { type: 'ESFP', score: 84, avg: '평균 3분', note: '기분 좋으면 즉시' },
    { type: 'ENFP', score: 78, avg: '평균 5분', note: '하고 싶은 말 많음' },
    { type: 'ENTJ', score: 74, avg: '평균 8분', note: '필요한 답만 빠르게' },
    { type: 'ESTP', score: 68, avg: '평균 15분', note: '관심 갈 때만' },
    { type: 'ENTP', score: 62, avg: '평균 25분', note: '흥미 따라 급변' },
    { type: 'ISFJ', score: 58, avg: '평균 45분', note: '생각 정리 후 답장' },
    { type: 'ISTJ', score: 52, avg: '평균 1시간', note: '일 끝나면 답장' },
    { type: 'ISFP', score: 46, avg: '평균 2시간', note: '기분 따라 오락가락' },
    { type: 'INFJ', score: 40, avg: '평균 3시간', note: '답장 완벽주의' },
    { type: 'ISTP', score: 32, avg: '평균 반나절', note: '답장 필요성 고민' },
    { type: 'INTJ', score: 26, avg: '평균 하루', note: '본인 일정 우선' },
    { type: 'INTP', score: 20, avg: '평균 1~2일', note: '답장 존재 잊음' },
    { type: 'INFP', score: 12, avg: '평균 3일+', note: '에너지 있을 때만' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">MBTI 답장 속도 랭킹 TOP 16</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">친구끼리 평소 카톡 답장 평균 속도 기준 · 100점 만점</text>

  ${data.map((d, i) => {
    const y = 120 + i * 47;
    const barW = d.score * 7.5;
    const grp = GROUP_OF[d.type];
    const color = COLOR_OF[grp];
    return `
      <text x="50" y="${y + 22}" font-size="14" font-weight="800" fill="${C.textFaint}">${String(i + 1).padStart(2, '0')}</text>
      <text x="95" y="${y + 22}" font-size="18" font-weight="800" fill="${color}">${d.type}</text>
      <rect x="170" y="${y + 5}" width="${barW}" height="30" rx="15" fill="${color}" opacity="0.25"/>
      <rect x="170" y="${y + 5}" width="${barW}" height="30" rx="15" fill="${color}" opacity="0.85"/>
      <text x="${180 + barW}" y="${y + 25}" font-size="14" font-weight="800" fill="${color}">${d.score}</text>
      <text x="930" y="${y + 18}" font-size="12" font-weight="700" fill="${C.textSoft}">${d.avg}</text>
      <text x="930" y="${y + 35}" font-size="11" font-weight="500" fill="${C.textMuted}">${d.note}</text>
    `;
  }).join('')}
  `);
}

// ---------- 03 EMOJI USAGE PATTERN ----------
function emojiUsage() {
  const rows = [
    { group: 'NT', label: 'NT 분석가형', color: C.nt600,
      types: 'INTJ · INTP · ENTJ · ENTP',
      emoji: ['.', 'ㅇㅇ', 'ㅇㅋ', '🤔', '…'],
      style: '이모티콘 거의 無 · 마침표 하나',
      desc: 'ENTP만 예외적으로 밈·짤 많이 써' },
    { group: 'NF', label: 'NF 이상주의형', color: C.nf600,
      types: 'INFJ · INFP · ENFJ · ENFP',
      emoji: ['🥺', '🥹', '🫶', '💖', '✨'],
      style: '감정 이모지 폭발 · 공감 이모티콘 필수',
      desc: 'ENFP(나)는 한 메시지에 3개 박아' },
    { group: 'SJ', label: 'SJ 관리자형', color: C.sj600,
      types: 'ISTJ · ISFJ · ESTJ · ESFJ',
      emoji: ['😊', '🙂', '👍', 'ㅎㅎ', 'ㅋㅋ'],
      style: '무난한 기본 이모지 · 정중한 어투',
      desc: 'ISFJ는 하트 이모티콘 구매 제일 많아' },
    { group: 'SP', label: 'SP 기회포착형', color: C.sp600,
      types: 'ISTP · ISFP · ESTP · ESFP',
      emoji: ['ㅋㅋㅋㅋㅋ', '🤣', '👀', 'GIF', '짤'],
      style: 'GIF·짤 활용 · ㅋㅋㅋ 연속 최강',
      desc: 'ESFP는 움직이는 이모티콘 결제왕' },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">16유형 이모티콘 사용 패턴</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">4기질별 카톡 이모지·이모티콘 사용 공식 · 네 유형 확인해봐</text>

  ${rows.map((r, i) => {
    const y = 120 + i * 185;
    return `
      <g transform="translate(60, ${y})">
        <rect width="1080" height="165" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="165" rx="4" fill="${r.color}"/>
        <text x="32" y="40" font-size="24" font-weight="900" fill="${r.color}">${r.label}</text>
        <text x="32" y="68" font-size="13" font-weight="700" fill="${C.textMuted}">${r.types}</text>

        <!-- Emoji samples -->
        ${r.emoji.map((e, j) => `
          <g transform="translate(${32 + j * 110}, 90)">
            <rect width="95" height="50" rx="12" fill="${r.color}" opacity="0.1"/>
            <text x="47" y="34" text-anchor="middle" font-size="22" font-weight="800" fill="${r.color}">${e}</text>
          </g>
        `).join('')}

        <text x="620" y="105" font-size="15" font-weight="800" fill="${C.textSoft}">${r.style}</text>
        <text x="620" y="135" font-size="13" font-weight="500" fill="${C.textMuted}">${r.desc}</text>
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 04 MESSAGE PATTERN 4 MODES ----------
function messagePattern() {
  const modes = [
    { name: '즉답형', icon: '⚡', color: C.sj600,
      types: 'ESFJ · ENFJ · ESTJ · ESFP',
      sample: '"지금 뭐해?" → 30초 안에 답장',
      traits: [
        '메시지 보이자마자 바로 답장',
        '읽씹이 가장 큰 스트레스',
        '답장 늦으면 상대 걱정',
        '그룹톡에서도 혼자 활약',
      ] },
    { name: '생각형', icon: '💭', color: C.nf600,
      types: 'INFJ · ENFJ · ISFJ · INFP',
      sample: '"괜찮아?" → 3문단 답장 + 수정 3번',
      traits: [
        '답장 전 문장 구성 고민',
        '오타·어투 신경 써서 수정',
        '깊은 내용은 긴 답장',
        '가벼운 톡엔 이모지로 대응',
      ] },
    { name: '잠수형', icon: '🌊', color: C.nt600,
      types: 'INTJ · INTP · INFP · ISTP',
      sample: '"답장 기다려" → 3일 후 "미안, 바빴어"',
      traits: [
        '답장 에너지 소진 빠름',
        '여러 개 메시지 쌓이면 더 잠수',
        '진짜 급한 일엔 전화가 빠름',
        '잠수 후 복귀 때 상세 설명',
      ] },
    { name: '답정너형', icon: '📢', color: C.sp600,
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      sample: '"어때?" → 이미 결정된 답 공유',
      traits: [
        '결정된 안건만 톡으로 확인',
        '불필요한 안부 대화 지양',
        '실행 관련은 즉답',
        '감정 대화는 대면 선호',
      ] },
  ];

  const w = 520, h = 360;
  const positions = [
    { x: 60, y: 115 },
    { x: 620, y: 115 },
    { x: 60, y: 510 },
    { x: 620, y: 510 },
  ];

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">카톡 대화 4대 모드 — 네 유형은?</text>
  <text x="600" y="80" text-anchor="middle" font-size="14" font-weight="500" fill="${C.textMuted}">인지기능별 카톡 대응 스타일 · 즉답 / 생각 / 잠수 / 답정너</text>

  ${positions.map((p, i) => {
    const m = modes[i];
    return `
      <g transform="translate(${p.x}, ${p.y})">
        <rect width="${w}" height="${h}" rx="20" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${m.color}"/>
        <text x="30" y="45" font-size="24" font-weight="900" fill="${m.color}">${m.icon} ${m.name}</text>
        <text x="30" y="72" font-size="13" font-weight="700" fill="${C.textMuted}">${m.types}</text>

        <rect x="30" y="90" width="${w - 60}" height="55" rx="12" fill="${m.color}" opacity="0.08"/>
        <text x="45" y="120" font-size="13" font-weight="700" fill="${m.color}">예시 대화</text>
        <text x="45" y="138" font-size="12" font-weight="500" fill="${C.textSoft}">${m.sample}</text>

        ${m.traits.map((t, j) => `
          <g transform="translate(30, ${175 + j * 42})">
            <circle cx="10" cy="0" r="10" fill="${m.color}" opacity="0.2"/>
            <text x="10" y="5" text-anchor="middle" font-size="11" font-weight="900" fill="${m.color}">${j + 1}</text>
            <text x="32" y="5" font-size="13" font-weight="600" fill="${C.textSoft}">${t}</text>
          </g>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- 05 GHOST RISK MATRIX ----------
function ghostRisk() {
  // 4분면: x축 외향성(좌=내향, 우=외향), y축 감정(상=감정중심, 하=논리중심)
  const points = [
    { t: 'INTJ', x: 220, y: 680, risk: 'HIGH' },
    { t: 'INTP', x: 280, y: 720, risk: 'HIGH' },
    { t: 'INFJ', x: 240, y: 250, risk: 'MID' },
    { t: 'INFP', x: 310, y: 300, risk: 'HIGH' },
    { t: 'ISTJ', x: 370, y: 640, risk: 'MID' },
    { t: 'ISFJ', x: 350, y: 340, risk: 'LOW' },
    { t: 'ISTP', x: 420, y: 700, risk: 'HIGH' },
    { t: 'ISFP', x: 450, y: 350, risk: 'MID' },
    { t: 'ENTJ', x: 820, y: 680, risk: 'MID' },
    { t: 'ENTP', x: 870, y: 700, risk: 'MID' },
    { t: 'ENFJ', x: 810, y: 280, risk: 'LOW' },
    { t: 'ENFP', x: 880, y: 340, risk: 'MID' },
    { t: 'ESTJ', x: 940, y: 640, risk: 'LOW' },
    { t: 'ESFJ', x: 920, y: 260, risk: 'LOW' },
    { t: 'ESTP', x: 990, y: 690, risk: 'MID' },
    { t: 'ESFP', x: 970, y: 320, risk: 'LOW' },
  ];
  const riskColor = { LOW: C.safe, MID: C.warn, HIGH: C.danger };

  return wrap(`
  <text x="600" y="45" text-anchor="middle" font-size="30" font-weight="800" fill="${C.text}">읽씹 · 잠수 위험도 매트릭스</text>
  <text x="600" y="72" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">가로 = 에너지 방향(I↔E), 세로 = 판단 기준(F↑T↓) · 색상 = 잠수 리스크</text>

  <!-- Axes -->
  <line x1="600" y1="110" x2="600" y2="820" stroke="${C.divider}" stroke-width="2" stroke-dasharray="8,6"/>
  <line x1="120" y1="470" x2="1080" y2="470" stroke="${C.divider}" stroke-width="2" stroke-dasharray="8,6"/>

  <!-- Axis labels -->
  <text x="600" y="100" text-anchor="middle" font-size="14" font-weight="800" fill="${C.nf600}">감정 중심 F</text>
  <text x="600" y="840" text-anchor="middle" font-size="14" font-weight="800" fill="${C.nt600}">논리 중심 T</text>
  <text x="130" y="475" font-size="14" font-weight="800" fill="${C.textMuted}">내향 I</text>
  <text x="1010" y="475" font-size="14" font-weight="800" fill="${C.textMuted}">외향 E</text>

  <!-- Quadrant background -->
  <rect x="120" y="110" width="480" height="360" fill="${C.nf50}" opacity="0.3"/>
  <rect x="600" y="110" width="480" height="360" fill="${C.sj50}" opacity="0.3"/>
  <rect x="120" y="470" width="480" height="350" fill="${C.nt50}" opacity="0.3"/>
  <rect x="600" y="470" width="480" height="350" fill="${C.sp50}" opacity="0.3"/>

  <!-- Points -->
  ${points.map(p => `
    <circle cx="${p.x}" cy="${p.y}" r="30" fill="${riskColor[p.risk]}" opacity="0.18"/>
    <circle cx="${p.x}" cy="${p.y}" r="24" fill="${riskColor[p.risk]}" opacity="0.85" stroke="#fff" stroke-width="2"/>
    <text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="11" font-weight="900" fill="#fff">${p.t}</text>
  `).join('')}

  <!-- Legend -->
  <g transform="translate(120, 850)">
    <circle cx="15" cy="12" r="10" fill="${C.safe}"/>
    <text x="35" y="17" font-size="13" font-weight="700" fill="${C.textSoft}">LOW · 빠른 답장</text>

    <circle cx="270" cy="12" r="10" fill="${C.warn}"/>
    <text x="290" y="17" font-size="13" font-weight="700" fill="${C.textSoft}">MID · 가끔 늦음</text>

    <circle cx="520" cy="12" r="10" fill="${C.danger}"/>
    <text x="540" y="17" font-size="13" font-weight="700" fill="${C.textSoft}">HIGH · 잠수 빈도 높음</text>
  </g>
  `);
}

// ---------- 06 RITUAL ----------
function ritual() {
  const groups = [
    { name: '다혈질 카톡 가이드', color: C.nf500, icon: '🌟',
      types: 'ENFP · ESFP · ESFJ · ENFJ',
      items: [
        '① 답장 즉시 못하면 "이따 답장" 1줄 보내기',
        '② 감정 이모지는 상대 유형에 맞춰 조절',
        '③ 긴 답장 대신 음성 메시지 활용',
        '④ 주 1회 "디지털 디톡스" 알림 끄기',
      ] },
    { name: '담즙질 카톡 가이드', color: C.nt600, icon: '⚡',
      types: 'ENTJ · ESTJ · ENTP · ESTP',
      items: [
        '① 업무 톡은 24시간 내 답장 원칙',
        '② "ㅇㅋ"만 쓰면 차가워 보임, 이모지 1개',
        '③ 감정 상담 톡엔 "전화 가능?"로 전환',
        '④ 단체톡엔 불필요한 댓글 지양',
      ] },
    { name: '점액질 카톡 가이드', color: C.sj600, icon: '🌾',
      types: 'ISFJ · ISTJ · INFP · ISFP',
      items: [
        '① 답장 완벽주의 내려놓기 — "ㅇㅇ"도 충분',
        '② 감정 소진되면 "답장 늦어져 미안" 한 줄',
        '③ 단체톡 무음 + 중요한 1:1만 알림',
        '④ 주말 하루 "알림 OFF 데이" 고정',
      ] },
    { name: '우울질 카톡 가이드', color: C.nt700, icon: '🌙',
      types: 'INTJ · INFJ · INTP · ISTP',
      items: [
        '① 긴 답장 → 3줄 이내로 축약 연습',
        '② 답장 잊음 대비 "3일마다 체크" 알림',
        '③ 관계 유지형 톡에 이모지 1개 추가',
        '④ 중요한 사람에겐 "읽음" 후 빠른 한 줄',
      ] },
  ];
  const positions = [
    { x: 60, y: 115 },
    { x: 620, y: 115 },
    { x: 60, y: 490 },
    { x: 620, y: 490 },
  ];
  const w = 520, h = 340;

  return wrap(`
  <text x="600" y="50" text-anchor="middle" font-size="28" font-weight="800" fill="${C.text}">기질별 카톡 대응 체크리스트</text>
  <text x="600" y="78" text-anchor="middle" font-size="13" font-weight="500" fill="${C.textMuted}">오늘부터 네 카톡 관계가 달라지는 4단계 실전 가이드</text>

  ${positions.map((p, i) => {
    const g = groups[i];
    return `
      <g transform="translate(${p.x},${p.y})">
        <rect width="${w}" height="${h}" rx="18" fill="#ffffff" stroke="${C.border}"/>
        <rect width="8" height="${h}" rx="4" fill="${g.color}"/>
        <text x="28" y="42" font-size="20" font-weight="800" fill="${g.color}">${g.icon} ${g.name}</text>
        <text x="28" y="66" font-size="12" font-weight="600" fill="${C.textMuted}">${g.types}</text>
        ${g.items.map((it, j) => `
          <text x="28" y="${115 + j * 52}" font-size="13" font-weight="600" fill="${C.textSoft}">${it}</text>
        `).join('')}
      </g>
    `;
  }).join('')}
  `);
}

// ---------- RUNNER ----------
const items = [
  { name: 'kakao-01-hero', svg: hero() },
  { name: 'kakao-02-reply-speed', svg: replySpeed() },
  { name: 'kakao-03-emoji-usage', svg: emojiUsage() },
  { name: 'kakao-04-message-pattern', svg: messagePattern() },
  { name: 'kakao-05-ghost-risk', svg: ghostRisk() },
  { name: 'kakao-06-ritual', svg: ritual() },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const it of items) {
    const svgPath = `${OUT_DIR}/${it.name}.svg`;
    const webpPath = `${OUT_DIR}/${it.name}.webp`;
    fs.writeFileSync(svgPath, it.svg, 'utf-8');
    await sharp(Buffer.from(it.svg), { density: 200 })
      .resize(1200)
      .webp({ quality: 88 })
      .toFile(webpPath);
    const svgKB = (fs.statSync(svgPath).size / 1024).toFixed(1);
    const webpKB = (fs.statSync(webpPath).size / 1024).toFixed(1);
    console.log(`✓ ${it.name}  svg=${svgKB}KB  webp=${webpKB}KB`);
  }
  console.log(`\n✅ Generated ${items.length} infographics → ${OUT_DIR}`);
}

run();
