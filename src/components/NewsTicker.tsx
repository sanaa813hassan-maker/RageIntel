export default function NewsTicker() {
  const headlines = [
    '🔥 GTA 6 Trailer 3 rumored for Spring 2026',
    '⚡ New GTA 6 map leaks surface — Vice City confirmed',
    '🎮 Rockstar Games hints at revolutionary online mode',
    '💥 GTA 6 protagonist duo confirmed — Jason & Lucia',
    '🚀 GTA 6 release window: Fall 2025 — insiders speak',
    '🌊 RDR3 in early development according to insiders',
    '⭐ GTA Online update drops ahead of GTA 6 launch',
    '🔴 RAGE Intel: Your one-stop Rockstar news source',
  ];

  // Duplicate for seamless loop
  const items = [...headlines, ...headlines];

  return (
    <div className="bg-yellow-400 py-2 overflow-hidden relative z-40">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 bg-black px-4 py-0.5 mr-4 z-10">
          <span className="font-orbitron font-black text-yellow-400 text-xs uppercase tracking-widest">
            Breaking
          </span>
        </div>

        {/* Ticker */}
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
