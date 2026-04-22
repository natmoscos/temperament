'use client';

import jsPDF from 'jspdf';
import { TestResult } from '@/data/types';
import { IntegratedProfile } from '@/data/profiles-integrated';
import {
  getTopCompatible,
  getBottomCompatible,
  getFullCompatibilityRow,
  getRelationshipSummary,
  type MbtiType,
} from '@/data/pdf-premium-compatibility';
import { GROWTH_PLANS } from '@/data/pdf-premium-growth-plan';
import { STRESS_CHECKLISTS, getCategoryLabel } from '@/data/pdf-premium-stress-check';
import { generateComboAnalysis, type ComboCode } from '@/data/pdf-premium-combo-analysis';
import {
  getTopCareers,
  getBottomCareers,
  getCareerScore,
  getWorkEnvironment,
  INTERVIEW_STYLES,
  type Career,
} from '@/data/pdf-premium-career-suite';

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

// ═══ 핵심 인사이트 강조 박스 (골드 하이라이트) ═══
function drawGoldInsight(doc: jsPDF, text: string, y: number, contentWidth: number): number {
  y = ensureSpace(doc, y, 24);

  // 골드 배경 박스
  doc.setFillColor(252, 246, 230);        // 밝은 골드 배경
  doc.setDrawColor(C.gold[0], C.gold[1], C.gold[2]);
  doc.setLineWidth(0.6);

  const lines = wrapText(doc, text, contentWidth - 24);
  const boxH = Math.max(16, lines.length * 5.2 + 10);
  doc.roundedRect(MARGIN, y, contentWidth, boxH, 3, 3, 'FD');

  // 왼쪽 골드 액센트 바
  doc.setFillColor(...C.gold);
  doc.rect(MARGIN, y, 3, boxH, 'F');

  // 볼드 텍스트
  doc.setFont(FONT, 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(C.navy[0], C.navy[1], C.navy[2]);
  let ty = y + 7;
  for (const line of lines) {
    if (line === '') { ty += 3; continue; }
    doc.text(line, MARGIN + 10, ty);
    ty += 5.2;
  }

  return y + boxH + 6;
}

// ═══ 볼드 핵심 문장 (인라인 강조) ═══
function drawBoldAccent(doc: jsPDF, text: string, y: number, contentWidth: number): number {
  y = ensureSpace(doc, y, 8);
  doc.setFont(FONT, 'bold');
  doc.setFontSize(10);
  doc.setTextColor(C.navy[0], C.navy[1], C.navy[2]);
  const lines = wrapText(doc, text, contentWidth - 4);
  for (const line of lines) {
    y = ensureSpace(doc, y, 6);
    if (line === '') { y += 3; continue; }
    doc.text(line, MARGIN + 2, y);
    y += 5.5;
  }
  return y + 2;
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
// 프리미엄 섹션 1: 16×16 궁합 매트릭스
// ═══════════════════════════════════════════════════════
function drawCompatibilityMatrix(doc: jsPDF, mbtiType: MbtiType, y: number, contentWidth: number): number {
  y = drawSectionHeader(doc, '16유형 궁합 매트릭스', y);
  y = drawBoldAccent(doc, `${mbtiType} 유형의 16가지 상대와의 호환성 전망`, y, contentWidth);

  // TOP 3 호환
  y = drawSubHeader(doc, '⭐ 최고 호환 TOP 3', y);
  const top3 = getTopCompatible(mbtiType);
  for (const { type, score } of top3) {
    y = ensureSpace(doc, y, 22);
    // 카드 배경 (골드 톤)
    doc.setFillColor(252, 246, 230);
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.4);
    doc.roundedRect(MARGIN, y, contentWidth, 18, 2, 2, 'FD');

    // 유형 코드
    doc.setFont(FONT, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...C.navy);
    doc.text(type, MARGIN + 5, y + 7);

    // 별점
    const stars = '★'.repeat(score) + '☆'.repeat(5 - score);
    doc.setFontSize(9);
    doc.setTextColor(...C.gold);
    doc.text(stars, MARGIN + 30, y + 7);

    // 한 줄 설명
    doc.setFont(FONT, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C.textMid);
    const summary = getRelationshipSummary(mbtiType, type, score);
    const lines = wrapText(doc, summary, contentWidth - 10);
    doc.text(lines[0] || '', MARGIN + 5, y + 14);

    y += 22;
  }

  // BOTTOM 3 주의 관계
  y += 2;
  y = drawSubHeader(doc, '⚠ 주의 관계 TOP 3', y);
  const bottom3 = getBottomCompatible(mbtiType);
  for (const { type, score } of bottom3) {
    y = ensureSpace(doc, y, 18);
    doc.setFillColor(252, 238, 238);
    doc.setDrawColor(...C.rose);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, contentWidth, 15, 2, 2, 'FD');

    doc.setFont(FONT, 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...C.rose);
    doc.text(type, MARGIN + 5, y + 6);

    const stars = '★'.repeat(score) + '☆'.repeat(5 - score);
    doc.setFontSize(8);
    doc.text(stars, MARGIN + 30, y + 6);

    doc.setFont(FONT, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    const summary = getRelationshipSummary(mbtiType, type, score);
    const lines = wrapText(doc, summary, contentWidth - 10);
    doc.text(lines[0] || '', MARGIN + 5, y + 12);

    y += 18;
  }

  // 전체 16유형 매트릭스 (그리드 4×4)
  y += 3;
  y = drawSubHeader(doc, '📊 16유형 전체 점수표', y);
  const fullRow = getFullCompatibilityRow(mbtiType);
  const cellW = contentWidth / 4;
  const cellH = 12;
  y = ensureSpace(doc, y, cellH * 4 + 4);

  for (let i = 0; i < 16; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const cx = MARGIN + col * cellW;
    const cy = y + row * cellH;
    const entry = fullRow[i];

    // 배경 색상 (점수별)
    const bgColor = entry.score === 5 ? [254, 246, 220]
                  : entry.score === 4 ? [240, 248, 240]
                  : entry.score === 3 ? [245, 245, 245]
                  : entry.score === 2 ? [253, 236, 234]
                  : [250, 220, 220];
    doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    doc.setDrawColor(...C.lineLight);
    doc.setLineWidth(0.2);
    doc.rect(cx, cy, cellW, cellH, 'FD');

    // 유형 코드
    doc.setFont(FONT, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...C.navy);
    doc.text(entry.type, cx + 3, cy + 5);

    // 별점
    doc.setFontSize(7);
    doc.setTextColor(...C.gold);
    const stars = '★'.repeat(entry.score);
    doc.text(stars, cx + 3, cy + 9.5);
  }

  return y + cellH * 4 + 6;
}

// ═══════════════════════════════════════════════════════
// 프리미엄 섹션 2: 30일 성장 액션 플랜
// ═══════════════════════════════════════════════════════
function drawGrowthPlan(doc: jsPDF, mbtiType: MbtiType, y: number, contentWidth: number): number {
  const plan = GROWTH_PLANS[mbtiType];
  if (!plan) return y;

  y = drawSectionHeader(doc, '30일 성장 액션 플랜', y);
  y = drawGoldInsight(doc, plan.intro, y, contentWidth);

  // 4주차 카드
  for (const week of plan.weeks) {
    y = ensureSpace(doc, y, 35);

    // 주차 헤더
    doc.setFillColor(...C.bgCream);
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.4);
    doc.roundedRect(MARGIN, y, contentWidth, 9, 2, 2, 'FD');
    doc.setFont(FONT, 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...C.navy);
    doc.text(week.title, MARGIN + 5, y + 6);
    y += 13;

    // Focus
    doc.setFont(FONT, 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.blue);
    doc.text('Focus', MARGIN + 2, y);
    doc.setFont(FONT, 'normal');
    doc.setTextColor(...C.textMid);
    const focusLines = wrapText(doc, week.focus, contentWidth - 22);
    doc.text(focusLines[0] || '', MARGIN + 18, y);
    y += 6;
    for (let i = 1; i < focusLines.length; i++) {
      y = ensureSpace(doc, y, 5);
      doc.text(focusLines[i], MARGIN + 18, y);
      y += 5;
    }
    y += 2;

    // Actions
    doc.setFont(FONT, 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.blue);
    doc.text('실천 과제', MARGIN + 2, y);
    y += 5;
    doc.setFont(FONT, 'normal');
    doc.setTextColor(...C.textMid);
    for (const action of week.actions) {
      y = ensureSpace(doc, y, 8);
      // 체크박스
      doc.setDrawColor(...C.gold);
      doc.setLineWidth(0.4);
      doc.rect(MARGIN + 4, y - 3, 3, 3, 'D');
      // 텍스트
      const actionLines = wrapText(doc, action, contentWidth - 12);
      doc.text(actionLines[0] || '', MARGIN + 10, y);
      y += 5;
      for (let i = 1; i < actionLines.length; i++) {
        y = ensureSpace(doc, y, 5);
        doc.text(actionLines[i], MARGIN + 10, y);
        y += 5;
      }
    }
    y += 2;

    // Why
    doc.setFillColor(245, 241, 235);
    const whyLines = wrapText(doc, week.why, contentWidth - 10);
    const whyH = whyLines.length * 4.5 + 5;
    y = ensureSpace(doc, y, whyH + 3);
    doc.roundedRect(MARGIN, y, contentWidth, whyH, 2, 2, 'F');
    doc.setFont(FONT, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    let wy = y + 4;
    for (const line of whyLines) {
      doc.text(line, MARGIN + 5, wy);
      wy += 4.5;
    }
    y += whyH + 6;
  }

  // Closing
  y = drawGoldInsight(doc, plan.closing, y, contentWidth);

  return y;
}

// ═══════════════════════════════════════════════════════
// 프리미엄 섹션 3: 스트레스 조기 경보 체크리스트
// ═══════════════════════════════════════════════════════
function drawStressChecklist(doc: jsPDF, mbtiType: MbtiType, y: number, contentWidth: number): number {
  const checklist = STRESS_CHECKLISTS[mbtiType];
  if (!checklist) return y;

  y = drawSectionHeader(doc, '스트레스 조기 경보 체크리스트', y);
  y = drawBody(doc, checklist.intro, y, contentWidth);

  // 카테고리별 항목
  let prevCategory: string | null = null;
  for (const signal of checklist.signals) {
    if (prevCategory !== signal.category) {
      y += 1;
      y = drawSubHeader(doc, getCategoryLabel(signal.category) + ' 신호', y);
      prevCategory = signal.category;
    }

    y = ensureSpace(doc, y, 7);
    // 체크박스
    doc.setDrawColor(...C.navy);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN + 4, y - 3, 3.5, 3.5, 'D');

    // 텍스트
    doc.setFont(FONT, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.textMid);
    const lines = wrapText(doc, signal.signal, contentWidth - 14);
    doc.text(lines[0] || '', MARGIN + 11, y);
    y += 5;
    for (let i = 1; i < lines.length; i++) {
      y = ensureSpace(doc, y, 5);
      doc.text(lines[i], MARGIN + 11, y);
      y += 5;
    }
  }

  y += 4;
  // 점수 해석
  y = drawSubHeader(doc, '📊 체크 개수별 해석', y);
  const interps = [
    { label: '0~4개', color: [220, 240, 220], text: checklist.interpretation.low },
    { label: '5~9개', color: [254, 246, 220], text: checklist.interpretation.mid },
    { label: '10~15개', color: [253, 230, 230], text: checklist.interpretation.high },
  ];
  for (const interp of interps) {
    const lines = wrapText(doc, interp.text, contentWidth - 30);
    const boxH = Math.max(12, lines.length * 4.5 + 5);
    y = ensureSpace(doc, y, boxH + 3);

    doc.setFillColor(interp.color[0], interp.color[1], interp.color[2]);
    doc.setDrawColor(...C.lineLight);
    doc.setLineWidth(0.2);
    doc.roundedRect(MARGIN, y, contentWidth, boxH, 2, 2, 'FD');

    doc.setFont(FONT, 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.navy);
    doc.text(interp.label, MARGIN + 4, y + 5.5);

    doc.setFont(FONT, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...C.textMid);
    let ly = y + 5.5;
    for (const line of lines) {
      doc.text(line, MARGIN + 25, ly);
      ly += 4.5;
    }
    y += boxH + 3;
  }

  y += 3;
  // 회복 행동
  y = drawSubHeader(doc, '💚 즉시 실행할 회복 행동', y);
  for (const action of checklist.recoveryActions) {
    y = ensureSpace(doc, y, 7);
    doc.setDrawColor(...C.teal);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN + 4, y - 3, 3.5, 3.5, 'D');
    doc.setFont(FONT, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.textMid);
    const lines = wrapText(doc, action, contentWidth - 14);
    doc.text(lines[0] || '', MARGIN + 11, y);
    y += 5;
    for (let i = 1; i < lines.length; i++) {
      y = ensureSpace(doc, y, 5);
      doc.text(lines[i], MARGIN + 11, y);
      y += 5;
    }
  }

  return y + 4;
}

