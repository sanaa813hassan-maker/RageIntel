import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsTicker from './components/NewsTicker';
import VideoFeed from './components/VideoFeed';
import About from './components/About';
import Community from './components/Community';
import Footer from './components/Footer';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* تم تمرير وظائف فتح النوافذ للـ Navbar */}
        <Navbar 
          onOpenAuth={() => setShowAuth(true)} 
          onOpenAdmin={() => setShowAdmin(true)} 
        />

        {/* Hero Section */}
        <Hero />

        {/* Breaking News Ticker */}
        <NewsTicker />

        {/* Latest Videos */}
        <VideoFeed />

        {/* About Section */}
        <About />

        {/* Community Section */}
        <Community />

        {/* Footer */}
        <Footer />

        {/* النوافذ المنبثقة (Modals) */}
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

        {/* زر العودة للأعلى */}
        <ScrollToTop />
      </div>
    </AuthProvider>
  );
}

function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full flex items-center justify-center shadow-xl shadow-yellow-400/30 hover:shadow-yellow-400/50 transition-all duration-300 hover:-translate-y-0.5 group"
      aria-label="Scroll to top"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300"
      >
        <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
