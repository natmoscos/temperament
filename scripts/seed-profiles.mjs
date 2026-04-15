// Seed profiles table with an initial set of 40 celebrities/characters.
// Run AFTER applying scripts/sql/profiles-schema.sql in Supabase dashboard.
//
// Usage:
//   node scripts/seed-profiles.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qfbjsooglcxterpkbgwa.supabase.co';
const SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// 40 initial profiles — mix of existing blog celebs + popular Korean/global figures.
// thumbnail paths reuse images already present in /public/blog/ where possible.
const profiles = [
  // ── 기존 블로그 인물 (실제 사진 있음) ──
  {
    slug: 'taylor-swift',
    name_ko: '테일러 스위프트',
    name_en: 'Taylor Swift',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/taylor-swift.jpg',
    description: '감성적인 가사와 무대 장악력으로 세대를 사로잡은 팝 아이콘.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'SC',
  },
  {
    slug: 'bad-bunny',
    name_ko: '배드 버니',
    name_en: 'Bad Bunny',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/bad-bunny.jpg',
    description: '라틴 음악을 세계 주류로 끌어올린 푸에르토리코 출신 래퍼.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SC',
  },
  {
    slug: 'zendaya',
    name_ko: '젠데이아',
    name_en: 'Zendaya',
    category: 'celebrity',
    subcategory: '배우',
    thumbnail: '/profiles/zendaya.jpg',
    description: '디즈니 채널 출신에서 오스카급 배우로 성장한 다재다능한 아티스트.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'PM',
  },
  {
    slug: 'dwayne-johnson',
    name_ko: '드웨인 존슨',
    name_en: 'Dwayne Johnson',
    category: 'celebrity',
    subcategory: '배우',
    thumbnail: '/profiles/dwayne-johnson.jpg',
    description: 'WWE 레전드에서 할리우드 최고 개런티 배우가 된 The Rock.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'CS',
  },
  {
    slug: 'cristiano-ronaldo',
    name_ko: '크리스티아누 호날두',
    name_en: 'Cristiano Ronaldo',
    category: 'athlete',
    subcategory: '축구',
    thumbnail: '/profiles/cristiano-ronaldo.jpg',
    description: '세계 최다 득점 기록을 보유한 포르투갈의 축구 황제.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'CS',
  },
  {
    slug: 'lady-gaga',
    name_ko: '레이디 가가',
    name_en: 'Lady Gaga',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/lady-gaga.jpg',
    description: '파격적 퍼포먼스와 깊은 예술성으로 팝을 재정의한 아티스트.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'MS',
  },
  {
    slug: 'elon-musk',
    name_ko: '일론 머스크',
    name_en: 'Elon Musk',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: '/profiles/elon-musk.jpg',
    description: '테슬라, SpaceX, X를 이끄는 이 시대의 가장 논쟁적인 기업가.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'donald-trump',
    name_ko: '도널드 트럼프',
    name_en: 'Donald Trump',
    category: 'celebrity',
    subcategory: '정치인',
    thumbnail: null,
    description: '부동산 재벌 출신의 미국 45대·47대 대통령.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'CS',
  },
  {
    slug: 'mrbeast',
    name_ko: '미스터비스트',
    name_en: 'MrBeast',
    category: 'celebrity',
    subcategory: '유튜버',
    thumbnail: '/profiles/mrbeast.jpg',
    description: '수천만 달러 규모의 챌린지로 유튜브 역사를 새로 쓴 크리에이터.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CS',
  },
  {
    slug: 'billie-eilish',
    name_ko: '빌리 아일리시',
    name_en: 'Billie Eilish',
    category: 'celebrity',
    subcategory: '가수',
    thumbnail: '/profiles/billie-eilish.jpg',
    description: '속삭이는 보컬과 독창적인 감성으로 Z세대의 아이콘이 된 싱어송라이터.',
    consensus_mbti: 'INFP',
    consensus_temp: 'MP',
  },
  {
    slug: 'timothee-chalamet',
    name_ko: '티모시 샬라메',
    name_en: 'Timothée Chalamet',
    category: 'celebrity',
    subcategory: '배우',
    thumbnail: '/profiles/timothee-chalamet.jpg',
    description: '섬세한 감정 연기로 할리우드 차세대 아이콘이 된 프랑스계 배우.',
    consensus_mbti: 'INFP',
    consensus_temp: 'MS',
  },

  // ── K-POP ──
  {
    slug: 'bts-rm',
    name_ko: 'BTS RM',
    name_en: 'RM (BTS)',
    category: 'kpop',
    subcategory: '아이돌 리더',
    thumbnail: null,
    description: '언어·지성·리더십을 겸비한 BTS의 리더이자 래퍼.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'MS',
  },
  {
    slug: 'bts-suga',
    name_ko: 'BTS 슈가',
    name_en: 'Suga (BTS)',
    category: 'kpop',
    subcategory: '아이돌 프로듀서',
    thumbnail: null,
    description: '차분함 속 날카로운 언어를 품은 BTS의 프로듀서이자 래퍼.',
    consensus_mbti: 'ISTP',
    consensus_temp: 'MP',
  },
  {
    slug: 'newjeans-hanni',
    name_ko: '뉴진스 하니',
    name_en: 'Hanni (NewJeans)',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '밝고 자연스러운 매력으로 뉴진스 팬덤을 사로잡은 호주 출신 멤버.',
    consensus_mbti: 'ESFP',
    consensus_temp: 'SP',
  },
  {
    slug: 'iu',
    name_ko: '아이유',
    name_en: 'IU',
    category: 'kpop',
    subcategory: '솔로 가수',
    thumbnail: null,
    description: '국민 여동생에서 국내 최정상 싱어송라이터로 자리잡은 아티스트.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'MC',
  },
  {
    slug: 'blackpink-jennie',
    name_ko: '블랙핑크 제니',
    name_en: 'Jennie (BLACKPINK)',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '독보적인 무드와 패션 감각으로 글로벌 아이콘이 된 블랙핑크 멤버.',
    consensus_mbti: 'ESTP',
    consensus_temp: 'CP',
  },
  {
    slug: 'blackpink-rose',
    name_ko: '블랙핑크 로제',
    name_en: 'Rosé (BLACKPINK)',
    category: 'kpop',
    subcategory: '아이돌',
    thumbnail: null,
    description: '청아한 보이스와 섬세한 감성의 블랙핑크 메인보컬.',
    consensus_mbti: 'INFP',
    consensus_temp: 'MS',
  },
  {
    slug: 'stray-kids-bangchan',
    name_ko: '스트레이 키즈 방찬',
    name_en: 'Bang Chan (Stray Kids)',
    category: 'kpop',
    subcategory: '아이돌 리더',
    thumbnail: null,
    description: '멤버를 챙기는 리더십과 프로듀싱 역량을 겸비한 스트레이키즈 리더.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'SC',
  },

  // ── K-DRAMA & ACTORS ──
  {
    slug: 'song-kang-ho',
    name_ko: '송강호',
    name_en: 'Song Kang-ho',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '기생충·택시운전사로 세계적 명성을 얻은 한국 영화의 얼굴.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'PM',
  },
  {
    slug: 'park-seo-joon',
    name_ko: '박서준',
    name_en: 'Park Seo-joon',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '이태원 클라쓰의 박새로이로 대중에게 각인된 로맨스·액션 겸비 배우.',
    consensus_mbti: 'ESTJ',
    consensus_temp: 'CS',
  },
  {
    slug: 'kim-go-eun',
    name_ko: '김고은',
    name_en: 'Kim Go-eun',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '도깨비·유미의 세포들에서 독보적 캐릭터 해석을 보여준 배우.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SM',
  },
  {
    slug: 'lee-jung-jae',
    name_ko: '이정재',
    name_en: 'Lee Jung-jae',
    category: 'kdrama',
    subcategory: '배우',
    thumbnail: null,
    description: '오징어 게임으로 에미상을 받은 한국 최정상급 배우.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'MC',
  },

  // ── TECH / BUSINESS ──
  {
    slug: 'steve-jobs',
    name_ko: '스티브 잡스',
    name_en: 'Steve Jobs',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: '애플을 세계 최고의 혁신 기업으로 키워낸 완벽주의 비저너리.',
    consensus_mbti: 'ENTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'mark-zuckerberg',
    name_ko: '마크 저커버그',
    name_en: 'Mark Zuckerberg',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: '페이스북을 만들어 소셜 미디어 시대를 연 Meta CEO.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'bill-gates',
    name_ko: '빌 게이츠',
    name_en: 'Bill Gates',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: '마이크로소프트 공동 창업자이자 이 시대 최대 자선가 중 한 명.',
    consensus_mbti: 'INTP',
    consensus_temp: 'MC',
  },
  {
    slug: 'sam-altman',
    name_ko: '샘 올트먼',
    name_en: 'Sam Altman',
    category: 'tech',
    subcategory: '기업가',
    thumbnail: null,
    description: 'OpenAI를 이끌며 AI 시대를 설계하는 이 시대의 가장 영향력 있는 CEO.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },

  // ── ATHLETES ──
  {
    slug: 'lionel-messi',
    name_ko: '리오넬 메시',
    name_en: 'Lionel Messi',
    category: 'athlete',
    subcategory: '축구',
    thumbnail: null,
    description: '역대 최고의 축구 선수로 평가받는 아르헨티나의 월드컵 영웅.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'PM',
  },
  {
    slug: 'son-heung-min',
    name_ko: '손흥민',
    name_en: 'Son Heung-min',
    category: 'athlete',
    subcategory: '축구',
    thumbnail: null,
    description: '토트넘 주장이자 아시아 축구를 대표하는 월드클래스 공격수.',
    consensus_mbti: 'ISFJ',
    consensus_temp: 'PC',
  },
  {
    slug: 'lebron-james',
    name_ko: '르브론 제임스',
    name_en: 'LeBron James',
    category: 'athlete',
    subcategory: '농구',
    thumbnail: null,
    description: 'NBA 통산 최다 득점자이자 역사상 가장 영향력 있는 농구 선수.',
    consensus_mbti: 'ENFJ',
    consensus_temp: 'CS',
  },

  // ── HISTORICAL ──
  {
    slug: 'friedrich-nietzsche',
    name_ko: '프리드리히 니체',
    name_en: 'Friedrich Nietzsche',
    category: 'historical',
    subcategory: '철학자',
    thumbnail: '/profiles/friedrich-nietzsche.jpg',
    description: '신은 죽었다 — 서양 철학의 판도를 바꾼 독일의 사상가.',
    consensus_mbti: 'INFJ',
    consensus_temp: 'MC',
  },
  {
    slug: 'socrates',
    name_ko: '소크라테스',
    name_en: 'Socrates',
    category: 'historical',
    subcategory: '철학자',
    thumbnail: '/profiles/socrates.jpg',
    description: '질문을 무기로 삼아 서양 철학의 토대를 놓은 고대 그리스 사상가.',
    consensus_mbti: 'ENTP',
    consensus_temp: 'CM',
  },
  {
    slug: 'hippocrates',
    name_ko: '히포크라테스',
    name_en: 'Hippocrates',
    category: 'historical',
    subcategory: '의학자',
    thumbnail: '/profiles/hippocrates.jpg',
    description: '4기질론의 창시자이자 서양 의학의 아버지.',
    consensus_mbti: 'INTP',
    consensus_temp: 'MC',
  },

  // ── FICTIONAL CHARACTERS ──
  {
    slug: 'harry-potter',
    name_ko: '해리 포터',
    name_en: 'Harry Potter',
    category: 'anime',
    subcategory: '소설 주인공',
    thumbnail: null,
    description: '마법 세계의 운명을 짊어진 그리핀도르의 용감한 소년.',
    consensus_mbti: 'ISFP',
    consensus_temp: 'MC',
  },
  {
    slug: 'hermione-granger',
    name_ko: '헤르미온느 그레인저',
    name_en: 'Hermione Granger',
    category: 'anime',
    subcategory: '소설 캐릭터',
    thumbnail: null,
    description: '호그와트 최고의 마법 지식과 도덕적 신념을 가진 원칙주의자.',
    consensus_mbti: 'ESTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'tony-stark',
    name_ko: '토니 스타크',
    name_en: 'Tony Stark',
    category: 'movie',
    subcategory: '마블',
    thumbnail: null,
    description: '천재 발명가이자 아이언맨, 어벤져스의 핵심 멤버.',
    consensus_mbti: 'ENTP',
    consensus_temp: 'CS',
  },
  {
    slug: 'sherlock-holmes',
    name_ko: '셜록 홈즈',
    name_en: 'Sherlock Holmes',
    category: 'movie',
    subcategory: '소설 주인공',
    thumbnail: null,
    description: '관찰과 추론의 대가, 베이커가 221B의 자문탐정.',
    consensus_mbti: 'INTP',
    consensus_temp: 'CM',
  },
  {
    slug: 'walter-white',
    name_ko: '월터 화이트',
    name_en: 'Walter White',
    category: 'movie',
    subcategory: '브레이킹 배드',
    thumbnail: null,
    description: '고등학교 화학 교사에서 마약 제국의 하이젠버그로 추락하는 입체적 안티히어로.',
    consensus_mbti: 'INTJ',
    consensus_temp: 'CM',
  },
  {
    slug: 'joker',
    name_ko: '조커',
    name_en: 'Joker',
    category: 'movie',
    subcategory: 'DC',
    thumbnail: null,
    description: '혼돈을 예술로 삼는 고담시 최고의 빌런.',
    consensus_mbti: 'ENTP',
    consensus_temp: 'CM',
  },
  {
    slug: 'naruto-uzumaki',
    name_ko: '우즈마키 나루토',
    name_en: 'Naruto Uzumaki',
    category: 'anime',
    subcategory: '나루토',
    thumbnail: null,
    description: '절대 포기하지 않는 신념으로 호카게가 된 닌자.',
    consensus_mbti: 'ENFP',
    consensus_temp: 'SC',
  },
];

async function main() {
  console.log(`\n=== Seeding ${profiles.length} profiles ===\n`);

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

  // Verify
  const { data, error } = await supabase
    .from('profiles')
    .select('slug, name_ko, category, consensus_mbti, consensus_temp')
    .order('created_at', { ascending: true });

  if (error) {
    console.log('Verification failed:', error.message);
    return;
  }
  console.log(`\nTotal profiles in DB: ${data.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
