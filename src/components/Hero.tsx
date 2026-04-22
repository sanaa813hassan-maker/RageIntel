import { useEffect, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      {/* Neon grid lines */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(250,204,21,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Neon glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Tag line */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-rajdhani font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          GTA 6 | Rockstar Games | Intel
        </div>

        {/* Star Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/40">
              <svg viewBox="0 0 24 24" fill="black" className="w-11 h-11">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-xl opacity-30 animate-pulse" />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-8xl text-white uppercase tracking-tight leading-none mb-2">
          RAGE
        </h1>
        <h1 className="font-orbitron font-black text-5xl sm:text-7xl lg:text-8xl text-yellow-400 uppercase tracking-tight leading-none mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]">
          INTEL
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-gradient-to-r from-transparent to-yellow-400/60 w-24 sm:w-40" />
          <div className="w-2 h-2 bg-yellow-400 rotate-45" />
          <div className="h-px bg-gradient-to-l from-transparent to-yellow-400/60 w-24 sm:w-40" />
        </div>

        {/* Subtitle */}
        <p className="font-inter text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Your <span className="text-yellow-400 font-semibold">one-stop channel</span> for everything Rockstar related.
          GTA 6 leaks, theories, updates, and deep-dive analysis — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.youtube.com/@RAGEIntelYT"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded font-rajdhani font-bold text-base uppercase tracking-wider transition-all duration-300 shadow-xl shadow-red-600/40 hover:shadow-red-500/60 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe Now
          </a>
          <a
            href="#videos"
            className="flex items-center gap-3 border border-yellow-400/50 hover:border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-4 rounded font-rajdhani font-bold text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <polygon points="5,3 19,12 5,21" fill="currentColor" />
            </svg>
            Watch Latest
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { value: 'GTA 6', label: 'Leaks & Theories' },
            { value: 'R★', label: 'Rockstar Coverage' },
            { value: '24/7', label: 'Fresh Intel' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-orbitron font-black text-2xl sm:text-3xl text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                {stat.value}
              </div>
              <div className="font-rajdhani text-gray-400 text-sm uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="font-rajdhani text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>
    </section>
  );
}
