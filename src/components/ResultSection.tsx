'use client';

export function Section({ icon, title, subtitle, children, accent }: { icon: string; title: string; subtitle?: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 ${accent ?? ''}`}>
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><span className="text-2xl">{icon}</span>{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1 ml-9">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Paragraph({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split('\n\n').map((p, i) => (
        <p key={i} className="text-gray-600 leading-[1.85] text-[15px]">{p}</p>
      ))}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
    </div>
  );
}

export function NextPageCTA({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) {
  return (
    <a
      href={href}
      className="block mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 hover:shadow-md transition group"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-indigo-500 font-medium mb-1">다음으로 읽기</p>
          <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>{icon}</span> {title}
          </p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <span className="text-2xl text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
  );
}
