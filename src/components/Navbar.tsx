// 8. src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ onOpenAuth, onOpenAdmin, onOpenProfile }: any) {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, getRole } = useAuth();
  const role = getRole(user?.roleId);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-black/90 backdrop-blur border-b border-yellow-400/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-yellow-400 font-orbitron font-black text-xl">RAGE INTEL</div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.isAdmin && <button onClick={onOpenAdmin} className="bg-yellow-400 text-black px-3 py-1 rounded text-xs font-bold uppercase">Admin</button>}
              <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenProfile}>
                {user.avatar ? <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="avatar"/> : <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-yellow-400 text-xs font-bold">{user.username[0]}</div>}
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold">{user.username}</span>
                  {role && <span style={{color: role.color}} className="text-[9px] uppercase font-bold">{role.tag}</span>}
                </div>
              </div>
              <button onClick={logout} className="text-red-500 text-xs font-bold uppercase">Logout</button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold text-xs uppercase">Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
}
