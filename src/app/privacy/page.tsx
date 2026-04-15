import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침 — 192 성격 유형 검사',
  description: '192 성격 유형 검사(192types.com) 서비스의 개인정보처리방침입니다.',
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

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">개인정보처리방침</h1>
        <p className="text-sm text-gray-400 mb-8">시행일: 2026년 4월 11일</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8 text-[15px] text-gray-600 leading-[1.85]">

          <p>
            192 성격 유형 검사(이하 &ldquo;서비스&rdquo; 또는 &ldquo;회사&rdquo;)는
            「개인정보 보호법」 및 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」에 따라
            이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하게 처리하기 위하여
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          {/* 제1조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제1조 (개인정보의 수집·이용 목적)</h2>
            <p>서비스는 다음 목적으로 개인정보를 수집·이용합니다. 수집한 정보는 아래 목적 외 다른 용도로 사용하지 않으며, 목적이 변경될 경우 사전 동의를 받겠습니다.</p>
            <table className="w-full mt-3 text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">목적</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">상세 내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">서비스 제공</td>
                  <td className="p-2 border border-gray-200">성격 유형 검사 결과 산출 및 제공</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200">통계 분석</td>
                  <td className="p-2 border border-gray-200">비식별 방문 통계, 서비스 품질 개선</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">맞춤형 광고</td>
                  <td className="p-2 border border-gray-200">Google AdSense를 통한 관심 기반 광고 제공</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제2조 (수집하는 개인정보 항목 및 수집 방법)</h2>
            <p>서비스는 <strong>회원가입을 요구하지 않으며</strong>, 아래 정보만을 처리합니다.</p>

            <h3 className="font-semibold text-gray-700 mt-4 mb-2">① 이용자가 직접 입력하는 정보</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>검사 응답 데이터</strong>: 이용자의 기기 브라우저(localStorage)에만 저장됩니다. 서버로 전송되지 않으며, 회사는 이를 수집하지 않습니다.</li>
              <li><strong>투표 데이터</strong>: 프로필 유형 투표 시 선택 내용을 데이터베이스에 저장합니다. 별도의 로그인 없이 처리되므로 개인을 특정할 수 없는 형태로 저장됩니다.</li>
            </ul>

            <h3 className="font-semibold text-gray-700 mt-4 mb-2">② 서비스 이용 과정에서 자동으로 수집되는 정보</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP 주소, 브라우저 종류 및 버전, 운영체제, 접속 일시, 방문 페이지</li>
              <li>쿠키 및 유사 추적 기술(아래 제7조 참조)</li>
            </ul>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제3조 (개인정보의 보유·이용 기간)</h2>
            <table className="w-full mt-2 text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">항목</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">보유 기간</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">파기 방법</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">검사 응답 데이터</td>
                  <td className="p-2 border border-gray-200">이용자가 브라우저 데이터 삭제 시 즉시</td>
                  <td className="p-2 border border-gray-200">브라우저 localStorage 삭제</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200">투표 데이터</td>
                  <td className="p-2 border border-gray-200">서비스 종료 시 또는 요청 시</td>
                  <td className="p-2 border border-gray-200">데이터베이스에서 영구 삭제</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">서버 접속 로그</td>
                  <td className="p-2 border border-gray-200">최대 1년</td>
                  <td className="p-2 border border-gray-200">자동 파기</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-gray-500">
              단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다
              (예: 전자상거래 등에서의 소비자 보호에 관한 법률에 따른 계약·청약 기록 5년 등).
            </p>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제4조 (개인정보의 제3자 제공)</h2>
            <p>서비스는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제5조 (개인정보 처리의 위탁)</h2>
            <p>서비스는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.</p>
            <table className="w-full mt-3 text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">수탁업체</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">위탁 업무</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold text-gray-700">보유·이용기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">Vercel Inc.</td>
                  <td className="p-2 border border-gray-200">웹 호스팅, CDN, 서버 로그 관리</td>
                  <td className="p-2 border border-gray-200">서비스 이용기간</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200">Supabase Inc.</td>
                  <td className="p-2 border border-gray-200">데이터베이스 관리(투표 등)</td>
                  <td className="p-2 border border-gray-200">서비스 이용기간</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Google LLC</td>
                  <td className="p-2 border border-gray-200">광고 서비스(AdSense), 방문 통계(Analytics)</td>
                  <td className="p-2 border border-gray-200">Google 정책에 따름</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-gray-500">
              위탁 계약 시 개인정보 보호 관련 법규 준수, 개인정보 안전관리 및 재위탁 제한 등의 내용을 계약서에 명시하고 있습니다.
            </p>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제6조 (정보주체의 권리·의무 및 행사 방법)</h2>
            <p>이용자(정보주체)는 서비스에 대해 언제든지 다음 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>열람 요구</strong>: 서비스가 보유한 본인의 개인정보 열람</li>
              <li><strong>정정·삭제 요구</strong>: 잘못된 개인정보 정정 또는 삭제</li>
              <li><strong>처리 정지 요구</strong>: 개인정보 처리의 정지</li>
              <li><strong>동의 철회</strong>: 마케팅 목적 처리에 대한 동의 철회</li>
            </ul>
            <p className="mt-3">
              권리 행사는 아래 개인정보 보호책임자 이메일로 요청하시면 지체 없이 조치하겠습니다.
              다만, 검사 응답 데이터는 서버에 저장되지 않으므로 이용자가 직접 브라우저 설정에서 삭제하실 수 있습니다.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              이용자는 개인정보보호위원회(privacy.go.kr, 국번없이 182) 또는 한국인터넷진흥원 개인정보침해 신고센터(privacy.kisa.or.kr, 118)에 분쟁 해결이나 상담을 신청할 수 있습니다.
            </p>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제7조 (쿠키 및 자동 수집 장치)</h2>
            <p>
              서비스는 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키(cookie)를 사용할 수 있습니다.
              쿠키는 웹사이트가 이용자의 브라우저에 전송하는 소량의 텍스트 파일로, 이용자의 컴퓨터에 저장됩니다.
            </p>
            <h3 className="font-semibold text-gray-700 mt-4 mb-2">① 쿠키 사용 목적</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>서비스 방문 통계 분석 (Google Analytics)</li>
              <li>이용자 관심사 기반 광고 제공 (Google AdSense)</li>
            </ul>
            <h3 className="font-semibold text-gray-700 mt-4 mb-2">② 쿠키 거부 방법</h3>
            <p>
              이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
              다만, 쿠키 저장을 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Chrome: 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터</li>
              <li>Safari: 설정 → Safari → 쿠키 및 웹사이트 데이터 차단</li>
              <li>Firefox: 설정 → 개인 정보 및 보안 → 쿠키 및 사이트 데이터</li>
            </ul>
            <p className="mt-3">
              Google 광고 쿠키에 대한 자세한 내용 및 수신 거부 방법은{' '}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                Google 광고 정책
              </a>을 참고하세요.
            </p>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제8조 (개인정보의 안전성 확보 조치)</h2>
            <p>서비스는 개인정보의 안전성 확보를 위해 다음 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>최소 수집 원칙</strong>: 서비스 제공에 꼭 필요한 정보만 수집</li>
              <li><strong>접근 통제</strong>: 개인정보 처리 시스템에 대한 접근 권한 제한</li>
              <li><strong>전송 보안</strong>: HTTPS 암호화 통신 적용</li>
              <li><strong>검사 데이터 분리</strong>: 검사 응답은 서버에 저장하지 않고 이용자 기기에만 저장</li>
            </ul>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제9조 (개인정보 보호책임자)</h2>
            <p>
              서비스는 개인정보 처리에 관한 업무를 총괄하고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제를 위하여
              개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm space-y-1">
              <p><strong>서비스명</strong>: 192 성격 유형 검사 (192types.com)</p>
              <p><strong>개인정보 보호책임자</strong>: 서비스 운영자</p>
              <p><strong>이메일</strong>: zx.mocz@gmail.com</p>
              <p className="text-gray-500 text-xs mt-2">
                개인정보 관련 문의에 대해 지체 없이 답변 및 처리해 드리겠습니다.
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              기타 개인정보 침해에 대한 신고나 상담은 아래 기관에 문의하실 수 있습니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>개인정보보호위원회: <a href="https://www.privacy.go.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">privacy.go.kr</a> / 국번없이 182</li>
              <li>개인정보 침해신고센터: <a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">privacy.kisa.or.kr</a> / 국번없이 118</li>
              <li>대검찰청 사이버수사과: <a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">spo.go.kr</a> / 국번없이 1301</li>
              <li>경찰청 사이버안전국: <a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">cyberbureau.police.go.kr</a> / 국번없이 182</li>
            </ul>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제10조 (개인정보처리방침의 변경)</h2>
            <p>
              본 개인정보처리방침은 법령, 정책 또는 서비스 내용의 변경에 따라 개정될 수 있습니다.
              방침이 변경되는 경우 서비스 내 공지사항 또는 해당 페이지를 통해 시행일 최소 7일 전에 안내합니다.
            </p>
            <div className="mt-3 p-3 bg-indigo-50 rounded-lg text-sm text-indigo-700">
              <p>현행 방침 시행일: <strong>2026년 4월 11일</strong></p>
            </div>
          </section>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-300 space-y-1">
          <p>최종 수정: 2026년 4월 11일</p>
          <p>
            <Link href="/terms" className="hover:text-gray-400 transition">서비스 이용약관</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
