'use client';

import jsPDF from 'jspdf';
import { TestResult } from '@/data/types';
import { IntegratedProfile } from '@/data/profiles-integrated';

/**
 * 프리미엄 PDF 보고서 생성
 * 페이퍼로지(Paperlogy) 한글 폰트 + 프리미엄 디자인
 */

// ═══ 폰트 캐시 ═══
let fontBase64Regular: string | null = null;
let fontBase64Bold: string | null = null;

// jsDelivr CDN에서 페이퍼로지 TTF 로드
const FONT_URL_REGULAR = 'https://cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy-4Regular.ttf';
const FONT_URL_BOLD = 'https://cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy-7Bold.ttf';

async function loadFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load font: ${url} (${response.status})`);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const CHUNK_SIZE = 8192;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, Math.min(i + CHUNK_SIZE, bytes.length));
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

async function setupFonts(doc: jsPDF): Promise<void> {
  const [regular, bold] = await Promise.all([
    fontBase64Regular ? Promise.resolve(fontBase64Regular) : loadFontAsBase64(FONT_URL_REGULAR),
    fontBase64Bold ? Promise.resolve(fontBase64Bold) : loadFontAsBase64(FONT_URL_BOLD),
  ]);
  fontBase64Regular = regular;
  fontBase64Bold = bold;

  doc.addFileToVFS('Paperlogy-Regular.ttf', regular);
  doc.addFont('Paperlogy-Regular.ttf', 'Paperlogy', 'normal');
  doc.addFileToVFS('Paperlogy-Bold.ttf', bold);
  doc.addFont('Paperlogy-Bold.ttf', 'Paperlogy', 'bold');
  doc.setFont('Paperlogy', 'normal');
}

// ═══ 디자인 상수 ═══
const C = {
  // Primary palette
  navy: [27, 42, 74] as const,       // #1B2A4A
  navyMid: [45, 65, 112] as const,   // #2D4170
  blue: [59, 89, 152] as const,      // #3B5998
  blueLight: [100, 140, 200] as const,

  // Accent
  gold: [201, 169, 110] as const,    // #C9A96E
  goldLight: [230, 210, 170] as const,
  rose: [210, 82, 107] as const,     // #D2526B
  roseLight: [255, 230, 235] as const,
  teal: [56, 178, 172] as const,     // #38B2AC
  tealLight: [230, 250, 248] as const,

  // Neutrals
  textDark: [35, 35, 40] as const,
  textMid: [90, 90, 95] as const,
  textLight: [140, 140, 145] as const,
  bgCream: [250, 247, 242] as const, // #FAF7F2
  bgWarm: [245, 241, 235] as const,
  lineLight: [220, 215, 208] as const,
  white: [255, 255, 255] as const,
};

const FONT = 'Paperlogy';
const MARGIN = 20;

// ═══ 유틸리티 ═══
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const para of text.split('\n')) {
    if (para.trim() === '') { lines.push(''); continue; }
    lines.push(...(doc.splitTextToSize(para, maxWidth) as string[]));
  }
  return lines;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + needed > pageH - MARGIN - 5) {
    doc.addPage();
    drawPageHeader(doc);
    return MARGIN + 16;
  }
  return y;
}

function drawPageHeader(doc: jsPDF): void {
  const w = doc.internal.pageSize.getWidth();
  // 상단 골드 라인
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, 12, w - MARGIN, 12);
  // 브랜드
  doc.setFont(FONT, 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...C.textLight);
  doc.text('192types.com', w - MARGIN, 10, { align: 'right' });
}

// ═══ 섹션 헤더 ═══
function drawSectionHeader(doc: jsPDF, title: string, y: number, icon?: string): number {
  y = ensureSpace(doc, y, 22);
  const w = doc.internal.pageSize.getWidth();
  const contentW = w - MARGIN * 2;

  // 골드 언더라인
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y + 12, MARGIN + contentW, y + 12);

  // 타이틀
  doc.setFont(FONT, 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...C.navy);
  const displayTitle = icon ? `${icon}  ${title}` : title;
  doc.text(displayTitle, MARGIN, y + 9);

  return y + 20;
}

// ═══ 본문 텍스트 ═══
function drawBody(doc: jsPDF, text: string, y: number, contentWidth: number): number {
  doc.setFont(FONT, 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...C.textMid);
  const lines = wrapText(doc, text, contentWidth);

  for (const line of lines) {
    y = ensureSpace(doc, y, 6);
    if (line === '') { y += 3; continue; }
    doc.text(line, MARGIN + 2, y);
    y += 5.2;
  }
  return y + 3;
}

// ═══ 서브 헤더 ═══
function drawSubHeader(doc: jsPDF, title: string, y: number): number {
  y = ensureSpace(doc, y, 12);
  doc.setFont(FONT, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C.blue);
  doc.text(title, MARGIN + 2, y);
  return y + 7;
}

// ═══ 태그 목록 ═══
function drawTags(doc: jsPDF, tags: string[], y: number, color: 'rose' | 'teal' | 'gold' = 'rose'): number {
  y = ensureSpace(doc, y, 12);
  doc.setFont(FONT, 'normal');
  let x = MARGIN + 2;

  const bgMap = { rose: C.roseLight, teal: C.tealLight, gold: [248, 240, 225] as readonly number[] };
  const fgMap = { rose: C.rose, teal: C.teal, gold: C.gold };

  for (const tag of tags) {
    doc.setFontSize(8.5);
    const tagWidth = doc.getTextWidth(tag) + 10;
    if (x + tagWidth > doc.internal.pageSize.getWidth() - MARGIN) {
      x = MARGIN + 2;
      y += 9;
      y = ensureSpace(doc, y, 12);
    }
    doc.setFillColor(bgMap[color][0], bgMap[color][1], bgMap[color][2]);
    doc.roundedRect(x, y - 5, tagWidth, 8, 3, 3, 'F');
    doc.setTextColor(fgMap[color][0], fgMap[color][1], fgMap[color][2]);
    doc.text(tag, x + 5, y);
    x += tagWidth + 4;
  }
  return y + 12;
}

// ═══ 프리미엄 프로그레스 바 ═══
function drawProgressBar(
  doc: jsPDF,
  leftLabel: string,
  rightLabel: string,
  percentage: number,
  y: number,
  contentWidth: number,
  barColor: readonly number[],
): number {
  y = ensureSpace(doc, y, 16);
  const barX = MARGIN + 2;
  const barW = contentWidth - 4;
  const barH = 5;

  // 라벨
  doc.setFont(FONT, 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C.textMid);
  doc.text(`${leftLabel}  ${percentage}%`, barX, y);
  if (rightLabel) {
    doc.text(`${100 - percentage}%  ${rightLabel}`, barX + barW, y, { align: 'right' });
  }
  y += 4;

  // 배경
  doc.setFillColor(238, 235, 230);
  doc.roundedRect(barX, y, barW, barH, 2.5, 2.5, 'F');

  // 채움
  const fillW = (barW * percentage) / 100;
  if (fillW > 0) {
    doc.setFillColor(barColor[0], barColor[1], barColor[2]);
    doc.roundedRect(barX, y, Math.max(fillW, 5), barH, 2.5, 2.5, 'F');
  }

  return y + barH + 6;
}

// ═══ 인용문 스타일 블록 ═══
function drawQuoteBlock(doc: jsPDF, text: string, y: number, contentWidth: number): number {
  y = ensureSpace(doc, y, 20);

  // 왼쪽 골드 바
  doc.setFillColor(...C.gold);
  doc.rect(MARGIN + 2, y, 2.5, 16, 'F');

  // 크림 배경
  doc.setFillColor(C.bgCream[0], C.bgCream[1], C.bgCream[2]);
  doc.roundedRect(MARGIN + 8, y - 2, contentWidth - 10, 20, 2, 2, 'F');

  // 텍스트
  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.textMid);
  const lines = wrapText(doc, text, contentWidth - 18);
  let ty = y + 5;
  for (const line of lines.slice(0, 3)) {
    doc.text(line, MARGIN + 12, ty);
    ty += 5;
  }

  return y + 24;
}

// ═══════════════════════════════════════════════════════
// 메인 PDF 생성 함수
// ═══════════════════════════════════════════════════════
export async function generatePremiumPDF(result: TestResult, profile: IntegratedProfile): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const contentW = pageW - MARGIN * 2;
  let y = MARGIN;

  // ═══ 폰트 로드 ═══
  await setupFonts(doc);

  // ═══════════════════════════════════════════
  // 표지 페이지
  // ═══════════════════════════════════════════
  // 전체 크림 배경
  doc.setFillColor(...C.bgCream);
  doc.rect(0, 0, pageW, pageH, 'F');

  // 테두리 프레임 (골드)
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(1.2);
  doc.rect(12, 12, pageW - 24, pageH - 24);
  // 안쪽 프레임
  doc.setLineWidth(0.3);
  doc.rect(15, 15, pageW - 30, pageH - 30);

  // 상단 장식 라인
  const cx = pageW / 2;
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.5);
  doc.line(cx - 40, 50, cx + 40, 50);
  doc.line(cx - 25, 53, cx + 25, 53);

  // 브랜드
  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.gold);
  doc.text('192 PERSONALITY TYPES', cx, 42, { align: 'center' });

  // 타입 코드 (큰 글씨)
  doc.setFont(FONT, 'bold');
  doc.setFontSize(48);
  doc.setTextColor(...C.navy);
  doc.text(result.fullCode, cx, 82, { align: 'center' });

  // 골드 구분선
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.8);
  doc.line(cx - 30, 90, cx + 30, 90);

  // MBTI 닉네임
  doc.setFont(FONT, 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...C.navy);
  doc.text(`${profile.mbtiEmoji} ${profile.mbtiNickname}`, cx, 104, { align: 'center' });

  // 기질 닉네임
  doc.setFont(FONT, 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...C.blue);
  doc.text(profile.temperamentNickname, cx, 114, { align: 'center' });

  // 인지기능 & 인구비율 박스
  doc.setFillColor(...C.white);
  doc.setDrawColor(...C.lineLight);
  doc.setLineWidth(0.3);
  doc.roundedRect(cx - 45, 125, 90, 28, 3, 3, 'FD');

  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.textMid);
  doc.text(`인지기능: ${profile.cognitiveStack}`, cx, 136, { align: 'center' });
  doc.text(`인구 비율: ${profile.population}`, cx, 145, { align: 'center' });

  // 하단 정보
  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.textLight);
  doc.text('MBTI + 히포크라테스 기질론 통합 분석 보고서', cx, 190, { align: 'center' });

  doc.setFont(FONT, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...C.gold);
  doc.text('192types.com', cx, 200, { align: 'center' });

  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFont(FONT, 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C.textLight);
  doc.text(today, cx, 215, { align: 'center' });

  // 하단 장식
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.5);
  doc.line(cx - 25, 255, cx + 25, 255);
  doc.line(cx - 40, 258, cx + 40, 258);

  // ═══════════════════════════════════════════
  // 페이지 2: 성향 분석 차트
  // ═══════════════════════════════════════════
  doc.addPage();
  drawPageHeader(doc);
  y = MARGIN + 14;

  y = drawSectionHeader(doc, 'MBTI 성향 분석', y);

  const axisLabels: Record<string, [string, string]> = {
    EI: ['외향 (E)', '내향 (I)'],
    SN: ['직관 (N)', '감각 (S)'],
    TF: ['감정 (F)', '사고 (T)'],
    JP: ['인식 (P)', '판단 (J)'],
  };

  const mbtiColors = [C.teal, C.blue, C.rose, C.gold];
  let ci = 0;
  for (const axis of ['EI', 'SN', 'TF', 'JP'] as const) {
    const d = result.mbti.axes[axis];
    const lb = axisLabels[axis];
    y = drawProgressBar(doc, lb[0], lb[1], d.percentage, y, contentW, mbtiColors[ci]);
    ci++;
  }

  y += 4;
  y = drawSectionHeader(doc, '기질 분포', y);

  const tempNames: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };
  const tempColors: Record<string, readonly number[]> = {
    S: [255, 167, 38],  // 주황
    C: [211, 47, 47],   // 빨강
    P: [56, 142, 60],   // 초록
    M: [81, 45, 168],   // 보라
  };
  for (const t of ['S', 'C', 'P', 'M'] as const) {
    const d = result.temperament.all[t];
    const isPrimary = result.temperament.primary.type === t;
    const isSecondary = result.temperament.secondary.type === t;
    const suffix = isPrimary ? '  (주 기질)' : isSecondary ? '  (보조 기질)' : '';
    y = drawProgressBar(doc, `${tempNames[t]}${suffix}`, '', d.percentage, y, contentW, tempColors[t]);
  }

  // 신뢰도 배지
  y += 2;
  y = ensureSpace(doc, y, 14);
  const gradeText = result.reliability.grade === 'A' ? '높음' : result.reliability.grade === 'B' ? '보통' : '낮음';
  doc.setFillColor(C.bgCream[0], C.bgCream[1], C.bgCream[2]);
  doc.roundedRect(MARGIN, y, contentW, 12, 3, 3, 'F');
  doc.setFont(FONT, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...C.navy);
  doc.text(`검사 신뢰도: ${result.reliability.grade}등급 (${gradeText})`, MARGIN + contentW / 2, y + 8, { align: 'center' });
  y += 18;

  // ═══════════════════════════════════════════
  // 성격 심층 분석
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '성격 심층 분석', y);
  y = drawBody(doc, profile.personalityNarrative, y, contentW);

  // 모순 인사이트
  if (profile.contradictionInsights.length > 0) {
    y = drawSectionHeader(doc, '숨겨진 모순', y);
    for (const insight of profile.contradictionInsights) {
      y = drawBody(doc, `\u2022  ${insight}`, y, contentW);
    }
  }

  // 숨겨진 자아
  y = drawSectionHeader(doc, '숨겨진 자아', y);
  y = drawBody(doc, profile.hiddenSelf, y, contentW);

  // ═══════════════════════════════════════════
  // 연애 분석
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '연애 & 관계', y);
  y = drawBody(doc, profile.loveNarrative, y, contentW);

  if (profile.bestMatch.length > 0) {
    y = drawSubHeader(doc, '최고 궁합 유형', y);
    y = drawTags(doc, profile.bestMatch, y, 'rose');
  }

  // ═══════════════════════════════════════════
  // 커리어 전략
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '커리어 전략', y);
  y = drawBody(doc, profile.careerGuide, y, contentW);

  if (profile.careers.length > 0) {
    y = drawSubHeader(doc, '추천 직업', y);
    y = drawTags(doc, profile.careers, y, 'teal');
  }

  // ═══════════════════════════════════════════
  // 스트레스 & 성장
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '스트레스 패턴 (Grip 상태)', y);
  y = drawBody(doc, profile.gripStressNarrative, y, contentW);

  y = drawSectionHeader(doc, '회복 & 성장 전략', y);
  y = drawBody(doc, profile.stressGuide, y, contentW);

  y = drawSectionHeader(doc, '인생 전략', y);
  y = drawBody(doc, profile.lifeStrategy, y, contentW);

  // ═══════════════════════════════════════════
  // 소통 & 양육
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '소통 스타일', y);
  y = drawBody(doc, profile.communicationGuide, y, contentW);

  y = drawSectionHeader(doc, '양육 인사이트', y);
  y = drawBody(doc, profile.parentingInsight, y, contentW);

  // ═══════════════════════════════════════════
  // 그림자 & 성장 포인트
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '그림자 & 성장 포인트', y);
  y = drawBody(doc, profile.weaknessInsight, y, contentW);

  // ═══════════════════════════════════════════
  // 과학적 근거
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '과학적 근거', y);

  y = drawSubHeader(doc, 'Eysenck 모델', y);
  y = drawBody(doc, profile.eysenckInsight, y, contentW);

  y = drawSubHeader(doc, '신경과학 (Helen Fisher)', y);
  y = drawBody(doc, profile.neuroscienceInsight, y, contentW);

  y = drawSubHeader(doc, '4체액설', y);
  y = drawBody(doc, profile.humorTheoryInsight, y, contentW);

  // ═══════════════════════════════════════════
  // 유명인
  // ═══════════════════════════════════════════
  if (profile.celebrities.length > 0) {
    y = drawSectionHeader(doc, '같은 유형의 유명인', y);
    y = drawTags(doc, profile.celebrities, y, 'gold');
  }

  // ═══════════════════════════════════════════
  // 마지막 푸터
  // ═══════════════════════════════════════════
  y = ensureSpace(doc, y, 35);
  y += 8;

  // 골드 구분선
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, pageW - MARGIN, y);
  y += 10;

  doc.setFont(FONT, 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C.textLight);
  doc.text('이 보고서는 192 성격 유형 검사 (192types.com)에서 생성되었습니다.', cx, y, { align: 'center' });
  y += 5;
  doc.text('MBTI 인지기능 + 히포크라테스 4기질론 기반 통합 분석', cx, y, { align: 'center' });
  y += 5;
  doc.setFontSize(7);
  doc.text(`보고서 ID: ${result.fullCode}-${Date.now().toString(36).toUpperCase()}`, cx, y, { align: 'center' });

  // ═══════════════════════════════════════════
  // 페이지 번호 (2페이지부터)
  // ═══════════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont(FONT, 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...C.textLight);
    doc.text(`${i} / ${totalPages}`, pageW / 2, pageH - 10, { align: 'center' });

    // 하단 골드 라인
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, pageH - 14, pageW - MARGIN, pageH - 14);
  }

  // 다운로드
  doc.save(`192types-${result.fullCode}-report.pdf`);
}
