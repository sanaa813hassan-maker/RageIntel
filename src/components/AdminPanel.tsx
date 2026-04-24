// 5. src/components/AdminPanel.tsx
import { useState, useEffect } from 'react';
import { useAuth, AdminRole } from '../contexts/AuthContext';

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { user, hasPermission, getStoredRoles, saveRoles, getStoredUsers, updateUserAdminStatus, banUser, unbanUser } = useAuth();
  const [tab, setTab] = useState<'videos' | 'ticker' | 'users' | 'roles'>('videos');
  const [videos, setVideos] = useState<any[]>([]);
  const [ticker, setTicker] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<AdminRole[]>([]);
  
  // Role Form
  const [roleForm, setRoleForm] = useState<Partial<AdminRole>>({ name: '', tag: '', color: '#facc15', permissions: { canManageVideos: false, canManageTicker: false, canDeleteComments: false, canBanUsers: false, canManageAdmins: false, canEditDefaults: false }});
  
  // Ban Form
  const [banForm, setBanForm] = useState({ target: '', reason: '', days: '7' });

  useEffect(() => {
    setVideos(JSON.parse(localStorage.getItem('rageintel_videos') || '[]'));
    setTicker(JSON.parse(localStorage.getItem('rageintel_ticker') || '[]'));
    setUsers(getStoredUsers());
    setRoles(getStoredRoles());
  }, []);

  if (!user?.isAdmin) return null;

  const saveVids = (v: any[]) => { localStorage.setItem('rageintel_videos', JSON.stringify(v)); setVideos(v); };
  const saveTicks = (t: string[]) => { localStorage.setItem('rageintel_ticker', JSON.stringify(t)); setTicker(t); };

  const handleRoleSave = () => {
    if (!roleForm.name) return;
    const newRole = { ...roleForm, id: Date.now().toString() } as AdminRole;
    const upd = [...roles, newRole]; saveRoles(upd); setRoles(upd);
  };

  const handleBan = () => {
    if(!banForm.target) return;
    const date = banForm.days === 'perm' ? null : new Date(Date.now() + parseInt(banForm.days) * 86400000).toISOString();
    banUser(banForm.target, date, banForm.reason);
    setUsers(getStoredUsers()); setBanForm({ target: '', reason: '', days: '7' });
  };

  return (
    <div className="fixed inset-0 z-[90] flex bg-black/70" onClick={onClose}>
      <div className="w-full max-w-4xl h-full ml-auto bg-zinc-950 border-l border-zinc-800 p-6 overflow-y-auto" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between mb-6 border-b border-zinc-800 pb-4">
          <h2 className="font-orbitron text-2xl text-yellow-400">Control Center</h2>
          <button onClick={onClose} className="text-white">✕</button>
        </div>
        
        <div className="flex gap-4 mb-6">
          {hasPermission('canManageVideos') && <button onClick={()=>setTab('videos')} className={tab==='videos'?'text-yellow-400':'text-white'}>Videos</button>}
          {hasPermission('canManageTicker') && <button onClick={()=>setTab('ticker')} className={tab==='ticker'?'text-yellow-400':'text-white'}>Ticker</button>}
          {hasPermission('canBanUsers') && <button onClick={()=>setTab('users')} className={tab==='users'?'text-yellow-400':'text-white'}>Users</button>}
          {hasPermission('canManageAdmins') && <button onClick={()=>setTab('roles')} className={tab==='roles'?'text-yellow-400':'text-white'}>Roles</button>}
        </div>

        {tab === 'videos' && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Active Videos in feed. You can delete defaults here.</p>
            {videos.map(v => (
               <div key={v.id} className="flex justify-between bg-zinc-900 p-3 rounded">
                 <span className="text-white text-sm">{v.title}</span>
                 <button onClick={()=>saveVids(videos.filter(x=>x.id!==v.id))} className="text-red-500 text-sm">Delete</button>
               </div>
            ))}
          </div>
        )}

        {tab === 'ticker' && (
           <div className="space-y-4">
             <input type="text" placeholder="Add headline..." className="w-full bg-zinc-900 text-white p-2 rounded" onKeyDown={e => { if(e.key==='Enter'){ saveTicks([...ticker, e.currentTarget.value]); e.currentTarget.value=''; } }} />
             {ticker.map((t,i) => (
                <div key={i} className="flex justify-between bg-zinc-900 p-3 rounded">
                  <span className="text-white text-sm">{t}</span>
                  <button onClick={()=>saveTicks(ticker.filter((_,idx)=>idx!==i))} className="text-red-500 text-sm">Delete</button>
                </div>
             ))}
           </div>
        )}

        {tab === 'users' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 p-4 rounded-lg">
              <h3 className="text-yellow-400 font-bold mb-2">Ban User</h3>
              <div className="flex gap-2 mb-2">
                <input value={banForm.target} onChange={e=>setBanForm({...banForm, target:e.target.value})} placeholder="Username" className="bg-zinc-800 text-white p-2 rounded flex-1" />
                <select value={banForm.days} onChange={e=>setBanForm({...banForm, days:e.target.value})} className="bg-zinc-800 text-white p-2 rounded">
                  <option value="1">1 Day</option><option value="7">7 Days</option><option value="perm">Permanent</option>
                </select>
              </div>
              <input value={banForm.reason} onChange={e=>setBanForm({...banForm, reason:e.target.value})} placeholder="Reason..." className="w-full bg-zinc-800 text-white p-2 rounded mb-2" />
              <button onClick={handleBan} className="bg-red-600 text-white px-4 py-2 rounded">Ban</button>
            </div>
            {users.map(u => (
              <div key={u.username} className="flex items-center justify-between bg-zinc-900 p-3 rounded">
                <div>
                  <span className="text-white font-bold">{u.username}</span>
                  {u.banned && <span className="ml-2 text-red-500 text-xs">BANNED</span>}
                </div>
                <div className="flex gap-2">
                   {hasPermission('canManageAdmins') && (
                     <select value={u.roleId || ''} onChange={(e) => { updateUserAdminStatus(u.username, e.target.value); setUsers(getStoredUsers()); }} className="bg-zinc-800 text-white text-xs p-1 rounded">
                       <option value="">User</option>
                       {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                     </select>
                   )}
                   {u.banned && <button onClick={()=>{unbanUser(u.username); setUsers(getStoredUsers());}} className="text-green-500 text-xs">Unban</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'roles' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 p-4 rounded-lg space-y-3">
              <input type="text" placeholder="Role Name" onChange={e=>setRoleForm({...roleForm, name:e.target.value})} className="bg-zinc-800 text-white p-2 rounded w-full" />
              <input type="text" placeholder="Tag (e.g. MOD)" onChange={e=>setRoleForm({...roleForm, tag:e.target.value})} className="bg-zinc-800 text-white p-2 rounded w-full" />
              <input type="color" value={roleForm.color} onChange={e=>setRoleForm({...roleForm, color:e.target.value})} className="bg-zinc-800 p-1 rounded w-full" />
              <div className="grid grid-cols-2 gap-2 text-white text-sm">
                 {Object.keys(roleForm.permissions!).map(p => (
                   <label key={p}><input type="checkbox" checked={(roleForm.permissions as any)[p]} onChange={e => setRoleForm({...roleForm, permissions: {...roleForm.permissions, [p]: e.target.checked} as any})} className="mr-2"/>{p}</label>
                 ))}
              </div>
              <button onClick={handleRoleSave} className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">Create Role</button>
            </div>
            {roles.map(r => (
              <div key={r.id} className="bg-zinc-900 p-3 rounded flex justify-between items-center">
                <span style={{ color: r.color }} className="font-bold">[{r.tag}] {r.name}</span>
                {r.id !== 'owner' && <button onClick={()=>{ const upd = roles.filter(x=>x.id!==r.id); saveRoles(upd); setRoles(upd); }} className="text-red-500 text-xs">Delete</button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
