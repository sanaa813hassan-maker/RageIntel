export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/20">
                <svg viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
              <span className="font-orbitron font-black text-white text-lg tracking-wider uppercase">
                RAGE <span className="text-yellow-400">Intel</span>
              </span>
            </div>
            <p className="font-inter text-gray-500 text-sm leading-relaxed max-w-xs">
              Your one-stop channel for everything Rockstar related. GTA 6 leaks, theories, 
              and breaking news — all in one place.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.youtube.com/@RAGEIntelYT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-zinc-800 hover:bg-red-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/RAGEIntelYT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-zinc-800 hover:bg-sky-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 5.978 5.45-5.978zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@RAGEIntelYT"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-zinc-800 hover:bg-pink-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.28 8.28 0 0 0 4.84 1.55V6.78a4.85 4.85 0 0 1-1.07-.09z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-rajdhani font-bold text-white text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Latest Videos', href: '#videos' },
                { label: 'About Channel', href: '#about' },
                { label: 'Community', href: '#community' },
                { label: 'YouTube Channel', href: 'https://www.youtube.com/@RAGEIntelYT' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-inter text-gray-500 hover:text-yellow-400 text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 h-px bg-yellow-400 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-rajdhani font-bold text-white text-sm uppercase tracking-widest mb-4">
              Content Topics
            </h4>
            <ul className="space-y-2.5">
              {[
                'GTA 6 Leaks',
                'Trailer Breakdowns',
                'Rockstar News',
                'GTA Online',
                'Red Dead Redemption',
                'Fan Theories',
              ].map((topic) => (
                <li key={topic}>
                  <span className="font-inter text-gray-500 text-sm flex items-center gap-1.5">
                    <span className="text-yellow-400 text-xs">★</span>
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-gray-600 text-xs text-center sm:text-left">
            © {currentYear} RAGE Intel. All rights reserved. |{' '}
            <span className="text-gray-700">Not affiliated with Rockstar Games or Take-Two Interactive.</span>
          </p>
          <div className="flex items-center gap-1.5 text-gray-600 text-xs font-inter">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            <span>Built for the Rockstar Community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
