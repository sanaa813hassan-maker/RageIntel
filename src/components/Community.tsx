export default function Community() {
  const topics = [
    { tag: '#GTA6', label: 'GTA 6 Discussion', count: 'Trending', hot: true },
    { tag: '#RockstarGames', label: 'Rockstar News', count: 'Active', hot: false },
    { tag: '#GTA6Leaks', label: 'Leak Reports', count: 'New', hot: true },
    { tag: '#GTA6Trailer', label: 'Trailer Analysis', count: 'Popular', hot: false },
    { tag: '#RedDeadRedemption', label: 'RDR2 Universe', count: 'Active', hot: false },
    { tag: '#GTAOnline', label: 'GTA Online Crew', count: 'Active', hot: false },
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      handle: '@RAGEIntelYT',
      url: 'https://www.youtube.com/@RAGEIntelYT',
      description: 'Subscribe for weekly videos',
      color: 'red',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'Twitter / X',
      handle: '@RAGEIntelYT',
      url: 'https://twitter.com/RAGEIntelYT',
      description: 'Breaking news & hot takes',
      color: 'sky',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 5.978 5.45-5.978zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Discord',
      handle: 'Join the Server',
      url: 'https://discord.gg/',
      description: 'Live chat with the crew',
      color: 'indigo',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      handle: '@RAGEIntelYT',
      url: 'https://tiktok.com/@RAGEIntelYT',
      description: 'Shorts & quick intel drops',
      color: 'pink',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.84 1.55V6.78a4.85 4.85 0 0 1-1.07-.09z" />
        </svg>
      ),
    },
  ];

  const colorMap: Record<string, string> = {
    red: 'border-red-600/30 hover:border-red-500/60 hover:bg-red-600/10 text-red-400',
    sky: 'border-sky-600/30 hover:border-sky-500/60 hover:bg-sky-600/10 text-sky-400',
    indigo: 'border-indigo-600/30 hover:border-indigo-500/60 hover:bg-indigo-600/10 text-indigo-400',
    pink: 'border-pink-600/30 hover:border-pink-500/60 hover:bg-pink-600/10 text-pink-400',
  };

  return (
    <section id="community" className="py-24 px-4 sm:px-6 bg-black relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-yellow-400/3 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-rajdhani font-semibold uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-yellow-400" />
            Community Hub
            <span className="w-8 h-px bg-yellow-400" />
          </div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl text-white uppercase mb-4">
            Join the <span className="text-yellow-400">RAGE</span> Crew
          </h2>
          <p className="font-inter text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Connect with thousands of Rockstar fans. Share theories, discuss leaks,
            and be part of the most dedicated GTA 6 community on the internet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Social Links */}
          <div>
            <h3 className="font-rajdhani font-bold text-white text-lg uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-5 bg-yellow-400 rounded-full" />
              Find Us Online
            </h3>
            <div className="grid gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 bg-zinc-900/60 border rounded-lg transition-all duration-300 ${colorMap[social.color]}`}
                >
                  <div className="flex-shrink-0">{social.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-rajdhani font-bold text-white text-sm uppercase tracking-wide">
                        {social.name}
                      </span>
                    </div>
                    <div className="text-gray-500 text-xs font-inter mt-0.5">{social.description}</div>
                  </div>
                  <div className="flex-shrink-0 text-gray-600 group-hover:text-current transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Topics & Tags + Newsletter */}
          <div className="space-y-8">
            {/* Trending Topics */}
            <div>
              <h3 className="font-rajdhani font-bold text-white text-lg uppercase tracking-wider mb-6 flex items-center gap-3">
                <span className="w-1 h-5 bg-yellow-400 rounded-full" />
                Hot Topics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {topics.map((topic) => (
                  <div
                    key={topic.tag}
                    className="group p-3.5 bg-zinc-900/60 border border-zinc-800 hover:border-yellow-400/40 rounded-lg transition-all duration-200 cursor-default"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-rajdhani font-bold text-yellow-400 text-sm">
                        {topic.tag}
                      </div>
                      {topic.hot && (
                        <span className="text-xs bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded font-rajdhani font-bold uppercase text-[10px]">
                          Hot
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs font-inter mt-1">{topic.label}</div>
                    <div className="text-gray-600 text-xs font-rajdhani uppercase tracking-wider mt-1.5">
                      {topic.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter / Notify CTA */}
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="font-rajdhani font-bold text-yellow-400 text-xs uppercase tracking-widest">
                    Never Miss Intel
                  </span>
                </div>
                <h4 className="font-orbitron font-bold text-white text-lg mb-2 uppercase">
                  Enable Notifications
                </h4>
                <p className="font-inter text-gray-400 text-sm mb-5 leading-relaxed">
                  Hit the bell icon on YouTube to get notified the moment we drop new GTA 6 intel.
                </p>
                <a
                  href="https://www.youtube.com/@RAGEIntelYT?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded font-rajdhani font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-yellow-400/20"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
                  </svg>
                  Subscribe & Enable Bell
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Banner */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 rounded-xl overflow-hidden border border-zinc-800">
          {[
            { label: 'YouTube Channel', value: '@RAGEIntelYT', icon: '▶' },
            { label: 'Focus', value: 'GTA 6 & Rockstar', icon: '★' },
            { label: 'Content Style', value: 'Deep Dives', icon: '⚡' },
            { label: 'Mission', value: 'One-Stop Intel', icon: '🎯' },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900/80 p-5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-rajdhani font-bold text-white text-sm sm:text-base">{stat.value}</div>
              <div className="text-gray-500 text-xs font-inter mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
