import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '서비스 이용약관 — 192 성격 유형 검사',
  description: '192 성격 유형 검사(192types.com) 서비스 이용약관입니다.',
  alternates: {
    canonical: 'https://192types.com/terms',
  },
  openGraph: {
    title: '서비스 이용약관 — 192 성격 유형 검사',
    description: '192 성격 유형 검사 서비스 이용약관입니다.',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium mb-6 inline-block">
          ← 홈으로
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">서비스 이용약관</h1>
        <p className="text-sm text-gray-400 mb-8">시행일: 2026년 4월 11일</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8 text-[15px] text-gray-600 leading-[1.85]">

          {/* 제1조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제1조 (목적)</h2>
            <p>
              이 약관은 192 성격 유형 검사(이하 &ldquo;서비스&rdquo;)가 제공하는 인터넷 서비스(192types.com)의
              이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제2조 (용어의 정의)</h2>
            <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>
                <strong>&ldquo;서비스&rdquo;</strong>란 192 성격 유형 검사가 운영하는 웹사이트(192types.com) 및
                이를 통해 제공하는 일체의 콘텐츠와 기능을 말합니다.
              </li>
              <li>
                <strong>&ldquo;이용자&rdquo;</strong>란 이 약관에 따라 서비스를 이용하는 모든 사람을 말합니다.
              </li>
              <li>
                <strong>&ldquo;콘텐츠&rdquo;</strong>란 서비스 내에 게시된 텍스트, 이미지, 영상, 검사 문항, 유형 설명,
                블로그 글 등 일체의 정보를 말합니다.
              </li>
            </ol>
          </section>

          {/* 제3조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제3조 (약관의 효력 및 변경)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>이 약관은 서비스 웹사이트에 게시함으로써 효력이 발생합니다.</li>
              <li>
                서비스는 「전자상거래 등에서의 소비자 보호에 관한 법률」, 「약관의 규제에 관한 법률」 등
                관련 법령에 위배되지 않는 범위에서 이 약관을 변경할 수 있습니다.
              </li>
              <li>
                약관이 변경되는 경우 시행일 최소 7일 전에 서비스 내 공지를 통해 이용자에게 알립니다.
                다만, 이용자에게 불리한 변경의 경우 시행일 최소 30일 전에 공지합니다.
              </li>
              <li>
                이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.
                변경 공지 이후 계속해서 서비스를 이용하는 경우 변경 약관에 동의한 것으로 봅니다.
              </li>
            </ol>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제4조 (서비스의 내용)</h2>
            <p>서비스는 다음 기능을 제공합니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>MBTI × 기질론 기반 192가지 성격 유형 검사 (100문항 정밀 / 30문항 빠른 검사)</li>
              <li>유형 궁합 분석 서비스</li>
              <li>16가지 성격 유형 및 기질론 정보 제공</li>
              <li>유명인 성격 유형 프로필 및 투표</li>
              <li>성격 유형 관련 블로그 콘텐츠</li>
            </ul>
            <p className="mt-3">
              서비스는 무료로 제공되며, 서비스의 내용은 운영 정책에 따라 변경될 수 있습니다.
            </p>
          </section>

          {/* 제5조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제5조 (서비스의 제공 및 중단)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
              <li>
                서비스는 시스템 점검, 서버 증설 및 교체, 설비 장애, 서비스 개선 등의 사유로 서비스를
                일시 중단할 수 있습니다. 이 경우 사전에 공지하며, 불가피한 사유로 사전 공지가 어려운 경우
                사후에 공지합니다.
              </li>
              <li>
                서비스는 사업 종료, 기술적·경영상 이유 등으로 서비스 전체 또는 일부를 영구 중단할 수 있으며,
                이 경우 최소 30일 전에 공지합니다.
              </li>
              <li>
                서비스 중단으로 발생한 손해에 대해 서비스는 관련 법령이 정하는 범위 내에서만 책임을 부담합니다.
              </li>
            </ol>
          </section>

          {/* 제6조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제6조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ol className="list-decimal pl-5 mt-2 space-y-2">
              <li>서비스의 정보를 무단으로 수집·저장·활용하는 행위 (크롤링, 스크래핑 등)</li>
              <li>서비스 운영을 방해하거나 서비스에 장애를 유발할 우려가 있는 행위</li>
              <li>서비스의 콘텐츠를 무단으로 복제·배포·판매·수정하는 행위</li>
              <li>타인의 개인정보를 수집, 저장, 공개하는 행위</li>
              <li>허위 정보를 입력하거나 다른 사람의 명예를 훼손하는 행위</li>
              <li>기타 관련 법령 또는 이 약관에 위반되는 행위</li>
            </ol>
          </section>

          {/* 제7조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제7조 (지식재산권)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                서비스가 제공하는 검사 문항, 유형 설명, 블로그 글, 이미지, UI 디자인 등 모든 콘텐츠에 대한
                저작권 및 지식재산권은 서비스에 귀속됩니다.
              </li>
              <li>
                이용자는 서비스의 콘텐츠를 서비스 내에서 개인적인 목적으로만 이용할 수 있으며,
                서비스의 사전 서면 동의 없이 이를 복제, 전송, 출판, 배포, 방송 등의 방법으로 이용할 수 없습니다.
              </li>
              <li>
                이용자가 서비스 내에서 생성한 콘텐츠(투표 등)에 대한 책임은 해당 이용자에게 있습니다.
              </li>
            </ol>
          </section>

          {/* 제8조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제8조 (검사 결과의 한계 및 면책)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                서비스의 성격 유형 검사 결과는 학술적·교육적 참고 목적으로 제공되며,
                의학적·심리학적 진단이 아닙니다.
              </li>
              <li>
                검사 결과를 의료, 고용, 학업 선발, 법적 판단 등 중요한 의사결정의 근거로 사용하는 것을 권장하지 않으며,
                이로 인한 결과에 대해 서비스는 책임을 지지 않습니다.
              </li>
              <li>
                성격 유형 이론(MBTI, 기질론 등)은 지속적으로 연구되는 분야로, 서비스의 콘텐츠가
                모든 학술적 견해를 반영하지 않을 수 있습니다.
              </li>
            </ol>
          </section>

          {/* 제9조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제9조 (면책조항)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                서비스는 천재지변, 전쟁, 테러, 해킹, 인터넷 장애 등 불가항력적인 사유로 발생한
                서비스 중단에 대해 책임을 지지 않습니다.
              </li>
              <li>
                서비스는 이용자의 귀책 사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.
              </li>
              <li>
                서비스 내 링크를 통해 연결된 외부 사이트에 대해서는 책임을 지지 않습니다.
              </li>
              <li>
                서비스는 이용자가 서비스를 통해 기대하는 특정 성과나 결과를 보증하지 않습니다.
              </li>
            </ol>
          </section>

          {/* 제10조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제10조 (광고 및 외부 서비스)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                서비스는 Google AdSense를 통한 광고를 게재할 수 있습니다.
                광고 콘텐츠는 Google의 정책에 따라 표시되며, 서비스는 광고 내용에 대해 책임을 지지 않습니다.
              </li>
              <li>
                이용자는 서비스 내 광고를 클릭하거나 외부 링크를 통해 이동한 사이트에서 발생하는 거래 등에 대해
                서비스와는 무관하게 해당 사업자와 직접 처리하여야 합니다.
              </li>
            </ol>
          </section>

          {/* 제11조 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">제11조 (준거법 및 관할 법원)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>이 약관의 해석 및 서비스 이용과 관련한 분쟁에 대해서는 대한민국 법률을 적용합니다.</li>
              <li>
                서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우,
                민사소송법에 따른 관할 법원을 제1심 관할 법원으로 합니다.
              </li>
            </ol>
          </section>

          {/* 부칙 */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3">부칙</h2>
            <div className="p-3 bg-indigo-50 rounded-lg text-sm text-indigo-700">
              <p>이 약관은 <strong>2026년 4월 11일</strong>부터 시행합니다.</p>
            </div>
          </section>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-300 space-y-1">
          <p>최종 수정: 2026년 4월 11일</p>
          <p>
            <Link href="/privacy" className="hover:text-gray-400 transition">개인정보처리방침</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
