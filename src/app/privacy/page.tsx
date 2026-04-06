import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '192 성격 유형 검사(192types.com) 서비스의 개인정보처리방침. 검사 데이터는 브라우저에만 저장되며 서버 전송 없음.',
  alternates: {
    canonical: 'https://192types.com/privacy',
  },
  openGraph: {
    title: '개인정보처리방침 — 192 성격 유형 검사',
    description: '192 성격 유형 검사 서비스의 개인정보처리방침입니다.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium mb-6 inline-block">
          ← 홈으로
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">개인정보처리방침</h1>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8 text-[15px] text-gray-600 leading-[1.85]">

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
            <p>
              192 성격 유형 검사(이하 &ldquo;서비스&rdquo;)는 사용자의 개인정보를 최소한으로 수집하며,
              수집된 정보는 다음 목적으로만 사용됩니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>성격 유형 검사 결과 제공</li>
              <li>서비스 이용 통계 분석 (비식별 데이터)</li>
              <li>서비스 품질 개선</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. 수집하는 개인정보 항목</h2>
            <p>본 서비스는 <strong>회원가입을 요구하지 않으며</strong>, 다음 정보만을 처리합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>검사 응답 데이터</strong>: 사용자의 브라우저(localStorage)에만 저장되며, 서버로 전송되지 않습니다.</li>
              <li><strong>자동 수집 정보</strong>: IP 주소, 브라우저 유형, 접속 시간 등 (웹 서버 로그 및 분석 도구)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <p>
              검사 응답 데이터는 사용자의 브라우저에만 저장되므로, 사용자가 브라우저 데이터를 삭제하면 즉시 파기됩니다.
              서버 로그는 통계 분석 목적으로 최대 1년간 보관 후 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. 개인정보의 제3자 제공</h2>
            <p>본 서비스는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외입니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>법령에 의해 요구되는 경우</li>
              <li>사용자가 사전에 동의한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. 광고 및 쿠키</h2>
            <p>
              본 서비스는 Google AdSense를 통한 광고를 게재할 수 있습니다.
              Google AdSense는 사용자의 관심사에 기반한 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Google의 광고 쿠키 사용에 대한 자세한 내용은{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  Google 광고 정책
                </a>을 참조하세요.
              </li>
              <li>사용자는 브라우저 설정에서 쿠키를 비활성화할 수 있습니다.</li>
              <li>Google Analytics를 사용하여 비식별화된 방문 통계를 수집할 수 있습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. 개인정보의 파기</h2>
            <p>
              본 서비스는 서버에 개인정보를 저장하지 않으므로, 별도의 파기 절차가 필요하지 않습니다.
              사용자는 언제든지 브라우저의 localStorage를 삭제하여 검사 데이터를 파기할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. 정보 주체의 권리</h2>
            <p>사용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>검사 데이터 삭제 (브라우저 데이터 초기화)</li>
              <li>쿠키 비활성화 (브라우저 설정)</li>
              <li>개인정보 관련 문의 (아래 연락처)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. 개인정보 보호책임자</h2>
            <p>
              개인정보 처리에 관한 문의는 아래 연락처로 보내주세요.
            </p>
            <div className="mt-2 p-4 bg-gray-50 rounded-xl text-sm">
              <p>서비스명: 192 성격 유형 검사</p>
              <p>이메일: zx.mocz@gmail.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. 방침 변경</h2>
            <p>
              본 개인정보처리방침은 2026년 4월 5일부터 적용됩니다.
              방침이 변경되는 경우 서비스 내 공지를 통해 안내합니다.
            </p>
          </section>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-300">
          <p>최종 수정: 2026년 4월 5일</p>
        </footer>
      </div>
    </div>
  );
}
