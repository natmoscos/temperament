// Seed an additional 50 profiles (batch 2) to the existing profiles table.
// Run AFTER seed-profiles.mjs has already run successfully.
//
// Usage:
//   node scripts/seed-profiles-batch2.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// 50 additional profiles focused on MBTI balance:
// - ISTJ, ESFJ (currently missing)
// - ISTP, ISFJ, ESTJ, ESFP, ENTJ (currently low)
const profiles = [
  // ── K-POP (15) ──
  {
    slug: 'blackpink-lisa',
    name_ko: '블랙핑크 리사',
    name_en: 'BLACKPINK Lisa',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '태국 출신의 글로벌 아이콘. 퍼포먼스 센터이자 솔로 활동에서도 주목받는 스타.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'SC',
  },
  {
    slug: 'blackpink-jisoo',
    name_ko: '블랙핑크 지수',
    name_en: 'BLACKPINK Jisoo',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '블랙핑크의 맏언니이자 상냥한 매력의 보컬리스트. 연기자로도 활동 중.',
    consensus_mbti: 'ISFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'newjeans-minji',
    name_ko: '뉴진스 민지',
    name_en: 'NewJeans Minji',
    category: 'kpop',
    subcategory: '아이돌 리더',
    thumbnail: null,
    description: '뉴진스의 리더. 차분한 카리스마와 안정적인 무대 장악력을 가진 멤버.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'newjeans-haerin',
    name_ko: '뉴진스 해린',
    name_en: 'NewJeans Haerin',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '고양이상 외모와 뚜렷한 자기 세계를 가진 뉴진스 비주얼.',
    consensus_mbti: 'INTP',
    consensus_temp: 'PM',
  },
  {
    slug: 'newjeans-danielle',
    name_ko: '뉴진스 다니엘',
    name_en: 'NewJeans Danielle',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '밝은 에너지의 호주 출신 멤버. 무대에서 자연스러운 해맑음을 보여줌.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SC',
  },
  {
    slug: 'ive-wonyoung',
    name_ko: '아이브 장원영',
    name_en: 'IVE Wonyoung',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '긍정 마인드의 대표 아이콘. "럭키비키" 화법으로 유명해진 슈퍼 비주얼.',
    consensus_mbti: 'ESFJ',
    consensus_temp: 'SC',
  },
  {
    slug: 'ive-yujin',
    name_ko: '아이브 안유진',
    name_en: 'IVE Yujin',
    category: 'kpop',
    subcategory: '아이돌 리더',
    thumbnail: null,
    description: '아이브의 리더. 카리스마와 친화력을 겸비한 멀티플레이어.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'SC',
  },
  {
    slug: 'aespa-karina',
    name_ko: '에스파 카리나',
    name_en: 'aespa Karina',
    category: 'kpop',
    subcategory: '아이돌 리더',
    thumbnail: null,
    description: '에스파의 리더. 독특한 비주얼과 압도적인 무대 존재감을 가진 멤버.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'SC',
  },
  {
    slug: 'twice-nayeon',
    name_ko: '트와이스 나연',
    name_en: 'TWICE Nayeon',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '트와이스의 맏언니이자 쾌활한 에너지의 메인 보컬.',
    consensus_mbti: 'ESFJ',
    consensus_temp: 'SC',
  },
  {
    slug: 'bts-jungkook',
    name_ko: 'BTS 정국',
    name_en: 'BTS Jungkook',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '방탄소년단의 막내이자 다재다능한 메인 보컬. 솔로 활동에서도 큰 성공.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'PM',
  },
  {
    slug: 'bts-v',
    name_ko: 'BTS 뷔',
    name_en: 'BTS V',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '방탄소년단의 비주얼. 독특한 감성과 창의적인 예술 세계를 지닌 멤버.',
    consensus_mbti: 'INFP',
    consensus_temp: 'PM',
  },
  {
    slug: 'bts-jimin',
    name_ko: 'BTS 지민',
    name_en: 'BTS Jimin',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '방탄소년단의 메인 댄서. 섬세한 감정 표현과 완벽주의로 유명.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'bts-jin',
    name_ko: 'BTS 진',
    name_en: 'BTS Jin',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '방탄소년단의 맏형. 유머와 따뜻한 리더십으로 팀을 챙기는 멤버.',
    consensus_mbti: 'INTP',
    consensus_temp: 'SC',
  },
  {
    slug: 'seventeen-woozi',
    name_ko: '세븐틴 우지',
    name_en: 'SEVENTEEN Woozi',
    category: 'kpop',
    subcategory: '아이돌 프로듀서',
    thumbnail: null,
    description: '세븐틴의 메인 프로듀서. 자체 제작 능력으로 그룹 사운드를 이끔.',
    consensus_mbti: 'ISTJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'gdragon',
    name_ko: '지드래곤',
    name_en: 'G-Dragon',
    category: 'kpop',
    subcategory: '래퍼/프로듀서',
    thumbnail: null,
    description: 'K-POP의 살아있는 전설. 빅뱅의 리더이자 패션/음악 아이콘.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SC',
  },

  // ── K-Drama / 한국 배우 (10) ──
  {
    slug: 'hyun-bin',
    name_ko: '현빈',
    name_en: 'Hyun Bin',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"시크릿 가든" "사랑의 불시착"으로 대표되는 한국 톱배우. 묵직한 카리스마.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'son-ye-jin',
    name_ko: '손예진',
    name_en: 'Son Ye-jin',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"멜로가 체질"의 감성 연기로 알려진 톱배우. 현빈의 배우자.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'gong-yoo',
    name_ko: '공유',
    name_en: 'Gong Yoo',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"도깨비" "오징어게임"으로 유명한 배우. 깊이 있는 감성 연기의 대명사.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'lee-min-ho',
    name_ko: '이민호',
    name_en: 'Lee Min-ho',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"꽃보다 남자" "상속자들"로 한류를 이끈 글로벌 스타.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'SC',
  },
  {
    slug: 'cha-eun-woo',
    name_ko: '차은우',
    name_en: 'Cha Eun-woo',
    category: 'kdrama',
    subcategory: '배우/아이돌',
    thumbnail: null,
    description: '아이돌 아스트로 멤버이자 배우. 비주얼의 정점으로 불리는 스타.',
    consensus_mbti: 'ISTP',
    consensus_temp: 'PM',
  },
  {
    slug: 'kim-soo-hyun',
    name_ko: '김수현',
    name_en: 'Kim Soo-hyun',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"해를 품은 달" "별에서 온 그대"의 주연. 섬세한 감정선의 대표 배우.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'jun-ji-hyun',
    name_ko: '전지현',
    name_en: 'Jun Ji-hyun',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"엽기적인 그녀" "별에서 온 그대"로 한류를 대표하는 톱배우.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CS',
  },
  {
    slug: 'song-hye-kyo',
    name_ko: '송혜교',
    name_en: 'Song Hye-kyo',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"가을동화" "태양의 후예" "더 글로리"의 주연. 한국 로맨스 드라마의 상징.',
    consensus_mbti: 'ISTJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'jung-hae-in',
    name_ko: '정해인',
    name_en: 'Jung Hae-in',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"밥 잘 사주는 예쁜 누나" "D.P."의 주연. 부드러운 이미지의 대표 배우.',
    consensus_mbti: 'ISFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'park-bo-gum',
    name_ko: '박보검',
    name_en: 'Park Bo-gum',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '"응답하라 1988" "남자친구"의 주연. 바른 이미지의 국민 남동생.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'PM',
  },

  // ── 글로벌 셀럽 (6) ──
  {
    slug: 'beyonce',
    name_ko: '비욘세',
    name_en: 'Beyoncé',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: null,
    description: '팝 여왕. 데스티니스 차일드부터 솔로까지 한 세대를 지배한 엔터테이너.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'rihanna',
    name_ko: '리한나',
    name_en: 'Rihanna',
    category: 'celebrity',
    subcategory: '가수/사업가',
    thumbnail: null,
    description: '팝스타에서 사업가로 변신. Fenty 브랜드로 뷰티 제국을 세움.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'CS',
  },
  {
    slug: 'ariana-grande',
    name_ko: '아리아나 그란데',
    name_en: 'Ariana Grande',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: null,
    description: '파워풀한 보컬을 자랑하는 미국 팝스타. "위키드" 등 뮤지컬/영화에도 출연.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'SC',
  },
  {
    slug: 'kim-kardashian',
    name_ko: '킴 카다시안',
    name_en: 'Kim Kardashian',
    category: 'celebrity',
    subcategory: '사업가/셀럽',
    thumbnail: null,
    description: '리얼리티 스타에서 출발해 뷰티/패션 제국을 세운 미국 셀러브리티.',
    consensus_mbti: 'ESTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'leonardo-dicaprio',
    name_ko: '레오나르도 디카프리오',
    name_en: 'Leonardo DiCaprio',
    category: 'celebrity',
    subcategory: '배우',
    thumbnail: null,
    description: '"타이타닉" "인셉션"의 주연. 환경운동가로도 활발히 활동.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'margot-robbie',
    name_ko: '마고 로비',
    name_en: 'Margot Robbie',
    category: 'celebrity',
    subcategory: '배우',
    thumbnail: null,
    description: '"바비" "월스트리트의 늑대"로 유명한 호주 출신 할리우드 스타.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SC',
  },

  // ── 스포츠 (5) ──
  {
    slug: 'michael-jordan',
    name_ko: '마이클 조던',
    name_en: 'Michael Jordan',
    category: 'athlete',
    subcategory: '농구',
    thumbnail: null,
    description: 'NBA 전설. 시카고 불스를 6회 우승으로 이끈 농구의 신.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'CS',
  },
  {
    slug: 'serena-williams',
    name_ko: '세레나 윌리엄스',
    name_en: 'Serena Williams',
    category: 'athlete',
    subcategory: '테니스',
    thumbnail: null,
    description: '그랜드슬램 23회 우승의 테니스 여제. 파워와 집중력의 상징.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CS',
  },
  {
    slug: 'roger-federer',
    name_ko: '로저 페더러',
    name_en: 'Roger Federer',
    category: 'athlete',
    subcategory: '테니스',
    thumbnail: null,
    description: '테니스 역사상 가장 우아한 선수로 평가받는 스위스의 신사.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'PM',
  },
  {
    slug: 'kylian-mbappe',
    name_ko: '킬리안 음바페',
    name_en: 'Kylian Mbappé',
    category: 'athlete',
    subcategory: '축구',
    thumbnail: null,
    description: '프랑스 축구 국가대표 에이스. 초고속 드리블의 대명사.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'CS',
  },
  {
    slug: 'neymar',
    name_ko: '네이마르',
    name_en: 'Neymar Jr.',
    category: 'athlete',
    subcategory: '축구',
    thumbnail: null,
    description: '브라질 축구의 슈퍼스타. 화려한 개인기의 상징.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'SC',
  },

  // ── 테크/기업가 (4) ──
  {
    slug: 'jeff-bezos',
    name_ko: '제프 베이조스',
    name_en: 'Jeff Bezos',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: '아마존 창업자이자 블루 오리진 CEO. 우주 사업을 확장 중.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'warren-buffett',
    name_ko: '워런 버핏',
    name_en: 'Warren Buffett',
    category: 'tech',
    subcategory: '투자자',
    thumbnail: null,
    description: '가치 투자의 전설. 버크셔 해서웨이를 세계적 기업으로 성장시킴.',
    consensus_mbti: 'ISTJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'jensen-huang',
    name_ko: '젠슨 황',
    name_en: 'Jensen Huang',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: '엔비디아 CEO. AI 시대의 대표 주자로 떠오른 대만계 미국인 CEO.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CS',
  },
  {
    slug: 'lee-jae-yong',
    name_ko: '이재용',
    name_en: 'Lee Jae-yong',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: '삼성전자 회장. 한국 최대 기업의 3세 경영인.',
    consensus_mbti: 'ISTJ',
    consensus_temp: 'PM',
  },

  // ── 역사 인물 (5) ──
  {
    slug: 'confucius',
    name_ko: '공자',
    name_en: 'Confucius',
    category: 'historical',
    subcategory: '철학자',
    thumbnail: null,
    description: '동양 사상의 기반을 닦은 중국의 철학자. 유교의 창시자.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'aristotle',
    name_ko: '아리스토텔레스',
    name_en: 'Aristotle',
    category: 'historical',
    subcategory: '철학자',
    thumbnail: null,
    description: '고대 그리스의 철학자. 논리학·자연학·윤리학을 체계화.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'einstein',
    name_ko: '아인슈타인',
    name_en: 'Albert Einstein',
    category: 'historical',
    subcategory: '과학자',
    thumbnail: null,
    description: '상대성 이론을 창안한 20세기 최고의 물리학자.',
    consensus_mbti: 'INTP',
    consensus_temp: 'PM',
  },
  {
    slug: 'leonardo-da-vinci',
    name_ko: '레오나르도 다 빈치',
    name_en: 'Leonardo da Vinci',
    category: 'historical',
    subcategory: '예술가/발명가',
    thumbnail: null,
    description: '르네상스를 대표하는 천재. 화가, 발명가, 과학자, 건축가.',
    consensus_mbti: 'INTP',
    consensus_temp: 'PM',
  },
  {
    slug: 'cleopatra',
    name_ko: '클레오파트라',
    name_en: 'Cleopatra',
    category: 'historical',
    subcategory: '왕/정치인',
    thumbnail: null,
    description: '이집트의 마지막 파라오. 카이사르와 안토니우스의 연인.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CS',
  },

  // ── 영화/애니 캐릭터 (5) ──
  {
    slug: 'batman',
    name_ko: '배트맨',
    name_en: 'Batman (Bruce Wayne)',
    category: 'movie',
    subcategory: 'DC',
    thumbnail: null,
    description: '고담시의 어둠의 기사. 정의를 위해 혼자 싸우는 억만장자.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'captain-america',
    name_ko: '캡틴 아메리카',
    name_en: 'Captain America (Steve Rogers)',
    category: 'movie',
    subcategory: '마블',
    thumbnail: null,
    description: '정의와 도덕의 아이콘. 어벤져스의 첫 리더이자 가장 신뢰받는 영웅.',
    consensus_mbti: 'ISFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'luffy-one-piece',
    name_ko: '몽키 D. 루피',
    name_en: 'Monkey D. Luffy',
    category: 'anime',
    subcategory: '원피스',
    thumbnail: null,
    description: '해적왕을 꿈꾸는 고무고무 열매 능력자. 원피스의 주인공.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'SC',
  },
  {
    slug: 'goku',
    name_ko: '손오공',
    name_en: 'Son Goku',
    category: 'anime',
    subcategory: '드래곤볼',
    thumbnail: null,
    description: '드래곤볼의 주인공. 끝없이 강해지고 싶어하는 사이어인 전사.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'SC',
  },
  {
    slug: 'lelouch',
    name_ko: '루루슈 람페르지',
    name_en: 'Lelouch vi Britannia',
    category: 'anime',
    subcategory: '코드기어스',
    thumbnail: null,
    description: '코드기어스의 주인공. 천재적 전략가로 세상을 바꾸려 하는 왕자.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
];

async function main() {
  console.log(`\n=== Seeding batch 2: ${profiles.length} additional profiles ===\n`);

  let ok = 0;
  let fail = 0;

  for (const p of profiles) {
    const { error } = await supabase
      .from('profiles')
      .upsert(p, { onConflict: 'slug' });

    if (error) {
      console.log(`  [FAIL] ${p.slug}: ${error.message}`);
      fail++;
    } else {
      console.log(`  [OK]   ${p.slug.padEnd(30)} ${p.name_ko}`);
      ok++;
    }
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed.`);

  // Verify total count
  const { data, error } = await supabase
    .from('profiles')
    .select('slug, consensus_mbti')
    .order('created_at', { ascending: true });

  if (error) {
    console.log('Verification failed:', error.message);
    return;
  }
  console.log(`\nTotal profiles in DB: ${data.length}`);

  // MBTI distribution
  const mbtiCount = {};
  data.forEach(p => {
    mbtiCount[p.consensus_mbti] = (mbtiCount[p.consensus_mbti] || 0) + 1;
  });
  console.log('\nMBTI distribution:');
  Object.entries(mbtiCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(`  ${k}: ${v}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
