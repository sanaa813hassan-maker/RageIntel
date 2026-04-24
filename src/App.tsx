// 9. src/App.tsx
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import ProfileModal from './components/ProfileModal';
import LoginPrompt from './components/LoginPrompt';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import VideoFeed from './components/VideoFeed';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar onOpenAuth={() => setShowAuth(true)} onOpenAdmin={() => setShowAdmin(true)} onOpenProfile={() => setShowProfile(true)} />
        <NewsTicker />
        <VideoFeed onAuthRequired={() => setShowAuth(true)} />
        
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
        <LoginPrompt onOpenAuth={() => setShowAuth(true)} />
      </div>
    </AuthProvider>
  );
}