// ═══════════════════════════════════════════════════════
// 프리미엄 섹션 5: Career Suite (50 직업 적합도 + 근무 환경 + 면접)
// ═══════════════════════════════════════════════════════
function drawCareerSuite(doc: jsPDF, mbtiType: MbtiType, y: number, contentWidth: number): number {
  y = drawSectionHeader(doc, 'Career Suite — 직업 적합도 정밀 분석', y);
  y = drawBoldAccent(doc, `${mbtiType} 유형의 50개 직업 매칭 + 근무 환경 + 면접 전략`, y, contentWidth);

  // ─── TOP 10 직업 ───
  y = drawSubHeader(doc, '✨ 당신에게 가장 적합한 직업 TOP 10', y);
  const top10 = getTopCareers(mbtiType, 10);
  for (let i = 0; i < top10.length; i++) {
    const career = top10[i];
    const score = getCareerScore(career, mbtiType);
    y = drawCareerCard(doc, career, score, i + 1, y, contentWidth, 'best');
  }

  y += 3;

  // ─── BOTTOM 5 주의 직업 ───
  y = drawSubHeader(doc, '⚠ 주의해야 할 직업 5개', y);
  const bottom5 = getBottomCareers(mbtiType, 5);
  for (let i = 0; i < bottom5.length; i++) {
    const career = bottom5[i];
    const score = getCareerScore(career, mbtiType);
    y = drawCareerCard(doc, career, score, i + 1, y, contentWidth, 'challenge');
  }

  y += 4;

  // ─── 근무 환경 4축 ───
  y = drawSubHeader(doc, '🏢 당신에게 맞는 근무 환경 4축', y);
  const env = getWorkEnvironment(mbtiType);
  y = drawEnvBar(doc, '원격 근무', '대면 근무', env.remoteVsOffice, y, contentWidth);
  y = drawEnvBar(doc, '독립 작업', '팀 협업', env.soloVsTeam, y, contentWidth);
  y = drawEnvBar(doc, '유연 일정', '체계 구조', env.structuredVsFlex, y, contentWidth);
  y = drawEnvBar(doc, '안정 환경', '변화·도전', env.stableVsDynamic, y, contentWidth);

  y += 4;

  // ─── 면접·협상 스타일 ───
  y = drawSubHeader(doc, '🎤 면접·협상 스타일 가이드', y);
  const style = INTERVIEW_STYLES[mbtiType];

  y = drawBoldAccent(doc, '💪 면접에서 자연스러운 강점', y, contentWidth);
  y = drawBody(doc, style.strength, y, contentWidth);

  y = drawBoldAccent(doc, '⚠ 주의해야 할 약점', y, contentWidth);
  y = drawBody(doc, style.weakness, y, contentWidth);

  y = drawBoldAccent(doc, '📋 면접 준비 3가지', y, contentWidth);
  for (const prep of style.preparation) {
    y = ensureSpace(doc, y, 7);
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN + 4, y - 3, 3, 3, 'D');
    doc.setFont(FONT, 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.textMid);
    const lines = wrapText(doc, prep, contentWidth - 12);
    doc.text(lines[0] || '', MARGIN + 10, y);
    y += 5;
    for (let i = 1; i < lines.length; i++) {
      y = ensureSpace(doc, y, 5);
      doc.text(lines[i], MARGIN + 10, y);
      y += 5;
    }
  }
  y += 2;

  y = drawBoldAccent(doc, '💰 연봉 협상 스타일', y, contentWidth);
  y = drawGoldInsight(doc, style.negotiation, y, contentWidth);

  return y;
}

