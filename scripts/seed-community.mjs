import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qfbjsooglcxterpkbgwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI'
);

// 시간을 과거로 분산 (지금부터 3일 전까지)
function hoursAgo(h) {
  return new Date(Date.now() - h * 3600000).toISOString();
}

const posts = [
  {
    type_code: 'INFP-MS',
    nickname: 'INFP-MS 깊은나비',
    title: '혼자 카페에서 검사했는데 울뻔함',
    content: '일요일에 혼자 카페 갔다가 심심해서 해봤거든요\n근데 결과 읽는데 진짜 소름돋아서 눈물이 핑 돌았어요..\n우울질이 1차라는 거 보고 아 그래서 내가 그랬구나 싶은 게 한두개가 아님\n\n특히 "겉으로는 괜찮은 척하지만 내면에선 끊임없이 자기를 점검한다" 이 부분에서 멈칫했어요\n이거 어떻게 아는 건지ㅋㅋㅋ 소름\n\n다혈질이 2차라 사람들 앞에서는 밝게 행동하는데 집에 오면 에너지 방전되는 것도 맞고\n진짜 나를 글로 정리해놓은 느낌이었음',
    likes: 7,
    created_at: hoursAgo(2),
  },
  {
    type_code: 'ESTP-CS',
    nickname: 'ESTP-CS 대담한매',
    title: '담즙질이라니ㅋㅋㅋ 인정합니다',
    content: 'ㄹㅇ 부정할수가없네 ㅋㅋㅋ\n회사에서 회의할때 말 안하고 있으면 답답해서 미칠것같은거 이거 담즙질 맞지?\n어제도 팀장이 우물쭈물하길래 제가 그냥 정리해서 발표함\n근데 집에 와서 생각해보니 좀 오버였나 싶기도 하고..\n아 몰라 내가 안하면 누가해 ㅋ',
    likes: 4,
    created_at: hoursAgo(5),
  },
  {
    type_code: 'ISFJ-PM',
    nickname: 'ISFJ-PM 잔잔한수달',
    title: '점액질+우울질 조합이신 분 계신가요?',
    content: '저 이 조합인데 좀 궁금한 게 있어서요\n\n평소에 되게 조용하고 남들 신경 많이 쓰는 편이거든요\n근데 가끔 혼자 있을 때 갑자기 과거에 있었던 일이 떠오르면서 기분이 확 다운되는 경우가 있는데\n이게 우울질 때문인 건지..\n\n점액질이라 겉으로 티를 안 내니까 주변 사람들은 모르는데\n속으로는 꽤 힘들 때가 많아요ㅠ\n혹시 같은 분 있으면 어떻게 대처하시는지 궁금합니다',
    likes: 11,
    created_at: hoursAgo(8),
  },
  {
    type_code: 'ENFP-SC',
    nickname: 'ENFP-SC 불꽃돌고래',
    title: '남친이랑 같이 했는데 궁합 개웃김ㅋㅋㅋㅋ',
    content: '남친은 ISTJ-PM 나옴 ㅋㅋㅋㅋㅋㅋ\n\n나: 다혈+담즙 = 에너지 폭탄\n남친: 점액+우울 = 인간 슬로우모션\n\n이거 보고 둘이서 한참 웃었음ㅋㅋ\n맞는게 진짜 여행 계획 세울 때 나는 "여기도 가고 저기도 가자!!" 이러면\n남친은 "...일단 숙소 체크인이 몇시인지부터 보자" 이러거든요\n\n근데 신기한게 서로 부족한 부분을 채워주는 느낌이라 오히려 잘 맞음\n나 혼자였으면 여권도 안 챙기고 공항 갔을듯 ㅎ',
    likes: 15,
    created_at: hoursAgo(12),
  },
  {
    type_code: 'INTJ-CM',
    nickname: 'INTJ-CM 날카로운올빼미',
    title: '기질론 관련 논문 찾아봤는데',
    content: '결과 보고 흥미로워서 히포크라테스 기질론 관련 자료를 좀 찾아봤습니다.\n\n현대 심리학에서는 기질론 자체를 직접적으로 사용하지는 않지만,\n아이젠크의 성격 이론에서 외향성-신경증 축이 기질론의 4분류와 상당히 유사한 구조를 보입니다.\n\n특히 담즙질-다혈질 축은 외향성과, 우울질-점액질 축은 신경증 경향성과 대응되는데\n이걸 MBTI의 인지기능과 결합한 접근이 꽤 합리적이라고 봅니다.\n\n물론 과학적 검증이 더 필요하겠지만, 같은 MBTI 유형 내에서의 개인차를 설명하는 프레임워크로는 의미가 있다고 생각합니다.',
    likes: 8,
    created_at: hoursAgo(16),
  },
  {
    type_code: 'ESFP-SM',
    nickname: 'ESFP-SM 밝은사슴',
    title: '다혈질인데 2차가 우울질ㅋㅋ 이게 맞아?',
    content: '아니 나 완전 밝은 사람인데 우울질이 2차래\n처음에 에이~ 했는데 생각해보니까\n\n맞는듯..?\n\n사람들이랑 있을 때는 진짜 텐션 미친듯이 올라가는데\n집에 혼자 오면 갑자기 오늘 내가 한 말 중에 이상한 거 있었나 되돌아보면서\n이불킥하거든 ㅋㅋㅋㅋ\n\n이거 다혈+우울 특징 맞나여?',
    likes: 9,
    created_at: hoursAgo(20),
  },
  {
    type_code: 'INFJ-MC',
    nickname: 'INFJ-MC 신비한고래',
    title: '회사에서 저만 다른 세계에 사는 것 같아요',
    content: '저 INFJ에 우울+담즙인데요\n\n회사 회식 자리에서 다들 재밌게 놀고 있는데 저만 혼자 멍때리면서\n"이 사람들은 왜 행복해보이지" 이런 생각하고 있더라구요..\n\n근데 업무 관련해서는 또 되게 공격적으로 밀어붙이는 편이에요\n프로젝트 방향이 잘못됐다 싶으면 끝까지 의견 내고\n\n팀원들이 저 보면서 "평소엔 조용하더니 회의만 하면 변한다"고 하는데\n이게 우울질 베이스에 담즙질이 올라오는 거였나 봐요\n\n같은 유형 있으면 반가울 것 같아서 글 남겨봅니다',
    likes: 13,
    created_at: hoursAgo(25),
  },
  {
    type_code: 'ENTP-CS',
    nickname: 'ENTP-CS 재빠른여우',
    title: '이거 친구한테 강제 포교 중 ㅋㅋ',
    content: '어제 술자리에서 친구 4명한테 다 시킴 ㅋㅋㅋ\n결과 나올때마다 돌아가면서 읽어주는데 개꿀잼이었음\n\n한 놈은 ISFP-MP 나왔는데 평소에 조용한 애라 다 맞다고 난리났고\n다른 놈은 ESTJ-CS인데 본인이 담즙질이란걸 극도로 부정하다가\n"야 너 맨날 후배들한테 잔소리하잖아" 하니까 조용해짐 ㅋㅋㅋ\n\n이거 술안주로 최고임 강추',
    likes: 19,
    created_at: hoursAgo(28),
  },
  {
    type_code: 'ISTJ-PC',
    nickname: 'ISTJ-PC 단단한펭귄',
    title: '솔직히 다른 MBTI 검사보다 정확한듯',
    content: '기존에 MBTI 검사 한 열 번은 해본 것 같은데\n매번 ISTJ 나오면 "아 성실한 사람이구나" 끝이었거든요\n\n근데 여기서는 점액+담즙이라고 나오면서\n"평소에는 신중하지만 결정을 내린 후에는 강하게 밀어붙인다"라고 하는데\n이게 진짜 저예요\n\n직장에서도 평소에는 조용히 일하다가 마감 다가오면\n제가 알아서 일정 정리하고 팀원들한테 할일 배분하거든요\n그게 점액→담즙 전환이었구나 싶음\n\n같은 ISTJ인데 기질 다른 사람이랑 비교해보고 싶네요',
    likes: 6,
    created_at: hoursAgo(32),
  },
  {
    type_code: 'ENFJ-SM',
    nickname: 'ENFJ-SM 따뜻한사자',
    title: '후배 상담해주다가 나도 울었어요ㅠㅠ',
    content: '회사 후배가 요즘 힘들다고 해서 저녁에 만나서 얘기 들어줬거든요\n근데 얘기 듣다보니까 제 얘기 같아서 저도 모르게 울컥했어요\n\n다혈질이라 밝게 위로해주려고 했는데 우울질이 올라오면서 같이 공감해버림..\n후배는 오히려 "선배가 같이 울어주니까 더 위로됐어요"라고 하더라구요\n\n이런 게 다혈+우울의 장점인가? ㅋㅋ\n웃기면서 슬프고 슬프면서 웃기고\n\n암튼 후배야 힘내라',
    likes: 22,
    created_at: hoursAgo(36),
  },
  {
    type_code: 'ISTP-SP',
    nickname: 'ISTP-SP 느긋한늑대',
    title: '다혈+점액 조합 나왔는데 뭔가 좀 허전함',
    content: '남들은 결과 보고 소름이니 뭐니 하던데\n나는 그냥 ㅇㅇ 맞네 하고 끝남\n\n이것도 점액질 특성인가',
    likes: 5,
    created_at: hoursAgo(40),
  },
  {
    type_code: 'ESFJ-SC',
    nickname: 'ESFJ-SC 열정의토끼',
    title: '엄마랑 결과 비교했는데 유전인가봐요 ㅋㅋ',
    content: '엄마가 ESFJ-CS 저는 ESFJ-SC\n\nMBTI는 같은데 기질 순서만 반대!!\n엄마는 담즙이 1차라 집안에서 되게 카리스마 있으시고\n저는 다혈이 1차라 분위기 메이커 역할이거든요\n\n근데 둘 다 2차가 서로의 1차라서 상황에 따라 역할이 바뀔 때가 있음\n\n예를 들면 명절에 친척들 모이면 엄마가 다 지시하시고(담즙) 저는 분위기 띄우고(다혈)\n근데 엄마 힘드실 때는 제가 나서서 정리하고(담즙) 엄마가 옆에서 웃으시면서 응원해주시고(다혈)\n\n이런 게 기질의 차이구나 싶었음!',
    likes: 10,
    created_at: hoursAgo(44),
  },
  {
    type_code: 'INTP-MC',
    nickname: 'INTP-MC 조용한올빼미',
    title: '192가지면 혈액형보다는 과학적인 거 아님?',
    content: '혈액형 = 4가지\nMBTI = 16가지\n이거 = 192가지\n\n표본이 세분화될수록 개인차 설명력이 올라가는 건 통계적으로 당연한 건데\n사람들이 왜 혈액형은 믿으면서 이건 안 믿는지 모르겠음\n\n물론 192가지가 정답이란 건 아니고\n기질론이 과학적으로 완전히 검증된 것도 아니지만\n적어도 "INFP는 다 똑같다"보다는 "INFP인데 기질에 따라 다르다"가\n현실을 더 잘 설명한다고 봄',
    likes: 3,
    created_at: hoursAgo(48),
  },
  {
    type_code: 'ESTJ-CP',
    nickname: 'ESTJ-CP 용감한호랑이',
    title: '담즙질 1차인 사람들 손🙋',
    content: '담즙질 1차인 사람들 특징\n\n1. 식당 들어가면 메뉴 제일 먼저 고름\n2. 조별과제에서 결국 리더 함\n3. 친구들 약속 장소도 내가 정함\n4. 남이 우유부단한 거 보면 답답함\n5. "그래서 결론이 뭔데?"를 자주 말함\n\n이거 3개 이상 해당되면 담즙질 맞음 ㅋㅋ\n다들 몇 개?',
    likes: 17,
    created_at: hoursAgo(52),
  },
];

async function main() {
  console.log(`Inserting ${posts.length} community posts...`);

  for (const post of posts) {
    const { error } = await supabase.from('posts').insert(post);
    if (error) {
      console.log(`[FAIL] "${post.title}": ${error.message}`);
    } else {
      console.log(`[OK] ${post.type_code} — "${post.title}"`);
    }
  }

  // 확인
  const { data, error } = await supabase
    .from('posts')
    .select('id, type_code, title, likes')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.log('Verification failed:', error.message);
  } else {
    console.log(`\n=== Total posts now: ${data.length} ===`);
    data.forEach(p => console.log(`  ${p.type_code.padEnd(12)} ${p.title}`));
  }
}

main();
