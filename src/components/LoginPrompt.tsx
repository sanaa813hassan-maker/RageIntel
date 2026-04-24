// 2. src/components/LoginPrompt.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPrompt({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!user && !sessionStorage.getItem('rageintel_prompted')) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-zinc-900 border border-yellow-400 p-4 rounded-lg shadow-2xl shadow-yellow-400/20 max-w-sm animate-in slide-in-from-bottom-5">
      <h3 className="font-orbitron font-bold text-white mb-2">Welcome to RAGE Intel!</h3>
      <p className="text-gray-400 text-sm font-inter mb-4">Sign in to drop comments, like videos, and join the community.</p>
      <div className="flex gap-3">
        <button onClick={() => { setShow(false); sessionStorage.setItem('rageintel_prompted', 'true'); onOpenAuth(); }} className="bg-yellow-400 text-black px-4 py-2 rounded font-rajdhani font-bold text-xs uppercase">Sign In / Join</button>
        <button onClick={() => { setShow(false); sessionStorage.setItem('rageintel_prompted', 'true'); }} className="text-gray-500 hover:text-white font-rajdhani font-bold text-xs uppercase px-2">Dismiss</button>
      </div>
    </div>
  );
}