function drawCareerCard(
  doc: jsPDF,
  career: Career,
  score: number,
  rank: number,
  y: number,
  contentWidth: number,
  variant: 'best' | 'challenge',
): number {
  const lines = wrapText(doc, career.description, contentWidth - 40);
  const boxH = Math.max(18, 12 + lines.length * 4.5);
  y = ensureSpace(doc, y, boxH + 2);

  const bgColor = variant === 'best' ? [252, 246, 230] : [253, 238, 238];
  const borderColor = variant === 'best' ? C.gold : C.rose;

  doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, contentWidth, boxH, 2, 2, 'FD');

  // 순위
  doc.setFont(FONT, 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...C.textLight);
  doc.text(`#${rank}`, MARGIN + 3, y + 5);

  // 직업명 + 이모지
  doc.setFont(FONT, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C.navy);
  doc.text(`${career.emoji}  ${career.title}`, MARGIN + 12, y + 5.5);

  // 별점
  const stars = '★'.repeat(score) + '☆'.repeat(5 - score);
  doc.setFontSize(9);
  doc.setTextColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.text(stars, MARGIN + contentWidth - 32, y + 5.5);

  // 카테고리
  doc.setFont(FONT, 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...C.textLight);
  doc.text(career.category, MARGIN + contentWidth - 4, y + 5.5, { align: 'right' });

  // 설명
  doc.setFont(FONT, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...C.textMid);
  let ly = y + 11;
  for (const line of lines) {
    doc.text(line, MARGIN + 5, ly);
    ly += 4.5;
  }

  return y + boxH + 2;
}

