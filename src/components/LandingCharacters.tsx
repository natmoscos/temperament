'use client';

import CharacterAvatar from './CharacterAvatar';

// 4가지 기질을 대표하는 캐릭터 4명을 보여줌
const showcaseCharacters = [
  { mbti: 'ENFP', temp: 'SC', label: '다혈질' },
  { mbti: 'ENTJ', temp: 'CM', label: '담즙질' },
  { mbti: 'ISFJ', temp: 'PS', label: '점액질' },
  { mbti: 'INFJ', temp: 'MP', label: '우울질' },
];

export function LandingCharacters() {
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      {showcaseCharacters.map((c, i) => (
        <div key={i} className="flex flex-col items-center group">
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2">
            <CharacterAvatar
              mbtiType={c.mbti}
              temperamentCode={c.temp}
              size={i === 1 || i === 2 ? 80 : 72}
              className="drop-shadow-md"
            />
          </div>
          <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
