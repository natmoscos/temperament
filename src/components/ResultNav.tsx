'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/result', label: '요약', icon: '🏠' },
  { href: '/result/personality', label: '성격', icon: '🪞' },
  { href: '/result/love', label: '연애', icon: '❤️' },
  { href: '/result/career', label: '커리어', icon: '🚀' },
  { href: '/result/stress', label: '성장', icon: '🌱' },
  { href: '/result/science', label: '과학', icon: '🔬' },
  { href: '/compatibility', label: '궁합', icon: '💘' },
];

export default function ResultNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-[60px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-2">
        <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
