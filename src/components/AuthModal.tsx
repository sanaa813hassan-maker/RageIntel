import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async () => {
    setError('');
    if (!form.password) { setError('Password is required.'); return; }

    if (mode === 'signup') {
      if (!form.username.trim()) { setError('Username is required.'); return; }
      if (!form.email.trim()) { setError('Email is required.'); return; }
      if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
      setLoading(true);
      const res = await signup(form.username.trim(), form.email.trim(), form.password);
      setLoading(false);
      if (res.success) { onClose(); } else { setError(res.error || 'Signup failed.'); }
    } else {
      if (!form.username.trim()) { setError('Username or email is required.'); return; }
      setLoading(true);
      const res = await login(form.username.trim(), form.password);
      setLoading(false);
      if (res.success) { onClose(); } else { setError(res.error || 'Login failed.'); }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/60"
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-yellow-400 to-red-600" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="black" className="w-4 h-4">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
              <span className="font-orbitron font-black text-white text-base uppercase tracking-wider">
                RAGE <span className="text-yellow-400">Intel</span>
              </span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-zinc-900 rounded-lg p-1 mb-7">
            {(['login', 'signup'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setError(''); }}
                className={`flex-1 py-2 rounded font-rajdhani font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                  mode === tab
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block font-rajdhani font-semibold text-gray-400 text-xs uppercase tracking-widest mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  placeholder="YourUsername"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-inter text-sm outline-none transition-colors"
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            )}

            <div>
              <label className="block font-rajdhani font-semibold text-gray-400 text-xs uppercase tracking-widest mb-2">
                {mode === 'login' ? 'Username or Email' : 'Email'}
              </label>
              <input
                type={mode === 'signup' ? 'email' : 'text'}
                value={mode === 'signup' ? form.email : form.username}
                onChange={e => setForm(f => mode === 'signup' ? { ...f, email: e.target.value } : { ...f, username: e.target.value })}
                placeholder={mode === 'login' ? 'username or email' : 'you@example.com'}
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-inter text-sm outline-none transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <div>
              <label className="block font-rajdhani font-semibold text-gray-400 text-xs uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-inter text-sm outline-none transition-colors"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block font-rajdhani font-semibold text-gray-400 text-xs uppercase tracking-widest mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-4 py-3 rounded-lg font-inter text-sm outline-none transition-colors"
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-600/15 border border-red-600/40 rounded-lg text-red-400 text-sm font-inter">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-black py-3 rounded-lg font-rajdhani font-black text-sm uppercase tracking-wider transition-all duration-200 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              ) : null}
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <p className="text-center text-gray-600 text-xs font-inter mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
