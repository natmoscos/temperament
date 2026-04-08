'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: '검사하기', href: '/test' },
  { label: '빠른 검사', href: '/quick-test' },
  {
    label: '성격유형',
    href: '/types',
    children: [
      { group: '분석가형', items: [
        { label: 'INTJ 전략의 설계자', href: '/types/intj' },
        { label: 'INTP 논리의 사색가', href: '/types/intp' },
        { label: 'ENTJ 대담한 통솔자', href: '/types/entj' },
        { label: 'ENTP 발명의 토론가', href: '/types/entp' },
      ]},
      { group: '외교관형', items: [
        { label: 'INFJ 통찰의 예언자', href: '/types/infj' },
        { label: 'INFP 이상의 중재자', href: '/types/infp' },
        { label: 'ENFJ 정의의 선도자', href: '/types/enfj' },
        { label: 'ENFP 열정의 캠페이너', href: '/types/enfp' },
      ]},
      { group: '관리자형', items: [
        { label: 'ISTJ 신뢰의 수호자', href: '/types/istj' },
        { label: 'ISFJ 따뜻한 수호자', href: '/types/isfj' },
        { label: 'ESTJ 엄격한 관리자', href: '/types/estj' },
        { label: 'ESFJ 사교의 외교관', href: '/types/esfj' },
      ]},
      { group: '탐험가형', items: [
        { label: 'ISTP 냉철한 장인', href: '/types/istp' },
        { label: 'ISFP 호기심 많은 예술가', href: '/types/isfp' },
        { label: 'ESTP 모험의 사업가', href: '/types/estp' },
        { label: 'ESFP 자유로운 연예인', href: '/types/esfp' },
      ]},
    ],
  },
  { label: '기질론', href: '/temperaments' },
  { label: '궁합', href: '/compatibility' },
  { label: '오픈채팅', href: '/community' },
  { label: '블로그', href: '/blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [typesOpen, setTypesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-sm text-white font-black">T</span>
          </div>
          <span className="font-bold text-gray-800 hidden sm:inline">192 Temperament</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium"
              >
                {item.label}
                {item.children && (
                  <svg className="w-3.5 h-3.5 inline ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              {item.children && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-4 w-[520px]">
                    {item.children.map((group) => (
                      <div key={group.group}>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{group.group}</p>
                        {group.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-2 py-1.5 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/test"
            className="ml-3 px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            무료 검사
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          <Link href="/test" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg">검사하기</Link>
          <button
            onClick={() => setTypesOpen(!typesOpen)}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg flex justify-between items-center"
          >
            성격유형
            <svg className={`w-4 h-4 transition ${typesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {typesOpen && navItems[1].children?.map((group) => (
            <div key={group.group} className="pl-4">
              <p className="text-xs font-semibold text-gray-400 mt-2 mb-1">{group.group}</p>
              {group.items.map((sub) => (
                <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen(false)} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600">
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/temperaments" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg">기질론</Link>
          <Link href="/compatibility" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg">궁합</Link>
          <Link href="/community" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg">커뮤니티</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg">블로그</Link>
        </div>
      )}
    </nav>
  );
}
