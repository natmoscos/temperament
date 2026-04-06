'use client';

import jsPDF from 'jspdf';
import { TestResult } from '@/data/types';
import { IntegratedProfile } from '@/data/profiles-integrated';

/**
 * 프리미엄 PDF 보고서 생성
 * NanumGothic 한글 폰트를 로드하여 한글이 깨지지 않는 PDF 생성
 */

// 폰트 캐시 (한 세션에서 한 번만 로드 — base64 문자열로 캐시)
let fontBase64Regular: string | null = null;
let fontBase64Bold: string | null = null;

// Google Fonts CDN에서 TTF 직접 로드 (CORS 지원, 안정적)
const FONT_URL_REGULAR = 'https://fonts.gstatic.com/s/nanumgothic/v26/PN_3Rfi-oW3hYwmKDpxS7F_z_g.ttf';
const FONT_URL_BOLD = 'https://fonts.gstatic.com/s/nanumgothic/v26/PN_oRfi-oW3hYwmKDpxS7F_LQv37zg.ttf';

async function loadFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load font: ${url} (${response.status})`);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // 청크 방식 base64 변환 (대용량 폰트 파일 안전 처리)
  const CHUNK_SIZE = 8192;
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, Math.min(i + CHUNK_SIZE, bytes.length));
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

async function setupKoreanFont(doc: jsPDF): Promise<void> {
  // 병렬로 두 폰트 동시 로드 (캐시된 경우 즉시 반환)
  const [regular, bold] = await Promise.all([
    fontBase64Regular ? Promise.resolve(fontBase64Regular) : loadFontAsBase64(FONT_URL_REGULAR),
    fontBase64Bold ? Promise.resolve(fontBase64Bold) : loadFontAsBase64(FONT_URL_BOLD),
  ]);

  // 캐시에 저장
  fontBase64Regular = regular;
  fontBase64Bold = bold;

  doc.addFileToVFS('NanumGothic-Regular.ttf', regular);
  doc.addFont('NanumGothic-Regular.ttf', 'NanumGothic', 'normal');

  doc.addFileToVFS('NanumGothic-Bold.ttf', bold);
  doc.addFont('NanumGothic-Bold.ttf', 'NanumGothic', 'bold');

  doc.setFont('NanumGothic', 'normal');
}

// 한글 줄바꿈 유틸리티
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');

  for (const para of paragraphs) {
    if (para.trim() === '') {
      lines.push('');
      continue;
    }
    const wrapped = doc.splitTextToSize(para, maxWidth) as string[];
    lines.push(...wrapped);
  }
  return lines;
}

// 새 페이지 필요 시 추가
function ensureSpace(doc: jsPDF, y: number, needed: number, margin: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - margin) {
    doc.addPage();
    return margin + 10;
  }
  return y;
}

// 섹션 헤더
function drawSectionHeader(doc: jsPDF, title: string, y: number, margin: number): number {
  y = ensureSpace(doc, y, 20, margin);
  doc.setFillColor(99, 102, 241); // indigo-500
  doc.rect(margin, y, 4, 14, 'F');
  doc.setFont('NanumGothic', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 30, 30);
  doc.text(title, margin + 10, y + 10);
  doc.setFont('NanumGothic', 'normal');
  return y + 22;
}

// 본문 텍스트
function drawBody(doc: jsPDF, text: string, y: number, margin: number, contentWidth: number): number {
  doc.setFont('NanumGothic', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(80, 80, 80);
  const lines = wrapText(doc, text, contentWidth);

  for (const line of lines) {
    y = ensureSpace(doc, y, 6, margin);
    if (line === '') {
      y += 4;
      continue;
    }
    doc.text(line, margin + 4, y);
    y += 5;
  }
  return y + 4;
}

// 태그 목록
function drawTags(doc: jsPDF, tags: string[], y: number, margin: number): number {
  y = ensureSpace(doc, y, 10, margin);
  doc.setFont('NanumGothic', 'normal');
  let x = margin + 4;

  for (const tag of tags) {
    const tagWidth = doc.getTextWidth(tag) + 8;
    if (x + tagWidth > 190) {
      x = margin + 4;
      y += 8;
      y = ensureSpace(doc, y, 10, margin);
    }
    doc.setFillColor(238, 242, 255); // indigo-50
    doc.roundedRect(x, y - 4, tagWidth, 7, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(99, 102, 241);
    doc.text(tag, x + 4, y);
    x += tagWidth + 4;
  }
  return y + 12;
}

// 퍼센티지 바
function drawPercentBar(
  doc: jsPDF,
  leftLabel: string,
  rightLabel: string,
  percentage: number,
  y: number,
  margin: number,
  contentWidth: number
): number {
  y = ensureSpace(doc, y, 14, margin);
  const barX = margin + 4;
  const barWidth = contentWidth - 8;
  const barHeight = 6;

  // 라벨
  doc.setFont('NanumGothic', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`${leftLabel} ${percentage}%`, barX, y);
  if (rightLabel) {
    doc.text(`${100 - percentage}% ${rightLabel}`, barX + barWidth, y, { align: 'right' });
  }
  y += 4;

  // 배경
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(barX, y, barWidth, barHeight, 2, 2, 'F');

  // 채움
  doc.setFillColor(99, 102, 241);
  const fillW = (barWidth * percentage) / 100;
  if (fillW > 0) {
    doc.roundedRect(barX, y, Math.max(fillW, 4), barHeight, 2, 2, 'F');
  }

  return y + barHeight + 6;
}

export async function generatePremiumPDF(result: TestResult, profile: IntegratedProfile): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ═══ 한글 폰트 로드 ═══
  await setupKoreanFont(doc);

  // ═══════════════════════════════════════════
  // 표지
  // ═══════════════════════════════════════════
  // 배경 (상단)
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, pageWidth, 120, 'F');
  doc.setFillColor(124, 58, 237); // purple-600
  doc.rect(0, 80, pageWidth, 40, 'F');

  // 제목
  doc.setFont('NanumGothic', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 255);
  doc.text('192 성격 유형 프리미엄 분석 보고서', pageWidth / 2, 35, { align: 'center' });

  doc.setFont('NanumGothic', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text(result.fullCode, pageWidth / 2, 60, { align: 'center' });

  doc.setFont('NanumGothic', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(220, 220, 255);
  doc.text(`${profile.mbtiEmoji} ${profile.mbtiNickname}`, pageWidth / 2, 75, { align: 'center' });

  doc.setFont('NanumGothic', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 255);
  doc.text(profile.temperamentNickname, pageWidth / 2, 85, { align: 'center' });

  // 인지기능 & 인구비율
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 255);
  doc.text(`인지기능: ${profile.cognitiveStack}`, pageWidth / 2, 100, { align: 'center' });
  doc.text(`인구 비율: ${profile.population}`, pageWidth / 2, 108, { align: 'center' });

  // 하단 안내
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('MBTI + 히포크라테스 기질론 통합 분석 보고서', pageWidth / 2, 140, { align: 'center' });
  doc.text('192types.com', pageWidth / 2, 148, { align: 'center' });

  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text(`발행일: ${today}`, pageWidth / 2, 160, { align: 'center' });

  // ═══════════════════════════════════════════
  // 페이지 2: 성향 분석 차트
  // ═══════════════════════════════════════════
  doc.addPage();
  y = margin + 5;

  y = drawSectionHeader(doc, 'MBTI 성향 분석', y, margin);

  const axisLabels: Record<string, [string, string]> = {
    EI: ['외향 (E)', '내향 (I)'],
    SN: ['직관 (N)', '감각 (S)'],
    TF: ['감정 (F)', '사고 (T)'],
    JP: ['인식 (P)', '판단 (J)'],
  };

  for (const axis of ['EI', 'SN', 'TF', 'JP'] as const) {
    const d = result.mbti.axes[axis];
    const lb = axisLabels[axis];
    y = drawPercentBar(doc, lb[0], lb[1], d.percentage, y, margin, contentWidth);
  }

  y += 6;
  y = drawSectionHeader(doc, '기질 분포', y, margin);

  const tempNames: Record<string, string> = { S: '다혈질', C: '담즙질', P: '점액질', M: '우울질' };
  for (const t of ['S', 'C', 'P', 'M'] as const) {
    const d = result.temperament.all[t];
    const isPrimary = result.temperament.primary.type === t;
    const isSecondary = result.temperament.secondary.type === t;
    const label = `${tempNames[t]}${isPrimary ? ' (주 기질)' : isSecondary ? ' (보조 기질)' : ''}`;
    y = drawPercentBar(doc, label, '', d.percentage, y, margin, contentWidth);
  }

  // 신뢰도
  y += 4;
  doc.setFont('NanumGothic', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const gradeText = result.reliability.grade === 'A' ? '높음' : result.reliability.grade === 'B' ? '보통' : '낮음';
  doc.text(`검사 신뢰도: ${result.reliability.grade}등급 (${gradeText})`, margin + 4, y);
  y += 10;

  // ═══════════════════════════════════════════
  // 성격 심층 분석
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '성격 심층 분석', y, margin);
  y = drawBody(doc, profile.personalityNarrative, y, margin, contentWidth);

  // 모순 인사이트
  if (profile.contradictionInsights.length > 0) {
    y = drawSectionHeader(doc, '숨겨진 모순', y, margin);
    for (const insight of profile.contradictionInsights) {
      y = drawBody(doc, `• ${insight}`, y, margin, contentWidth);
    }
  }

  // 숨겨진 자아
  y = drawSectionHeader(doc, '숨겨진 자아', y, margin);
  y = drawBody(doc, profile.hiddenSelf, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 연애 분석
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '연애 & 관계', y, margin);
  y = drawBody(doc, profile.loveNarrative, y, margin, contentWidth);

  if (profile.bestMatch.length > 0) {
    y = ensureSpace(doc, y, 16, margin);
    doc.setFont('NanumGothic', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('최고 궁합 유형:', margin + 4, y);
    doc.setFont('NanumGothic', 'normal');
    y += 6;
    y = drawTags(doc, profile.bestMatch, y, margin);
  }

  // ═══════════════════════════════════════════
  // 커리어 전략
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '커리어 전략', y, margin);
  y = drawBody(doc, profile.careerGuide, y, margin, contentWidth);

  if (profile.careers.length > 0) {
    y = ensureSpace(doc, y, 16, margin);
    doc.setFont('NanumGothic', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('추천 직업:', margin + 4, y);
    doc.setFont('NanumGothic', 'normal');
    y += 6;
    y = drawTags(doc, profile.careers, y, margin);
  }

  // ═══════════════════════════════════════════
  // 스트레스 & 성장
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '스트레스 패턴 (Grip 상태)', y, margin);
  y = drawBody(doc, profile.gripStressNarrative, y, margin, contentWidth);

  y = drawSectionHeader(doc, '회복 & 성장 전략', y, margin);
  y = drawBody(doc, profile.stressGuide, y, margin, contentWidth);

  y = drawSectionHeader(doc, '인생 전략', y, margin);
  y = drawBody(doc, profile.lifeStrategy, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 소통 & 양육
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '소통 스타일', y, margin);
  y = drawBody(doc, profile.communicationGuide, y, margin, contentWidth);

  y = drawSectionHeader(doc, '양육 인사이트', y, margin);
  y = drawBody(doc, profile.parentingInsight, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 기질 약점 & 성장 포인트
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '그림자 & 성장 포인트', y, margin);
  y = drawBody(doc, profile.weaknessInsight, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 과학적 근거
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, '과학적 근거', y, margin);

  doc.setFont('NanumGothic', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  y = ensureSpace(doc, y, 8, margin);
  doc.text('Eysenck 모델:', margin + 4, y);
  doc.setFont('NanumGothic', 'normal');
  y += 5;
  y = drawBody(doc, profile.eysenckInsight, y, margin, contentWidth);

  doc.setFont('NanumGothic', 'bold');
  y = ensureSpace(doc, y, 8, margin);
  doc.text('신경과학 (Helen Fisher):', margin + 4, y);
  doc.setFont('NanumGothic', 'normal');
  y += 5;
  y = drawBody(doc, profile.neuroscienceInsight, y, margin, contentWidth);

  doc.setFont('NanumGothic', 'bold');
  y = ensureSpace(doc, y, 8, margin);
  doc.text('4체액설:', margin + 4, y);
  doc.setFont('NanumGothic', 'normal');
  y += 5;
  y = drawBody(doc, profile.humorTheoryInsight, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 유명인
  // ═══════════════════════════════════════════
  if (profile.celebrities.length > 0) {
    y = drawSectionHeader(doc, '같은 유형의 유명인', y, margin);
    y = drawTags(doc, profile.celebrities, y, margin);
  }

  // ═══════════════════════════════════════════
  // 마지막 페이지: 푸터
  // ═══════════════════════════════════════════
  y = ensureSpace(doc, y, 30, margin);
  y += 10;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFont('NanumGothic', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text('이 보고서는 192 성격 유형 검사 (192types.com)에서 생성되었습니다.', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('MBTI 인지기능 + 히포크라테스 4기질론 기반 통합 분석', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text(`보고서 ID: ${result.fullCode}-${Date.now().toString(36).toUpperCase()}`, pageWidth / 2, y, { align: 'center' });

  // ═══════════════════════════════════════════
  // 페이지 번호
  // ═══════════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('NanumGothic', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`${i} / ${totalPages}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });
  }

  // 다운로드
  doc.save(`192types-${result.fullCode}-report.pdf`);
}
