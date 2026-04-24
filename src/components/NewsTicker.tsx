// 6. src/components/NewsTicker.tsx (Simplified to read initialized storage)
import { useState, useEffect } from 'react';

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState<string[]>([]);

  useEffect(() => {
    const fetchH = () => setHeadlines(JSON.parse(localStorage.getItem('rageintel_ticker') || '[]'));
    fetchH(); const int = setInterval(fetchH, 3000); return () => clearInterval(int);
  }, []);

  if (!headlines.length) return null;

  return (
    <div className="bg-yellow-400 py-2 overflow-hidden relative z-40 flex">
      <div className="bg-black px-4 py-0.5 mr-4 z-10 font-orbitron font-black text-yellow-400 text-xs uppercase">Breaking</div>
      <div className="flex animate-ticker whitespace-nowrap">
        {[...headlines, ...headlines].map((h, i) => <span key={i} className="font-rajdhani font-semibold text-black text-sm mx-8">{h} <span className="ml-8 text-black/30">|</span></span>)}
      </div>
    </div>
  );
}
