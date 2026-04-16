import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qfbjsooglcxterpkbgwa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmpzb29nbGN4dGVycGtiZ3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDEyMDUsImV4cCI6MjA5MTIxNzIwNX0.Kms-Ci84Dhq6jPViVsiC6QgGcEI3PntzRcjtYW2LvbI'
);

// 시간을 과거로 더 분산 (2시간 ~ 7일 전)
function hoursAgo(h) {
  return new Date(Date.now() - h * 3600000).toISOString();
}

const posts = [
  // ── 연애/관계 (10) ──
  {
    type_code: 'INFP-PM',
    nickname: 'INFP-PM 잔잔한사슴',
    title: '남친이 INTJ인데 대화가 점점 깊어져요',
    content: '사귄지 6개월 됐는데 처음엔 말수가 너무 적어서 관심 있는 건가 의심했어요\n근데 내가 먼저 깊은 주제를 꺼내니까 남친이 갑자기 말이 많아짐 ㅋㅋ\n\n오늘은 퇴근길에 둘이 전화하면서 "죽음 이후에 뭐가 있을까"로 시작해서 철학 얘기까지 2시간 함\n이런 대화 나눌 수 있는 사람 만나기 진짜 어려운데 감사한 인연이에요\n\nINFP한테 INTJ는 천생연분인 듯 ㅎㅎ',
    likes: 18,
    created_at: hoursAgo(3),
  },
  {
    type_code: 'ENFJ-SC',
    nickname: 'ENFJ-SC 다정한햇살',
    title: '남친 ISTP인데 표현 없는 게 진심이었어요',
    content: '솔직히 처음 1년은 진짜 힘들었어요\n애정 표현도 없고 기념일도 대충 넘기고\n\n근데 내가 갑자기 다리 다쳤을 때 병원으로 달려와서 집까지 업고 가더라구요\n그러면서 한마디도 안 함\n집 도착하고 "아프지 마"가 끝이었음\n\n말이 아니라 행동으로 사랑하는 사람이란 걸 그때 깨달음\n표현 많은 사람이 좋은 연애일 거라 생각했는데 내가 틀렸더라구요',
    likes: 34,
    created_at: hoursAgo(6),
  },
  {
    type_code: 'ESTP-CS',
    nickname: 'ESTP-CS 번쩍번개',
    title: '소개팅 첫날 결혼 얘기 꺼냈다가 차인 썰',
    content: '아니 내가 이상한가?\n첫 만남에서 두 시간 얘기하다가\n"저는 2-3년 안에 결혼 생각 있는데 방향성 맞는지 얘기해보면 좋을 것 같아요"\n\n이렇게 말했더니 상대가 당황하면서 "생각해보고 연락할게요"하고 가버림\n그 후로 연락 없음 ㅋㅋㅋ\n\n담즙질이라 효율 추구하다 보니 그랬는데 너무 직진이었나\n너네들은 첫 만남에서 이런 얘기 안 해?',
    likes: 12,
    created_at: hoursAgo(10),
  },
  {
    type_code: 'ISFJ-PC',
    nickname: 'ISFJ-PC 차분한백조',
    title: '연애 7년차인데 아직도 설레는 이유',
    content: '남친이랑 7년째인데 아직도 가끔 두근거려요\nMBTI는 남친이 ENTP인데 저랑 정반대\n\n근데 기질이 둘 다 점액이 강해서 싸움이 거의 없어요\n의견이 달라도 "일단 각자 생각 좀 해보자" 하고 서로 시간 가짐\n\n그리고 나중에 다시 얘기하면 어느새 합의점이 나와 있어요\n연애는 MBTI보다 기질이 더 중요한 것 같아요\n같은 점액질 만나면 평생 편하게 살 수 있음',
    likes: 27,
    created_at: hoursAgo(14),
  },
  {
    type_code: 'ENFP-SM',
    nickname: 'ENFP-SM 빛나는별',
    title: '엄빠가 자꾸 소개팅 시키는데 다 안 맞음ㅠ',
    content: '엄마: "너 나이 26인데 결혼 생각 안 해?"\n나: "좋은 사람 있으면 해야지"\n엄마: "그러니까 빨리 만나야지"\n\n이렇게 해서 나가는 소개팅마다\n안정적인 공무원, 성실한 회사원, 성격 무난한 사람...\n\n다들 좋은데 대화 30분 하면 숨이 막혀요\n나는 미친 듯이 수다 떨고 싶은데 상대는 "네" "그렇네요" 이러면 진짜 답답함\n\n다혈+우울 조합이라 감정 기복 심한 나를 감당할 사람이 과연 있을까 ㅠㅠ',
    likes: 21,
    created_at: hoursAgo(18),
  },
  {
    type_code: 'INTJ-CP',
    nickname: 'INTJ-CP 냉철한매',
    title: '연애는 에너지 낭비라고 생각했는데 바뀜',
    content: '28년간 연애를 비효율이라고 생각함\n시간도 들고 돈도 들고 감정 소모도 크고\n\n근데 최근 회사에서 ENFJ 후배를 만났는데\n이 사람이랑 같이 있으면 이상하게 에너지가 충전됨\n\n처음엔 이게 뭔가 싶었는데 생각해보니\n내가 말 안 해도 뭐 필요한지 알아서 챙겨주고\n내 무뚝뚝함을 공격으로 받지 않고 그냥 내 방식이라고 이해해줌\n\n이런 사람은 놓치면 평생 후회할 것 같아서 어제 고백함\n결과는... 성공ㅋㅋ 기분 이상하지만 좋은 이상함이야',
    likes: 45,
    created_at: hoursAgo(22),
  },
  {
    type_code: 'ISTP-SC',
    nickname: 'ISTP-SC 조용한늑대',
    title: '연애할 때 "무슨 생각해?" 물어보지 마세요 제발',
    content: '여친아 사랑해\n근데 진짜 부탁이 있어\n\n내가 멍때리고 있을 때 "무슨 생각해?" 묻지 좀 마\n정말 아무 생각도 안 해\n그냥 뇌가 쉬고 있는 거야\n\n근데 자꾸 물어보니까 뭔가 답해야 할 것 같아서\n머리 굴려서 답 만드는 거라고\n\n제발 그 시간을 인정해줘\n같은 ISTP 남자들 공감하지? ㅋㅋ',
    likes: 38,
    created_at: hoursAgo(26),
  },
  {
    type_code: 'ESFP-SC',
    nickname: 'ESFP-SC 분위기메이커',
    title: '짝사랑 6개월째인데 고백해야 할까요',
    content: '학원에서 만난 오빠인데 INFJ 같음\n되게 조용하고 말수 적은데 눈빛이 깊고...\n\n근데 6개월째 진도가 안 나감 ㅠㅠ\n카톡은 잘 받아주는데 먼저 연락은 안 옴\n\n다혈질인 나는 진짜 답답해 죽겠는데\n고백했다가 애매해지면 학원도 못 다니게 됨\n\n인생은 한 번인데 고백이 답이겠죠?',
    likes: 15,
    created_at: hoursAgo(30),
  },
  {
    type_code: 'INFJ-MP',
    nickname: 'INFJ-MP 깊은숲',
    title: '사랑하지만 결혼은 못 하겠어요',
    content: '남친 좋은 사람이에요\n성격도 맞고 함께 있으면 편하고\n근데 결혼 생각하면 불안함이 밀려와요\n\n우울질 1차라서 자꾸 최악의 시나리오만 그려요\n"이 사람이 변하면 어떡하지" "내가 우울해질 때 지켜줄 수 있을까"\n\n머리로는 이 사람과 결혼해도 괜찮다는 거 아는데\n마음이 자꾸 도망가려 해요\n\n같은 INFJ 우울+점액 조합으로 결혼하신 분 계신가요\n어떻게 마음 정리하셨는지 궁금해요',
    likes: 31,
    created_at: hoursAgo(36),
  },
  {
    type_code: 'ENTJ-CS',
    nickname: 'ENTJ-CS 날렵한독수리',
    title: '이별한 다음날 바로 새 프로젝트 시작',
    content: '3년 만난 여친이랑 어제 헤어짐\n슬펐냐고? 슬펐음\n근데 오늘 아침 일어나서 새로운 사업 계획 세우기 시작\n\n이게 ENTJ 담즙질의 회복탄력성인가\n\n친구가 "야 그래도 3년인데 너 너무 빠른 거 아니야?" 하길래\n"지난 일은 지난 일이고 앞으로 뭘 할지가 더 중요해"\n이렇게 답했더니 친구가 나를 사이코처럼 보더라 ㅋㅋ\n\n근데 진심임. 슬퍼하는 것도 하루면 충분함\n이미 끝난 일에 시간 버리고 싶지 않음',
    likes: 9,
    created_at: hoursAgo(42),
  },

  // ── 직장/사회생활 (8) ──
  {
    type_code: 'ESTJ-CS',
    nickname: 'ESTJ-CS 강한바람',
    title: '후배가 일을 너무 못하는데 제가 이상한가요',
    content: '같은 팀 후배가 3년차인데 아직도 기본적인 거 모름\n지난주에 제가 시킨 업무 또 틀려서 제가 다시 했음\n\n팀장이 "좀 부드럽게 말해주라"고 하는데\n솔직히 나도 참을 만큼 참았다 생각함\n\n담즙질이라 직설적인 게 문제인 건 알지만\n일은 일인데 왜 감정이 들어가야 하는지 모르겠음\n\n너네 팀에도 이런 후배 있음?',
    likes: 16,
    created_at: hoursAgo(4),
  },
  {
    type_code: 'INTP-PM',
    nickname: 'INTP-PM 생각하는올빼미',
    title: '회사 관둘까 고민 3개월째',
    content: '회사 다닌지 4년째\n일 자체는 나쁘지 않은데 회의가 너무 많음\n\n의미 없는 회의에 하루 3시간씩 쓰는데\n그 시간에 코드 짜는 게 더 생산적이라고 생각함\n\n근데 점액질이라 "일단 더 버텨보자" "급한 결정은 위험해"\n이러면서 3개월째 결정 못 내리고 있음\n\n이직 선배들 조언 좀 해주세요\n점액질 INTP는 언제 결단해야 하나요',
    likes: 14,
    created_at: hoursAgo(9),
  },
  {
    type_code: 'ENFJ-SP',
    nickname: 'ENFJ-SP 따뜻한벚꽃',
    title: '팀 분위기 다 내 책임인 것 같은 기분',
    content: '우리 팀에 내성적인 사람이 많아서\n회의 때 분위기가 죽어 있으면 나도 모르게 나서서 분위기 띄움\n\n근데 집에 오면 진짜 방전됨\n"왜 내가 이걸 해야 하지" 하는 생각이 들면서도\n다음 날 출근하면 또 똑같이 함\n\n다혈+점액 조합이라 평소엔 에너지 넘치다가\n갑자기 무기력해지는 패턴 반복\n같은 분 있나요?',
    likes: 20,
    created_at: hoursAgo(15),
  },
  {
    type_code: 'ISTJ-PM',
    nickname: 'ISTJ-PM 단단한돌',
    title: '10년차인데 승진 못 한 이유 알 것 같음',
    content: '같은 팀 5년 후배가 먼저 승진했음\n처음엔 부당하다고 생각했는데\n차분히 생각해보니 나는 일은 잘하지만\n\n- 회식 안 감\n- 상사한테 말 안 붙임\n- 프로젝트 성과 어필 안 함\n\n점액+우울 조합이라 "묵묵히 하면 알아주겠지" 생각했는데\n현실은 그렇게 안 돌아간다는 걸 이제야 깨달음\n\n늦었지만 올해부터는 조금 바꿔보려고요',
    likes: 25,
    created_at: hoursAgo(20),
  },
  {
    type_code: 'ENTP-CM',
    nickname: 'ENTP-CM 엉뚱한여우',
    title: '회의에서 반박하다가 부서 이동됨 ㅋㅋ',
    content: '팀장 발표에서 "이 부분 논리적으로 안 맞는데요?"\n이렇게 말했더니 회의실 분위기 싸해짐\n\n그 후로 갑자기 다른 팀으로 이동 명령\n사유는 "팀 구성원 재편"\n\n근데 나는 팩트 체크한 거였는데?\n내가 한 말이 틀렸으면 반박하면 되잖아\n\n담즙+우울 조합이라 논리 벗어나는 걸 못 참음\n진짜 프리랜서나 창업이 답인 것 같다',
    likes: 28,
    created_at: hoursAgo(25),
  },
  {
    type_code: 'ISFJ-PM',
    nickname: 'ISFJ-PM 따뜻한솜사탕',
    title: '번아웃 와서 휴직 신청했어요',
    content: '3년간 팀 막내로 모든 잡무 다 받아줬거든요\n회식 자리 세팅, 복사 용품 주문, 신입 교육, 상사 커피까지\n\n근데 어느 날 갑자기 아침에 일어났는데 눈물이 나더라구요\n출근하기 싫은 게 아니라 살기 싫은 느낌이었어요\n\n상담받으니까 "당신은 주는 것만 해왔고 받는 법을 몰라요"라고 하시더라구요\n점액+우울 조합 분들 번아웃 조심하세요\n티 안 나서 자기도 모르게 쌓임',
    likes: 42,
    created_at: hoursAgo(32),
  },
  {
    type_code: 'ESFJ-SP',
    nickname: 'ESFJ-SP 행복한민들레',
    title: '팀 회식 주최자는 왜 매번 나일까',
    content: '우리 팀 회식 기획자 3년째 나임\n처음엔 내가 하고 싶어서 한 거 맞음\n근데 이제는 "당연히 나현이가 하겠지"가 돼버림\n\n다혈+점액이라 거절을 잘 못하는데\n이번엔 용기 내서 "이번에는 다른 분이 기획해주세요" 했더니\n팀 분위기 순식간에 어색해짐 ㅋㅋ\n\n결국 또 내가 함\n내 성격이 문제인지 이게 맞는 건지 모르겠음',
    likes: 11,
    created_at: hoursAgo(38),
  },
  {
    type_code: 'INFJ-PM',
    nickname: 'INFJ-PM 고요한호수',
    title: '프리랜서 5년차 현실 공유',
    content: '회사 다니다 프리랜서 전환한지 5년\n결론: INFJ 점액+우울 조합한테는 프리랜서가 답이더라구요\n\n장점\n- 에너지 소모 사회 모임 없음\n- 내 페이스대로 일함\n- 깊이 있는 작업 가능\n\n단점\n- 수입 불안정\n- 사람 만날 기회 줄어듦\n- 외로움\n\n그래도 회사 다닐 때보다 삶의 만족도는 훨씬 높아요\n같은 고민하시는 분들 참고하세요',
    likes: 37,
    created_at: hoursAgo(50),
  },

  // ── 가족/친구 관계 (7) ──
  {
    type_code: 'INFP-MS',
    nickname: 'INFP-MS 조용한달',
    title: '엄마랑 MBTI 얘기하다가 싸움',
    content: '엄마: "너는 왜 이렇게 결단력이 없어"\n나: "엄마 나 INFP야. 원래 그래"\n엄마: "그게 무슨 핑계야"\n\n이러면서 진짜 싸움남\n\n근데 여기서 기질 얘기하니까 엄마가 오히려 이해해주심\n"너는 우울질이 강해서 결정할 때 신중한 거고\n엄마는 담즙질이라 빠르게 결정하는 거구나"\n\n서로 다른 것뿐인데 그동안 서로를 비난해왔던 게 미안해졌음\n가족한테 기질 얘기해주는 거 진심 추천',
    likes: 24,
    created_at: hoursAgo(7),
  },
  {
    type_code: 'ESFP-SM',
    nickname: 'ESFP-SM 반짝이는별',
    title: '친구들이 나를 "철없다"고 해요',
    content: '30대인데 아직도 "너는 애 같다"는 소리 들음\n처음엔 상처받았는데\n\n다혈질 1차라서 순간순간에 집중하는 게 철없어 보이는 거더라구요\n우울질 2차라서 가끔은 진지한데 사람들은 그 순간을 못 봄\n\n이제는 그냥 받아들이기로 함\n나는 30년 후에도 이럴 거니까 ㅋㅋ\n대신 평생 즐겁게 살겠지',
    likes: 19,
    created_at: hoursAgo(16),
  },
  {
    type_code: 'ENFJ-SC',
    nickname: 'ENFJ-SC 빛나는아침',
    title: '친한 친구랑 2년 만에 화해했어요',
    content: '대학 때 제일 친했던 애랑 오해 생겨서 2년 연락 끊김\n서로 자존심 세워서 아무도 먼저 연락 안 함\n\n그러다 얼마 전에 그 친구가 힘든 일 겪었단 소식 들어서\n용기 내서 먼저 연락함\n\n그 친구가 울면서 "왜 이제 연락했냐" 하는데 같이 통곡함\n2년 동안 쌓인 오해가 30분 대화로 다 풀림\n\n다혈질이라 감정 표현 잘하는 게 이럴 때 빛을 발하는 듯\n화해 놓치기 전에 먼저 손 내미는 거 추천합니다',
    likes: 33,
    created_at: hoursAgo(28),
  },
  {
    type_code: 'ISTP-SP',
    nickname: 'ISTP-SP 말없는물',
    title: '가족 모임이 세상에서 제일 피곤함',
    content: '명절 때마다 친척 모임 가야 하는 게 고문임\n"요즘 뭐해?" "언제 결혼해?" "연봉 얼마야?"\n\n나는 그냥 집에서 프라모델 조립하고 싶은데\n거기 2시간 앉아 있으면 에너지 방전\n\n점액질이라 겉으로는 웃으면서 대답함\n근데 집 오면 아무 말도 못 함\n\n같은 ISTP 점액질 님들\n이거 어떻게 극복함?',
    likes: 17,
    created_at: hoursAgo(34),
  },
  {
    type_code: 'ESTJ-CP',
    nickname: 'ESTJ-CP 강직한매',
    title: '여동생이 INFP인데 이해가 안 돼요',
    content: '여동생은 뭐든 "그냥 해봐야 알지 않을까?"\n나는 "일단 계획부터 세우자"\n\n여행 계획 짜는 것도\n나: 일정표 엑셀\n여동생: "가서 느낌 따라서 하자"\n\n미쳐버림 ㅋㅋ\n\n근데 기질 테스트 해보니 내가 담즙, 여동생이 우울\n근본이 다르니까 당연히 접근이 다르다는 거 깨달음\n요즘은 서로 차이 인정하려고 노력 중',
    likes: 13,
    created_at: hoursAgo(46),
  },
  {
    type_code: 'ENTP-SC',
    nickname: 'ENTP-SC 쨍쨍한번개',
    title: '친구랑 매일 4시간씩 통화하는 이유',
    content: '베프가 INTJ인데 진짜 매일 통화함\n\n우리 대화 주제\n- 시간은 정말 존재하는가\n- 외계인은 있을까\n- 블록체인은 사기인가 혁명인가\n- 남자와 여자는 진짜 다른가\n- 예술은 왜 필요한가\n\n이런 쓸데없어 보이는 얘기 진짜 재밌게 함\n둘 다 NT라서 지적 대화 갈증 심한데 서로 풀어주는 느낌\n\n같은 ENTP 분들 NT 친구 필수임',
    likes: 22,
    created_at: hoursAgo(52),
  },
  {
    type_code: 'ISFP-PM',
    nickname: 'ISFP-PM 부드러운꽃잎',
    title: '혼자 여행 3번째, 점점 좋아져요',
    content: '처음 혼자 여행 갔을 때는 어색했어요\n사진도 혼자 찍고 밥도 혼자 먹고\n\n근데 3번째 가니까 알겠음\n혼자 여행이 얼마나 사치인지\n\n아무 계획 없이 걷다가 맘에 드는 카페 들어가고\n저녁 노을 보면서 울컥하기도 하고\n\n점액+우울 조합은 혼자 시간이 필수인 듯\n이렇게 채운 에너지로 일상 살아갈 수 있음',
    likes: 29,
    created_at: hoursAgo(58),
  },

  // ── 자기 고민 / 유머 / 토론 (10) ──
  {
    type_code: 'INFP-SM',
    nickname: 'INFP-SM 꿈꾸는나비',
    title: '제 감정 기복 이게 정상인가요',
    content: '하루에도 감정이 10번은 바뀌어요\n\n오전: 아 오늘 너무 좋다 행복해\n점심: 오늘 왜 이렇게 지치지\n오후: 나 뭐하는 인생이지\n저녁: 재밌는 거 보니까 다시 좋음\n밤: 자기 전에 갑자기 우울\n\n이거 정상인가요 아니면 문제인가요\n다혈+우울 조합 분들 공감하시나요',
    likes: 26,
    created_at: hoursAgo(11),
  },
  {
    type_code: 'INTJ-CM',
    nickname: 'INTJ-CM 예리한검',
    title: 'MBTI 비판론자들한테',
    content: '"MBTI는 비과학적이다"\n맞는 말\n\n그런데 질문\n1. 혈액형별 성격은 안 믿으면서 MBTI만 비판하는 이유\n2. 완벽한 과학이어야만 유용한가\n3. 본인 행동 패턴 이해에 도움 되면 그만 아닌가\n\n비판을 위한 비판 말고\n실제로 대체 프레임워크 제시해주세요\n그럼 같이 토론하죠',
    likes: 31,
    created_at: hoursAgo(17),
  },
  {
    type_code: 'ENFP-SC',
    nickname: 'ENFP-SC 통통돌고래',
    title: 'ENFP들만 모이는 단톡방 만들면 어떻게 될까',
    content: '갑자기 궁금해졌음\nENFP 10명이 모이면?\n\n내 예상\n- 첫날: 서로 막 수다 떨면서 "우리 천생연분이야!"\n- 한 주 후: 아무도 답장 안 함\n- 한 달 후: 단톡방 조용함\n- 1년 후: "어 여기 단톡방 있었네?"\n\n맞음 ㅋㅋㅋㅋ\n우리 시작은 거창한데 지속력이 0임 인정?',
    likes: 44,
    created_at: hoursAgo(23),
  },
  {
    type_code: 'INTP-MC',
    nickname: 'INTP-MC 고독한연구원',
    title: '논문 쓰다가 문득',
    content: '박사과정 4년차\n\n주변 사람들: "논문 어떻게 돼가?"\n나: "음... 거의 다 됐어"\n\n실제 상황: 아직 서론도 못 씀\n\n이게 거짓말은 아님\n내 머릿속에는 완성된 논문이 있음\n단지 글로 옮기는 과정이 남아있을 뿐...\n\n우울+담즙 조합이라 생각은 정리되는데 실행이 안 되는 함정\n같은 박사 수생 분들 오늘도 화이팅',
    likes: 16,
    created_at: hoursAgo(29),
  },
  {
    type_code: 'ESFJ-SC',
    nickname: 'ESFJ-SC 활기찬토끼',
    title: 'ESFJ 인데 혼자 있는 시간이 필요해',
    content: '사람 좋아하고 챙기는 거 좋아하는데\n주말에는 진짜 아무도 안 만나고 싶음\n\n나 ESFJ 맞아? 의심됐는데\n기질 결과 보니 담즙이 2차라서 그런 듯\n\n에너지 충전 방식이 점액질이랑 비슷해서\n혼자 시간이 필요함\n\n같은 ESFJ 분들도 혼자 시간 필요한가요\n아니면 저만 이상한 건가요',
    likes: 23,
    created_at: hoursAgo(35),
  },
  {
    type_code: 'ENTJ-CP',
    nickname: 'ENTJ-CP 선두의늑대',
    title: '사람들이 "쎈 언니"라고 부르는 이유',
    content: '처음 만난 사람들이 나 보면 다들 "쎄 보인다"고 함\n근데 막상 얘기 나눠보면 "생각보다 따뜻하시네요"\n\n담즙 1차라 표정이 평소에 진지함\n근데 속은 의외로 감성적이야\n\n연애할 때 이거 진짜 장애물임\n바람 맞아서 친구들한테 펑펑 우는 모습 보이면 다들 "너 사람 맞았네" 이러는데\n\n아니 나 그냥 감정 숨기는 거지 없는 거 아님 ㅠㅠ',
    likes: 40,
    created_at: hoursAgo(41),
  },
  {
    type_code: 'INFJ-MC',
    nickname: 'INFJ-MC 차가운달빛',
    title: '직관 맞은 적 있는 분?',
    content: '카페에서 옆자리 커플 10분 보고\n"저 둘 3개월 안에 헤어질 것 같다" 했는데\n친구가 "네가 뭐 알아" 하더니\n\n2달 후에 진짜 헤어졌다고 함 ㅋㅋㅋ\n\nINFJ 직관 진짜 무서워\n근데 이게 너무 자주 맞으니까 가끔 무섭기도 해\n나 자신을 믿기가 어려울 정도\n\n같은 경험 있는 INFJ 있어?',
    likes: 35,
    created_at: hoursAgo(47),
  },
  {
    type_code: 'ESFP-CS',
    nickname: 'ESFP-CS 터지는햇살',
    title: '파티플래너 직업 추천할게요',
    content: '전공이랑 관계없이 파티플래너 된 ESFP임\n\n장점\n- 매번 새로운 현장\n- 사람 만나는 게 일\n- 즉각적인 피드백\n- 창의력 발휘\n\n단점\n- 체력 소모 극심\n- 세부 행정 지옥\n- 불규칙 스케줄\n\n다혈+담즙 조합이라 완벽 적성임\n같은 유형 진로 고민하는 분들 참고하세요',
    likes: 12,
    created_at: hoursAgo(55),
  },
  {
    type_code: 'ISTJ-PC',
    nickname: 'ISTJ-PC 정확한시계',
    title: '계획 없는 여행이 뭔지 모르겠음',
    content: 'ENFP 친구: "이번엔 계획 없이 그냥 떠나자!"\n나: "...숙소는?"\nENFP 친구: "가서 정하지 뭐"\n나: "비행기표는?"\nENFP 친구: "일단 공항 가서 정하자"\n\n진짜 진심으로 이해 못 함\n점액질이라 변수 많은 상황 자체가 스트레스야\n\n그래서 내가 몰래 전체 일정표 엑셀로 만들어서\n"혹시 몰라서 대강 짜봤어" 하고 보여줬더니\n친구가 "너 이거 왜 만들었어ㅋㅋㅋ" 함\n\n왜 나만 힘든 거지 ㅠㅠ',
    likes: 48,
    created_at: hoursAgo(62),
  },
  {
    type_code: 'ENTP-SM',
    nickname: 'ENTP-SM 번개파도',
    title: '아이디어 10개 중 실행한 거 1개도 안 됨',
    content: '최근 1년간 내가 떠올린 사업 아이디어\n\n1. AI 기반 맞춤형 네일아트 앱\n2. 강아지 MBTI 검사 서비스\n3. 대학생 과외 매칭 플랫폼\n4. 중고 명품 실시간 가격 비교\n5. 독서 모임 자동 매칭 서비스\n6. 1인 가구 집사 앱\n7. 회의록 자동 요약 AI\n8. 친구 강제 운동 계약 앱\n9. 맛집 단독 예약 서비스\n10. 옷장 디지털 관리 앱\n\n실행한 거: 0개\n\n다혈+담즙 조합이라 아이디어는 폭발하는데 실행은 답이 없음\n이거 어떻게 극복하나요 진심 고민',
    likes: 38,
    created_at: hoursAgo(70),
  },
];

async function main() {
  console.log(`Inserting ${posts.length} community posts (batch 2)...`);

  let ok = 0;
  let fail = 0;

  for (const post of posts) {
    const { error } = await supabase.from('posts').insert(post);
    if (error) {
      console.log(`[FAIL] "${post.title}": ${error.message}`);
      fail++;
    } else {
      console.log(`[OK] ${post.type_code} — "${post.title}"`);
      ok++;
    }
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed.`);

  // 확인
  const { data, error } = await supabase
    .from('posts')
    .select('id, type_code, title, likes')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Verification failed:', error.message);
  } else {
    console.log(`\n=== Total posts now: ${data.length} ===`);
  }
}

main();
