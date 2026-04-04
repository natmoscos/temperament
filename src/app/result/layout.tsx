'use client';

import ResultNav from '@/components/ResultNav';

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ResultNav />
      <div className="py-8 px-4">
        {children}
      </div>
    </div>
  );
}
