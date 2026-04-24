import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ onOpenAuth, onOpenAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Videos', href: '#videos' },
    { label: 'About', href: '#about' },
    { label: 'Community', href: '#community' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-yellow-400/20 shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="text-yellow-400 font-orbitron font-black text-xl tracking-tighter">
              RAGE INTEL
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-yellow-400 font-rajdhani font-bold text-sm uppercase tracking-widest transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* أزرار الحساب ولوحة التحكم */}
            {user ? (
              <div className="flex items-center gap-4">
                {user.isAdmin && (
                  <button 
                    onClick={onOpenAdmin}
                    className="bg-yellow-400 text-black px-4 py-1.5 rounded font-rajdhani font-bold text-xs uppercase hover:bg-yellow-300 transition-all"
                  >
                    Admin Panel
                  </button>
                )}
                <span className="text-white font-rajdhani text-sm border-l border-zinc-700 pl-4">
                  {user.username}
                </span>
                <button onClick={logout} className="text-red-500 font-rajdhani font-bold text-xs uppercase hover:text-red-400">
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="bg-zinc-900 border border-zinc-700 text-white px-5 py-2 rounded font-rajdhani font-bold text-xs uppercase hover:border-yellow-400 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-yellow-400 p-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen opacity-100 border-b border-yellow-400/20' : 'max-h-0 opacity-0 overflow-hidden'
        } bg-black/95 backdrop-blur-md`}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 font-rajdhani font-bold text-lg uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-zinc-800">
            {user ? (
              <div className="flex flex-col gap-4">
                <span className="text-yellow-400 font-rajdhani font-bold">User: {user.username}</span>
                {user.isAdmin && (
                  <button onClick={() => { onOpenAdmin(); setMenuOpen(false); }} className="bg-yellow-400 text-black p-2 rounded font-bold uppercase text-sm">
                    Admin Panel
                  </button>
                )}
                <button onClick={logout} className="text-red-500 text-left font-bold uppercase text-sm">Logout</button>
              </div>
            ) : (
              <button onClick={() => { onOpenAuth(); setMenuOpen(false); }} className="w-full bg-yellow-400 text-black p-3 rounded font-bold uppercase text-sm">
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
