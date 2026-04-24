import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AdminVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
  youtubeUrl?: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

function getAdminVideos(): AdminVideo[] {
  try {
    return JSON.parse(localStorage.getItem('rageintel_videos') || '[]');
  } catch { return []; }
}

function saveAdminVideos(videos: AdminVideo[]) {
  localStorage.setItem('rageintel_videos', JSON.stringify(videos));
}

function getTickerHeadlines(): string[] {
  try {
    const stored = localStorage.getItem('rageintel_ticker');
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

function saveTickerHeadlines(headlines: string[]) {
  localStorage.setItem('rageintel_ticker', JSON.stringify(headlines));
}

function extractVideoId(input: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return input;
}

function getAllComments() {
  try {
    return JSON.parse(localStorage.getItem('rageintel_comments') || '{}');
  } catch { return {}; }
}

function getAllUsers() {
  try {
    return JSON.parse(localStorage.getItem('rageintel_users') || '[]');
  } catch { return []; }
}

type Tab = 'videos' | 'ticker' | 'comments' | 'users';

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('videos');
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [ticker, setTicker] = useState<string[]>([]);
  const [comments, setComments] = useState<Record<string, Array<{ id: string; username: string; text: string; createdAt: string; videoId: string; likes: number; likedBy: string[] }>>>({});
  const [users, setUsers] = useState<Array<{ username: string; email: string; joinedAt: string }>>([]);

  // Video form
  const [videoForm, setVideoForm] = useState({ url: '', title: '', description: '', duration: '', viewCount: '' });
  const [editingVideo, setEditingVideo] = useState<AdminVideo | null>(null);
  const [videoError, setVideoError] = useState('');
  const [videoSuccess, setVideoSuccess] = useState('');

  // Ticker form
  const [newHeadline, setNewHeadline] = useState('');

  useEffect(() => {
    setVideos(getAdminVideos());
    setTicker(getTickerHeadlines());
    setComments(getAllComments());
    setUsers(getAllUsers());
  }, []);

  if (!user?.isAdmin) return null;

  // ─── Video Management ───────────────────────────────────────────────────────
  const handleAddVideo = () => {
    setVideoError('');
    const videoId = extractVideoId(videoForm.url.trim());
    if (!videoId) { setVideoError('Enter a valid YouTube URL or video ID.'); return; }
    if (!videoForm.title.trim()) { setVideoError('Title is required.'); return; }

    const newVideo: AdminVideo = {
      id: videoId,
      title: videoForm.title.trim(),
      description: videoForm.description.trim(),
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: new Date().toISOString(),
      viewCount: videoForm.viewCount || undefined,
      duration: videoForm.duration || undefined,
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };

    const current = getAdminVideos();
    if (current.find(v => v.id === videoId)) { setVideoError('Video with this ID already exists.'); return; }
    const updated = [newVideo, ...current];
    saveAdminVideos(updated);
    setVideos(updated);
    setVideoForm({ url: '', title: '', description: '', duration: '', viewCount: '' });
    setVideoSuccess('Video added! Refresh the page to see it in the feed.');
    setTimeout(() => setVideoSuccess(''), 4000);
  };

  const handleUpdateVideo = () => {
    if (!editingVideo) return;
    setVideoError('');
    if (!editingVideo.title.trim()) { setVideoError('Title is required.'); return; }
    const current = getAdminVideos();
    const updated = current.map(v => v.id === editingVideo.id ? editingVideo : v);
    saveAdminVideos(updated);
    setVideos(updated);
    setEditingVideo(null);
    setVideoSuccess('Video updated!');
    setTimeout(() => setVideoSuccess(''), 3000);
  };

  const handleDeleteVideo = (id: string) => {
    const updated = getAdminVideos().filter(v => v.id !== id);
    saveAdminVideos(updated);
    setVideos(updated);
  };

  // ─── Ticker Management ───────────────────────────────────────────────────────
  const handleAddHeadline = () => {
    if (!newHeadline.trim()) return;
    const updated = [...ticker, newHeadline.trim()];
    saveTickerHeadlines(updated);
    setTicker(updated);
    setNewHeadline('');
  };

  const handleDeleteHeadline = (i: number) => {
    const updated = ticker.filter((_, idx) => idx !== i);
    saveTickerHeadlines(updated);
    setTicker(updated);
  };

  // ─── Comment Moderation ───────────────────────────────────────────────────────
  const handleDeleteComment = (videoId: string, commentId: string) => {
    const all = { ...comments };
    if (all[videoId]) {
      all[videoId] = all[videoId].filter(c => c.id !== commentId);
      localStorage.setItem('rageintel_comments', JSON.stringify(all));
      setComments(all);
    }
  };

  const allCommentsList = Object.values(comments).flat().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const tabs: { key: Tab; label: string; icon: JSX.Element }[] = [
    {
      key: 'videos', label: 'Videos',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.87v6.259a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /></svg>
    },
    {
      key: 'ticker', label: 'News Ticker',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    {
      key: 'comments', label: 'Comments',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    },
    {
      key: 'users', label: 'Users',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative ml-auto w-full max-w-3xl h-full bg-zinc-950 border-l border-zinc-800 flex flex-col overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="black" className="w-4 h-4">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <div>
              <div className="font-orbitron font-black text-white text-sm uppercase tracking-wider">Admin Panel</div>
              <div className="text-gray-600 text-xs font-inter">@RageIntel</div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 flex-shrink-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 font-rajdhani font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                tab === t.key
                  ? 'border-yellow-400 text-yellow-400'
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ── VIDEOS TAB ── */}
          {tab === 'videos' && (
            <div className="space-y-6">
              {videoError && <div className="p-3 bg-red-600/15 border border-red-600/40 rounded text-red-400 text-sm font-inter">{videoError}</div>}
              {videoSuccess && <div className="p-3 bg-green-600/15 border border-green-600/40 rounded text-green-400 text-sm font-inter">{videoSuccess}</div>}

              {/* Add / Edit form */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
                <h3 className="font-rajdhani font-bold text-white text-sm uppercase tracking-wider">
                  {editingVideo ? '✏️ Edit Video' : '➕ Add Video'}
                </h3>

                {!editingVideo && (
                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest font-rajdhani mb-1.5">YouTube URL or Video ID</label>
                    <input
                      value={videoForm.url}
                      onChange={e => setVideoForm(f => ({ ...f, url: e.target.value }))}
                      placeholder="https://youtube.com/watch?v=... or videoId"
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-3 py-2.5 rounded font-inter text-sm outline-none transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest font-rajdhani mb-1.5">Title *</label>
                  <input
                    value={editingVideo ? editingVideo.title : videoForm.title}
                    onChange={e => editingVideo ? setEditingVideo({ ...editingVideo, title: e.target.value }) : setVideoForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="GTA 6 Trailer 3 Analysis..."
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-3 py-2.5 rounded font-inter text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-widest font-rajdhani mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={editingVideo ? editingVideo.description : videoForm.description}
                    onChange={e => editingVideo ? setEditingVideo({ ...editingVideo, description: e.target.value }) : setVideoForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Video description..."
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-3 py-2.5 rounded font-inter text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest font-rajdhani mb-1.5">Duration</label>
                    <input
                      value={editingVideo ? (editingVideo.duration || '') : videoForm.duration}
                      onChange={e => editingVideo ? setEditingVideo({ ...editingVideo, duration: e.target.value }) : setVideoForm(f => ({ ...f, duration: e.target.value }))}
                      placeholder="10:25"
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-3 py-2.5 rounded font-inter text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest font-rajdhani mb-1.5">View Count</label>
                    <input
                      value={editingVideo ? (editingVideo.viewCount || '') : videoForm.viewCount}
                      onChange={e => editingVideo ? setEditingVideo({ ...editingVideo, viewCount: e.target.value }) : setVideoForm(f => ({ ...f, viewCount: e.target.value }))}
                      placeholder="15000"
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-3 py-2.5 rounded font-inter text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={editingVideo ? handleUpdateVideo : handleAddVideo}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded font-rajdhani font-black text-sm uppercase tracking-wider transition-all"
                  >
                    {editingVideo ? 'Update Video' : 'Add Video'}
                  </button>
                  {editingVideo && (
                    <button
                      onClick={() => setEditingVideo(null)}
                      className="border border-zinc-700 hover:border-zinc-500 text-gray-400 hover:text-white px-5 py-2.5 rounded font-rajdhani font-bold text-sm uppercase tracking-wider transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Video list */}
              {videos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-rajdhani font-bold text-gray-400 text-xs uppercase tracking-widest">
                    Manually Added Videos ({videos.length})
                  </h3>
                  {videos.map(v => (
                    <div key={v.id} className="flex gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-24 h-14 object-cover rounded flex-shrink-0 bg-zinc-800"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-rajdhani font-bold text-white text-sm line-clamp-1">{v.title}</div>
                        <div className="text-gray-600 text-xs font-inter mt-0.5">ID: {v.id}</div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => setEditingVideo(v)}
                          className="text-gray-500 hover:text-yellow-400 transition-colors p-1"
                          title="Edit"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(v.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          title="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                            <polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TICKER TAB ── */}
          {tab === 'ticker' && (
            <div className="space-y-5">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
                <h3 className="font-rajdhani font-bold text-white text-sm uppercase tracking-wider">➕ Add Headline</h3>
                <input
                  value={newHeadline}
                  onChange={e => setNewHeadline(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddHeadline()}
                  placeholder="🔥 GTA 6 Trailer 3 drops this month!"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-yellow-400/60 text-white placeholder-zinc-600 px-3 py-2.5 rounded font-inter text-sm outline-none transition-colors"
                />
                <button
                  onClick={handleAddHeadline}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded font-rajdhani font-black text-sm uppercase tracking-wider transition-all"
                >
                  Add Headline
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-rajdhani font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Custom Headlines ({ticker.length})
                  <span className="ml-2 text-zinc-700">· Default headlines show when empty</span>
                </h3>
                {ticker.length === 0 ? (
                  <p className="text-gray-600 text-sm font-inter py-2">No custom headlines. Using defaults.</p>
                ) : (
                  ticker.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                      <span className="flex-1 text-gray-300 text-sm font-inter leading-relaxed">{h}</span>
                      <button
                        onClick={() => handleDeleteHeadline(i)}
                        className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ── COMMENTS TAB ── */}
          {tab === 'comments' && (
            <div className="space-y-3">
              <h3 className="font-rajdhani font-bold text-gray-400 text-xs uppercase tracking-widest">
                All Comments ({allCommentsList.length})
              </h3>
              {allCommentsList.length === 0 ? (
                <p className="text-gray-600 text-sm font-inter py-2">No comments yet.</p>
              ) : (
                allCommentsList.map(c => (
                  <div key={c.id} className="flex gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg group">
                    <div className="w-7 h-7 flex-shrink-0 bg-zinc-800 rounded-full flex items-center justify-center">
                      <span className="font-orbitron font-black text-xs text-yellow-400">
                        {c.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-rajdhani font-bold text-white text-sm">{c.username}</span>
                        <span className="text-gray-600 text-xs font-inter">on video: {c.videoId}</span>
                      </div>
                      <p className="text-gray-400 text-sm font-inter mt-0.5 break-words">{c.text}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(c.videoId, c.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── USERS TAB ── */}
          {tab === 'users' && (
            <div className="space-y-3">
              <h3 className="font-rajdhani font-bold text-gray-400 text-xs uppercase tracking-widest">
                Registered Users ({users.length})
              </h3>
              {users.length === 0 ? (
                <p className="text-gray-600 text-sm font-inter py-2">No registered users yet.</p>
              ) : (
                users.map(u => (
                  <div key={u.username} className="flex items-center gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                    <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-orbitron font-black text-xs text-yellow-400">
                        {u.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-rajdhani font-bold text-white text-sm">{u.username}</div>
                      <div className="text-gray-600 text-xs font-inter">{u.email}</div>
                    </div>
                    <div className="ml-auto text-gray-600 text-xs font-inter">
                      {new Date(u.joinedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
