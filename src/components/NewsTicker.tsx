import { useState, useEffect } from 'react';

const DEFAULT_HEADLINES = [
  '🔥 GTA 6 Trailer 3 rumored for Spring 2026',
  '⚡ New GTA 6 map leaks surface — Vice City confirmed',
  '🎮 Rockstar Games hints at revolutionary online mode',
  '💥 GTA 6 protagonist duo confirmed — Jason & Lucia',
  '🚀 GTA 6 release window: Fall 2025 — insiders speak',
  '🌊 RDR3 in early development according to insiders',
  '⭐ GTA Online update drops ahead of GTA 6 launch',
  '🔴 RAGE Intel: Your one-stop Rockstar news source',
];

function getCustomHeadlines(): string[] {
  try {
    const stored = localStorage.getItem('rageintel_ticker');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
  } catch { return []; }
}

export default function NewsTicker() {
  const [headlines, setHeadlines] = useState<string[]>(DEFAULT_HEADLINES);

  useEffect(() => {
    const custom = getCustomHeadlines();
    if (custom.length > 0) setHeadlines(custom);

    // Poll for changes (admin panel updates)
    const interval = setInterval(() => {
      const c = getCustomHeadlines();
      setHeadlines(c.length > 0 ? c : DEFAULT_HEADLINES);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const items = [...headlines, ...headlines];

  return (
    <div className="bg-yellow-400 py-2 overflow-hidden relative z-40">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-black px-4 py-0.5 mr-4 z-10">
          <span className="font-orbitron font-black text-yellow-400 text-xs uppercase tracking-widest">
            Breaking
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker whitespace-nowrap">
            {items.map((item, i) => (
              <span key={i} className="font-rajdhani font-semibold text-black text-sm mx-8 flex-shrink-0">
                {item}
                <span className="ml-8 text-black/30">|</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