function drawEnvBar(
  doc: jsPDF,
  leftLabel: string,
  rightLabel: string,
  value: number,
  y: number,
  contentWidth: number,
): number {
  y = ensureSpace(doc, y, 14);
  const barX = MARGIN + 2;
  const barW = contentWidth - 4;
  const barH = 4;

  // 라벨
  doc.setFont(FONT, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...C.textMid);
  doc.text(leftLabel, barX, y);
  doc.text(rightLabel, barX + barW, y, { align: 'right' });
  y += 3;

  // 배경
  doc.setFillColor(238, 235, 230);
  doc.roundedRect(barX, y, barW, barH, 2, 2, 'F');

  // 마커 (지점)
  const markerX = barX + (barW * value) / 100;
  doc.setFillColor(...C.gold);
  doc.circle(markerX, y + barH / 2, 3, 'F');
  doc.setDrawColor(...C.navy);
  doc.setLineWidth(0.5);
  doc.circle(markerX, y + barH / 2, 3, 'S');

  return y + barH + 7;
}

// ═══════════════════════════════════════════════════════
// 프리미엄 섹션 4: 192 조합 고유 심층 분석
// ═══════════════════════════════════════════════════════
function drawCombinationAnalysis(
  doc: jsPDF,
  mbtiType: MbtiType,
  comboCode: ComboCode,
  y: number,
  contentWidth: number,
): number {
  const analysis = generateComboAnalysis(mbtiType, comboCode);
  const { combo } = analysis;

  y = drawSectionHeader(doc, `${mbtiType}-${comboCode} 고유 심층 분석`, y);
  y = drawBoldAccent(doc, `"${combo.nickname}" — ${combo.essence}`, y, contentWidth);

  // 대표 인물
  y = drawSubHeader(doc, '이 기질 조합의 대표 인물', y);
  y = ensureSpace(doc, y, 8);
  doc.setFont(FONT, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.textMid);
  for (const fig of combo.historicalFigures) {
    y = ensureSpace(doc, y, 6);
    doc.setTextColor(...C.gold);
    doc.text('◆', MARGIN + 4, y);
    doc.setTextColor(...C.textMid);
    const lines = wrapText(doc, fig, contentWidth - 12);
    doc.text(lines[0] || '', MARGIN + 10, y);
    y += 5.5;
  }
  y += 3;

  // 빛나는 순간
  y = drawSubHeader(doc, '✨ 가장 빛나는 순간', y);
  y = drawBody(doc, combo.shiningMoment, y, contentWidth);

  // 무너지는 순간
  y = drawSubHeader(doc, '⚠ 가장 무너지는 순간', y);
  y = drawBody(doc, combo.breakingPoint, y, contentWidth);

  // MBTI × 기질 결합 서술
  y = drawSubHeader(doc, `${mbtiType}가 이 기질을 만났을 때`, y);
  y = drawBody(doc, analysis.mbtiMeetCombo, y, contentWidth);

  // 같은 MBTI, 다른 기질
  y = drawSubHeader(doc, `같은 ${mbtiType}인데 다른 사람인 이유`, y);
  y = drawBody(doc, analysis.sameTypeDiff, y, contentWidth);

  // 같은 기질, 다른 MBTI
  y = drawSubHeader(doc, `같은 "${combo.nickname}" 기질인데 다른 표현인 이유`, y);
  y = drawBody(doc, analysis.sameComboDiff, y, contentWidth);

  // 통합 인생 경로
  y = drawSubHeader(doc, '당신만의 통합 인생 경로', y);
  y = drawGoldInsight(doc, analysis.integratedLifePath, y, contentWidth);

  return y;
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
  doc.text('성격 유형 + 히포크라테스 기질론 통합 분석 보고서', cx, 190, { align: 'center' });

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

  y = drawSectionHeader(doc, '성격 유형 성향 분석', y);

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
  y = drawBoldAccent(doc, `${result.fullCode} — ${profile.mbtiNickname}, ${profile.temperamentNickname}`, y, contentW);
  y = drawBody(doc, profile.personalityNarrative, y, contentW);

  // 모순 인사이트
  if (profile.contradictionInsights.length > 0) {
    y = drawSectionHeader(doc, '숨겨진 모순', y);
    y = drawGoldInsight(doc, `당신의 핵심 모순: ${profile.contradictionInsights[0]}`, y, contentW);
    for (const insight of profile.contradictionInsights.slice(1)) {
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
    y = drawGoldInsight(doc, `최고의 궁합 유형: ${profile.bestMatch.join(', ')}`, y, contentW);
    y = drawTags(doc, profile.bestMatch, y, 'rose');
  }

  // ═══════════════════════════════════════════
  // 🎁 프리미엄 전용: 16유형 궁합 매트릭스
  // ═══════════════════════════════════════════
  y = drawCompatibilityMatrix(doc, result.mbti.type as MbtiType, y, contentW);

  // ═══════════════════════════════════════════
  // 커리어 전략
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '커리어 전략', y);
  y = drawBody(doc, profile.careerGuide, y, contentW);

  if (profile.careers.length > 0) {
    y = drawGoldInsight(doc, `추천 직업군: ${profile.careers.slice(0, 5).join(', ')}`, y, contentW);
    y = drawTags(doc, profile.careers, y, 'teal');
  }

  // ═══════════════════════════════════════════
  // 🎁 프리미엄 전용: Career Suite (50 직업 정밀 분석)
  // ═══════════════════════════════════════════
  y = drawCareerSuite(doc, result.mbti.type as MbtiType, y, contentW);

  // ═══════════════════════════════════════════
  // 스트레스 & 성장
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '스트레스 패턴 (Grip 상태)', y);
  y = drawBody(doc, profile.gripStressNarrative, y, contentW);
  y = drawGoldInsight(doc, `핵심: 스트레스 상황에서 평소와 다른 모습이 나타나는 것은 자연스러운 현상입니다. 자신의 패턴을 인식하는 것이 회복의 첫걸음입니다.`, y, contentW);

  // ═══════════════════════════════════════════
  // 🎁 프리미엄 전용: 스트레스 조기 경보 체크리스트
  // ═══════════════════════════════════════════
  y = drawStressChecklist(doc, result.mbti.type as MbtiType, y, contentW);

  y = drawSectionHeader(doc, '회복 & 성장 전략', y);
  y = drawBody(doc, profile.stressGuide, y, contentW);

  y = drawSectionHeader(doc, '인생 전략', y);
  y = drawBoldAccent(doc, `${result.fullCode} 유형의 인생 전략 핵심`, y, contentW);
  y = drawBody(doc, profile.lifeStrategy, y, contentW);

  // ═══════════════════════════════════════════
  // 🎁 프리미엄 전용: 30일 성장 액션 플랜
  // ═══════════════════════════════════════════
  y = drawGrowthPlan(doc, result.mbti.type as MbtiType, y, contentW);

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
  y = drawGoldInsight(doc, `성장의 핵심: 그림자를 억누르는 것이 아니라, 인식하고 통합하는 것이 진정한 성숙입니다.`, y, contentW);
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
  // 🎁 프리미엄 전용: 192 조합 고유 심층 분석
  // ═══════════════════════════════════════════
  y = drawCombinationAnalysis(
    doc,
    result.mbti.type as MbtiType,
    result.temperament.code as ComboCode,
    y,
    contentW,
  );

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
  doc.text('16가지 성격 유형 인지기능 + 히포크라테스 4기질론 기반 통합 분석', cx, y, { align: 'center' });
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

  // 모바일/데스크톱 호환 다운로드
  const fileName = `192types-${result.fullCode}-report.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  // iOS Safari 감지
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isIOS || isSafari) {
    // iOS Safari: 새 탭에서 PDF 열기 (사용자가 직접 저장)
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      // 팝업 차단 시 fallback: 현재 탭에서 열기
      window.location.href = url;
    }
  } else {
    // 일반 브라우저: 다운로드 링크 클릭
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 메모리 정리 (약간 지연)
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
