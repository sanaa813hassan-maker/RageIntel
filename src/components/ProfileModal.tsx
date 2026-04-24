// 3. src/components/ProfileModal.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileModal({ onClose }: { onClose: () => void }) {
  const { user, updateAvatar, changePassword } = useAuth();
  const [tab, setTab] = useState<'avatar' | 'security'>('avatar');
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  if (!user) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { updateAvatar(reader.result as string); setMsg({ text: 'Avatar updated!', type: 'success' }); };
      reader.readAsDataURL(file);
    }
  };

  const handlePassword = async () => {
    const res = await changePassword(oldPw, newPw);
    if (res.success) { setMsg({ text: 'Password changed successfully.', type: 'success' }); setOldPw(''); setNewPw(''); }
    else { setMsg({ text: res.error || 'Error', type: 'error' }); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between mb-6">
          <h2 className="font-orbitron font-bold text-xl text-yellow-400">Your Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
        </div>
        <div className="flex gap-4 mb-6 border-b border-zinc-800 pb-2">
          <button onClick={() => setTab('avatar')} className={`font-rajdhani font-bold uppercase ${tab === 'avatar' ? 'text-yellow-400' : 'text-gray-500'}`}>Avatar</button>
          <button onClick={() => setTab('security')} className={`font-rajdhani font-bold uppercase ${tab === 'security' ? 'text-yellow-400' : 'text-gray-500'}`}>Security</button>
        </div>
        {msg.text && <div className={`p-2 mb-4 text-sm rounded ${msg.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{msg.text}</div>}
        
        {tab === 'avatar' && (
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-zinc-800 overflow-hidden border-2 border-yellow-400 flex items-center justify-center">
              {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-3xl text-yellow-400 font-orbitron">{user.username[0]}</span>}
            </div>
            <label className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded cursor-pointer inline-block font-rajdhani text-sm uppercase">
              Upload New Image <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          </div>
        )}

        {tab === 'security' && (
          <div className="space-y-4">
            <input type="password" placeholder="Current Password" value={oldPw} onChange={e => setOldPw(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 rounded" />
            <input type="password" placeholder="New Password" value={newPw} onChange={e => setNewPw(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 text-white p-2 rounded" />
            <button onClick={handlePassword} className="w-full bg-yellow-400 text-black font-bold py-2 rounded uppercase font-rajdhani">Change Password</button>
          </div>
        )}
      </div>
    </div>
  );
}
