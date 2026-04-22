export default function About() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
      title: 'GTA 6 Leaks',
      desc: 'We track every credible leak, insider tip, and data-mine so you stay ahead of the curve.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Theories & Analysis',
      desc: 'Deep-dive breakdowns of trailers, screenshots, and Rockstar\'s cryptic hints.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.87v6.259a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
        </svg>
      ),
      title: 'Video Breakdowns',
      desc: 'Frame-by-frame analysis of every GTA 6 trailer and official Rockstar media drop.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Breaking News',
      desc: 'Be the first to know. We cover Rockstar news as it happens, around the clock.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Community Driven',
      desc: 'Built by fans, for fans. We amplify the best community discoveries and theories.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 1.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0 0 21 18.382V7.618a1 1 0 0 0-1.447-.894L15 9m0 8V9m0 0L9 7" />
        </svg>
      ),
      title: 'All Rockstar Games',
      desc: 'Beyond GTA 6 — Red Dead, GTA Online, and everything in the Rockstar universe.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-zinc-950 relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 top-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-rajdhani font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-yellow-400" />
              About The Channel
            </div>

            <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight mb-6">
              Your One-Stop{' '}
              <span className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                Rockstar
              </span>{' '}
              HQ
            </h2>

            <div className="space-y-5 font-inter text-gray-400 leading-relaxed">
              <p className="text-lg">
                <span className="text-white font-semibold">RAGE Intel</span> is your dedicated source for all things Rockstar Games.
                Whether it's the latest GTA 6 leaks, in-depth trailer breakdowns, wild fan theories,
                or breaking Rockstar news — we cover it all.
              </p>
              <p>
                We started this channel with one mission: to build the most comprehensive, community-first
                hub for Rockstar Games content on YouTube. No fluff, no clickbait — just pure, well-researched
                intel delivered straight to you.
              </p>
              <p>
                From Vice City's neon-soaked streets to the mountains of San Andreas, we're tracking
                every single detail Rockstar drops. <span className="text-yellow-400 font-medium">Subscribe and never miss a drop.</span>
              </p>
            </div>

            {/* Channel link */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@RAGEIntelYT"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded font-rajdhani font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-500/50"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                @RAGEIntelYT
              </a>
              <a
                href="#community"
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-yellow-400/50 text-gray-300 hover:text-yellow-400 px-6 py-3 rounded font-rajdhani font-bold text-sm uppercase tracking-wider transition-all duration-200"
              >
                Join Community
              </a>
            </div>
          </div>

          {/* Right: Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-5 bg-black/50 border border-zinc-800 hover:border-yellow-400/40 rounded-lg transition-all duration-300 hover:bg-yellow-400/5"
              >
                <div className="text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {feature.icon}
                </div>
                <h3 className="font-rajdhani font-bold text-white text-base mb-1.5 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand card */}
        <div className="mt-20 relative rounded-xl overflow-hidden border border-zinc-800">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-red-600/5" />

          <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/30">
                  <svg viewBox="0 0 24 24" fill="black" className="w-11 h-11">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-20" />
              </div>
              <div>
                <div className="font-orbitron font-black text-2xl text-white uppercase">RAGE Intel</div>
                <div className="text-gray-400 font-inter text-sm mt-1">@RAGEIntelYT • YouTube</div>
                <div className="text-gray-500 font-inter text-xs mt-0.5">Est. March 2026</div>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="font-orbitron font-bold text-yellow-400 text-xl">
                "Your one-stop channel for everything Rockstar related."
              </div>
              <div className="text-gray-500 font-inter text-sm mt-2 italic">— Channel Mission</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
