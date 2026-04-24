// 1. src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type RolePermissions = {
  canManageVideos: boolean;
  canManageTicker: boolean;
  canDeleteComments: boolean;
  canBanUsers: boolean;
  canManageAdmins: boolean;
  canEditDefaults: boolean;
};

export interface AdminRole {
  id: string;
  name: string;
  tag: string;
  color: string;
  permissions: RolePermissions;
}

export interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  roleId?: string;
  joinedAt: string;
  avatar?: string;
  banned?: boolean;
  bannedUntil?: string | null;
  banReason?: string;
}

interface StoredUser extends User { passwordHash: string; }

interface AuthContextType {
  user: User | null;
  login: (u: string, p: string) => Promise<{ success: boolean; error?: string }>;
  signup: (u: string, e: string, p: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  changePassword: (o: string, n: string) => Promise<{ success: boolean; error?: string }>;
  updateAvatar: (b64: string) => void;
  isAuthenticated: boolean;
  getRole: (id?: string) => AdminRole | null;
  hasPermission: (p: keyof RolePermissions) => boolean;
  getStoredRoles: () => AdminRole[];
  saveRoles: (roles: AdminRole[]) => void;
  getStoredUsers: () => User[];
  updateUserAdminStatus: (username: string, roleId: string | null) => void;
  banUser: (username: string, until: string | null, reason: string) => void;
  unbanUser: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_USERNAME = 'RageIntel';
const ADMIN_PASSWORD = 'V1c3C1ty@R@G3#2026!';

const OWNER_ROLE: AdminRole = {
  id: 'owner', name: 'Owner', tag: 'OWNER', color: '#facc15',
  permissions: { canManageVideos: true, canManageTicker: true, canDeleteComments: true, canBanUsers: true, canManageAdmins: true, canEditDefaults: true }
};

const DEFAULT_HEADLINES = [
  '🔥 GTA 6 Trailer 3 rumored for Spring 2026',
  '⚡ New GTA 6 map leaks surface — Vice City confirmed',
  '🎮 Rockstar Games hints at revolutionary online mode'
];

const DEFAULT_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'My Final Predictions for GTA 6 Trailer 3', description: 'Breaking down evidence.', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg', publishedAt: new Date().toISOString() }
];

function hashish(str: string) { return btoa(str + '::rageintel_salt_2026'); }
function getRawUsers(): StoredUser[] { try { return JSON.parse(localStorage.getItem('rageintel_users') || '[]'); } catch { return []; } }
function saveRawUsers(u: StoredUser[]) { localStorage.setItem('rageintel_users', JSON.stringify(u)); }

function initializeDefaults() {
  if (!localStorage.getItem('rageintel_init')) {
    localStorage.setItem('rageintel_ticker', JSON.stringify(DEFAULT_HEADLINES));
    localStorage.setItem('rageintel_videos', JSON.stringify(DEFAULT_VIDEOS));
    localStorage.setItem('rageintel_init', 'true');
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    initializeDefaults();
    const stored = localStorage.getItem('rageintel_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.username !== ADMIN_USERNAME) {
          const found = getRawUsers().find(u => u.username === parsed.username);
          if (found && found.banned && (!found.bannedUntil || new Date(found.bannedUntil) > new Date())) {
            localStorage.removeItem('rageintel_user'); return;
          }
          if (found) {
            setUser({ ...parsed, avatar: found.avatar, isAdmin: found.isAdmin, roleId: found.roleId });
            return;
          }
        }
        setUser(parsed);
      } catch { localStorage.removeItem('rageintel_user'); }
    }
  }, []);

  const getStoredRoles = (): AdminRole[] => {
    try { const r = localStorage.getItem('rageintel_roles'); return r ? JSON.parse(r) : [OWNER_ROLE]; } catch { return [OWNER_ROLE]; }
  };
  const saveRoles = (roles: AdminRole[]) => localStorage.setItem('rageintel_roles', JSON.stringify(roles));
  const getRole = (id?: string) => id ? getStoredRoles().find(r => r.id === id) || null : null;
  const getStoredUsers = () => getRawUsers().map(u => ({ ...u, passwordHash: '' }));

  const hasPermission = (p: keyof RolePermissions) => {
    if (!user?.isAdmin) return false;
    if (user.username === ADMIN_USERNAME) return true;
    return getRole(user.roleId)?.permissions[p] ?? false;
  };

  const login = async (u: string, p: string) => {
    if (u === ADMIN_USERNAME && p === (localStorage.getItem('rageintel_owner_pw') ? atob(localStorage.getItem('rageintel_owner_pw')!) : ADMIN_PASSWORD)) {
      const adminUser: User = { username: ADMIN_USERNAME, email: 'admin@rageintel.com', isAdmin: true, roleId: 'owner', joinedAt: new Date().toISOString() };
      setUser(adminUser); localStorage.setItem('rageintel_user', JSON.stringify(adminUser)); return { success: true };
    }
    const found = getRawUsers().find(x => (x.username.toLowerCase() === u.toLowerCase() || x.email.toLowerCase() === u.toLowerCase()) && x.passwordHash === hashish(p));
    if (!found) return { success: false, error: 'Invalid credentials.' };
    if (found.banned && (!found.bannedUntil || new Date(found.bannedUntil) > new Date())) return { success: false, error: `Banned: ${found.banReason || 'No reason'}` };
    
    const loggedIn = { username: found.username, email: found.email, isAdmin: found.isAdmin, roleId: found.roleId, joinedAt: found.joinedAt, avatar: found.avatar };
    setUser(loggedIn); localStorage.setItem('rageintel_user', JSON.stringify(loggedIn)); return { success: true };
  };

  const signup = async (u: string, e: string, p: string) => {
    if (u.toLowerCase() === 'rageintel') return { success: false, error: 'Reserved username.' };
    const users = getRawUsers();
    if (users.find(x => x.username.toLowerCase() === u.toLowerCase() || x.email.toLowerCase() === e.toLowerCase())) return { success: false, error: 'Username or email taken.' };
    const newUser: StoredUser = { username: u, email: e, passwordHash: hashish(p), isAdmin: false, joinedAt: new Date().toISOString() };
    users.push(newUser); saveRawUsers(users);
    const loggedIn = { username: u, email: e, isAdmin: false, joinedAt: newUser.joinedAt };
    setUser(loggedIn); localStorage.setItem('rageintel_user', JSON.stringify(loggedIn)); return { success: true };
  };

  const changePassword = async (o: string, n: string) => {
    if (!user) return { success: false, error: 'Not logged in.' };
    if (user.username === ADMIN_USERNAME) {
      if (o !== (localStorage.getItem('rageintel_owner_pw') ? atob(localStorage.getItem('rageintel_owner_pw')!) : ADMIN_PASSWORD)) return { success: false, error: 'Wrong password.' };
      localStorage.setItem('rageintel_owner_pw', btoa(n)); return { success: true };
    }
    const users = getRawUsers();
    const idx = users.findIndex(x => x.username === user.username);
    if (users[idx].passwordHash !== hashish(o)) return { success: false, error: 'Wrong password.' };
    users[idx].passwordHash = hashish(n); saveRawUsers(users); return { success: true };
  };

  const updateAvatar = (b64: string) => {
    if (!user) return;
    const upd = { ...user, avatar: b64 }; setUser(upd); localStorage.setItem('rageintel_user', JSON.stringify(upd));
    const users = getRawUsers(); const idx = users.findIndex(x => x.username === user.username);
    if (idx !== -1) { users[idx].avatar = b64; saveRawUsers(users); }
  };

  const updateUserAdminStatus = (username: string, roleId: string | null) => {
    const users = getRawUsers(); const idx = users.findIndex(u => u.username === username);
    if (idx !== -1) { users[idx].isAdmin = !!roleId; users[idx].roleId = roleId || undefined; saveRawUsers(users); }
  };

  const banUser = (username: string, until: string | null, reason: string) => {
    const users = getRawUsers(); const idx = users.findIndex(u => u.username === username);
    if (idx !== -1) { users[idx].banned = true; users[idx].bannedUntil = until; users[idx].banReason = reason; saveRawUsers(users); }
  };

  const unbanUser = (username: string) => {
    const users = getRawUsers(); const idx = users.findIndex(u => u.username === username);
    if (idx !== -1) { users[idx].banned = false; users[idx].bannedUntil = null; users[idx].banReason = ''; saveRawUsers(users); }
  };

  const logout = () => { setUser(null); localStorage.removeItem('rageintel_user'); };

  return <AuthContext.Provider value={{ user, login, signup, logout, changePassword, updateAvatar, isAuthenticated: !!user, getRole, hasPermission, getStoredRoles, saveRoles, getStoredUsers, updateUserAdminStatus, banUser, unbanUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => { const ctx = useContext(AuthContext); if (!ctx) throw new Error('Error'); return ctx; };
