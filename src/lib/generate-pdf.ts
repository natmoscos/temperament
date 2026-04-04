'use client';

import jsPDF from 'jspdf';
import { TestResult } from '@/data/types';
import { IntegratedProfile } from '@/data/profiles-integrated';

/**
 * 프리미엄 PDF 보고서 생성
 * 클라이언트 사이드에서 jsPDF로 직접 생성 (서버 불필요)
 */

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
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  doc.text(title, margin + 10, y + 10);
  return y + 22;
}

// 본문 텍스트
function drawBody(doc: jsPDF, text: string, y: number, margin: number, contentWidth: number): number {
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const lines = wrapText(doc, text, contentWidth);

  for (const line of lines) {
    y = ensureSpace(doc, y, 6, margin);
    if (line === '') {
      y += 4;
      continue;
    }
    doc.text(line, margin + 4, y);
    y += 5.5;
  }
  return y + 4;
}

// 태그 목록
function drawTags(doc: jsPDF, tags: string[], y: number, margin: number): number {
  y = ensureSpace(doc, y, 10, margin);
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
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`${leftLabel} ${percentage}%`, barX, y);
  doc.text(`${100 - percentage}% ${rightLabel}`, barX + barWidth, y, { align: 'right' });
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

  // ═══════════════════════════════════════════
  // 표지
  // ═══════════════════════════════════════════
  // 배경 그라데이션 (상단)
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 0, pageWidth, 120, 'F');
  doc.setFillColor(124, 58, 237); // purple-600
  doc.rect(0, 80, pageWidth, 40, 'F');

  // 제목
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 255);
  doc.text('192 Personality Type Report', pageWidth / 2, 35, { align: 'center' });

  doc.setFontSize(36);
  doc.setTextColor(255, 255, 255);
  doc.text(result.fullCode, pageWidth / 2, 60, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(220, 220, 255);
  doc.text(`${profile.mbtiEmoji} ${profile.mbtiNickname}`, pageWidth / 2, 75, { align: 'center' });

  doc.setFontSize(11);
  doc.setTextColor(200, 200, 255);
  doc.text(profile.temperamentNickname, pageWidth / 2, 85, { align: 'center' });

  // 인지기능 & 인구비율
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 255);
  doc.text(`Cognitive Stack: ${profile.cognitiveStack}`, pageWidth / 2, 100, { align: 'center' });
  doc.text(`Population: ${profile.population}`, pageWidth / 2, 108, { align: 'center' });

  // 하단 안내
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Premium Personality Analysis Report', pageWidth / 2, 140, { align: 'center' });
  doc.text('192types.com', pageWidth / 2, 148, { align: 'center' });

  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text(`Generated: ${today}`, pageWidth / 2, 160, { align: 'center' });

  // ═══════════════════════════════════════════
  // 페이지 2: 성향 분석 차트
  // ═══════════════════════════════════════════
  doc.addPage();
  y = margin + 5;

  y = drawSectionHeader(doc, 'MBTI Analysis', y, margin);

  const axisLabels: Record<string, [string, string]> = {
    EI: ['Extraversion (E)', 'Introversion (I)'],
    SN: ['Intuition (N)', 'Sensing (S)'],
    TF: ['Feeling (F)', 'Thinking (T)'],
    JP: ['Perceiving (P)', 'Judging (J)'],
  };

  for (const axis of ['EI', 'SN', 'TF', 'JP'] as const) {
    const d = result.mbti.axes[axis];
    const lb = axisLabels[axis];
    y = drawPercentBar(doc, lb[0], lb[1], d.percentage, y, margin, contentWidth);
  }

  y += 6;
  y = drawSectionHeader(doc, 'Temperament Distribution', y, margin);

  const tempNames: Record<string, string> = { S: 'Sanguine', C: 'Choleric', P: 'Phlegmatic', M: 'Melancholic' };
  for (const t of ['S', 'C', 'P', 'M'] as const) {
    const d = result.temperament.all[t];
    const isPrimary = result.temperament.primary.type === t;
    const isSecondary = result.temperament.secondary.type === t;
    const label = `${tempNames[t]}${isPrimary ? ' (Primary)' : isSecondary ? ' (Secondary)' : ''}`;
    y = drawPercentBar(doc, label, '', d.percentage, y, margin, contentWidth);
  }

  // 신뢰도
  y += 4;
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const gradeText = result.reliability.grade === 'A' ? 'High' : result.reliability.grade === 'B' ? 'Moderate' : 'Low';
  doc.text(`Reliability: Grade ${result.reliability.grade} (${gradeText})`, margin + 4, y);
  y += 10;

  // ═══════════════════════════════════════════
  // 페이지 3: 성격 심층 분석
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Personality Deep Dive', y, margin);
  y = drawBody(doc, profile.personalityNarrative, y, margin, contentWidth);

  // 모순 인사이트
  if (profile.contradictionInsights.length > 0) {
    y = drawSectionHeader(doc, 'Hidden Contradictions', y, margin);
    for (const insight of profile.contradictionInsights) {
      y = drawBody(doc, `• ${insight}`, y, margin, contentWidth);
    }
  }

  // 숨겨진 자아
  y = drawSectionHeader(doc, 'Hidden Self', y, margin);
  y = drawBody(doc, profile.hiddenSelf, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 연애 분석
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Love & Relationships', y, margin);
  y = drawBody(doc, profile.loveNarrative, y, margin, contentWidth);

  if (profile.bestMatch.length > 0) {
    y = ensureSpace(doc, y, 16, margin);
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('Best Match Types:', margin + 4, y);
    y += 6;
    y = drawTags(doc, profile.bestMatch, y, margin);
  }

  // ═══════════════════════════════════════════
  // 커리어 전략
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Career Strategy', y, margin);
  y = drawBody(doc, profile.careerGuide, y, margin, contentWidth);

  if (profile.careers.length > 0) {
    y = ensureSpace(doc, y, 16, margin);
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text('Recommended Careers:', margin + 4, y);
    y += 6;
    y = drawTags(doc, profile.careers, y, margin);
  }

  // ═══════════════════════════════════════════
  // 스트레스 & 성장
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Stress Pattern (Grip)', y, margin);
  y = drawBody(doc, profile.gripStressNarrative, y, margin, contentWidth);

  y = drawSectionHeader(doc, 'Recovery & Growth', y, margin);
  y = drawBody(doc, profile.stressGuide, y, margin, contentWidth);

  y = drawSectionHeader(doc, 'Life Strategy', y, margin);
  y = drawBody(doc, profile.lifeStrategy, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 소통 & 양육
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Communication Style', y, margin);
  y = drawBody(doc, profile.communicationGuide, y, margin, contentWidth);

  y = drawSectionHeader(doc, 'Parenting Insight', y, margin);
  y = drawBody(doc, profile.parentingInsight, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 기질 약점 & 성장 포인트
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Shadow Side & Growth', y, margin);
  y = drawBody(doc, profile.weaknessInsight, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 과학적 근거
  // ═══════════════════════════════════════════
  y = drawSectionHeader(doc, 'Scientific Basis', y, margin);

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  y = ensureSpace(doc, y, 8, margin);
  doc.text('Eysenck Model:', margin + 4, y);
  y += 5;
  y = drawBody(doc, profile.eysenckInsight, y, margin, contentWidth);

  y = ensureSpace(doc, y, 8, margin);
  doc.text('Neuroscience (Helen Fisher):', margin + 4, y);
  y += 5;
  y = drawBody(doc, profile.neuroscienceInsight, y, margin, contentWidth);

  y = ensureSpace(doc, y, 8, margin);
  doc.text('Humor Theory:', margin + 4, y);
  y += 5;
  y = drawBody(doc, profile.humorTheoryInsight, y, margin, contentWidth);

  // ═══════════════════════════════════════════
  // 유명인
  // ═══════════════════════════════════════════
  if (profile.celebrities.length > 0) {
    y = drawSectionHeader(doc, 'Famous People Like You', y, margin);
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

  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text('This report was generated by 192 Personality Type Test (192types.com)', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('Based on MBTI cognitive functions and Hippocrates Four Temperaments theory.', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text(`Report ID: ${result.fullCode}-${Date.now().toString(36).toUpperCase()}`, pageWidth / 2, y, { align: 'center' });

  // ═══════════════════════════════════════════
  // 페이지 번호
  // ═══════════════════════════════════════════
  const totalPages = doc.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`${i} / ${totalPages}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });
  }

  // 다운로드
  doc.save(`192types-${result.fullCode}-report.pdf`);
}
