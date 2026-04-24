import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface Comment {
  id: string;
  videoId: string;
  username: string;
  text: string;
  createdAt: string;
  likes: number;
  likedBy: string[];
}

function getComments(videoId: string): Comment[] {
  try {
    const all = JSON.parse(localStorage.getItem('rageintel_comments') || '{}');
    return (all[videoId] || []).sort((a: Comment, b: Comment) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch { return []; }
}

function saveComment(comment: Comment) {
  try {
    const all = JSON.parse(localStorage.getItem('rageintel_comments') || '{}');
    if (!all[comment.videoId]) all[comment.videoId] = [];
    all[comment.videoId].push(comment);
    localStorage.setItem('rageintel_comments', JSON.stringify(all));
  } catch {}
}

function updateComment(comment: Comment) {
  try {
    const all = JSON.parse(localStorage.getItem('rageintel_comments') || '{}');
    if (!all[comment.videoId]) return;
    const idx = all[comment.videoId].findIndex((c: Comment) => c.id === comment.id);
    if (idx !== -1) all[comment.videoId][idx] = comment;
    localStorage.setItem('rageintel_comments', JSON.stringify(all));
  } catch {}
}

function deleteCommentFromStorage(videoId: string, commentId: string) {
  try {
    const all = JSON.parse(localStorage.getItem('rageintel_comments') || '{}');
    if (!all[videoId]) return;
    all[videoId] = all[videoId].filter((c: Comment) => c.id !== commentId);
    localStorage.setItem('rageintel_comments', JSON.stringify(all));
  } catch {}
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

interface CommentsProps {
  videoId: string;
  videoTitle: string;
  onAuthRequired: () => void;
}

export default function Comments({ videoId, videoTitle, onAuthRequired }: CommentsProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setComments(getComments(videoId));
  }, [videoId]);

  const handleSubmit = async () => {
    if (!user) { onAuthRequired(); return; }
    if (!text.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    const comment: Comment = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      videoId,
      username: user.username,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };
    saveComment(comment);
    setComments(getComments(videoId));
    setText('');
    setSubmitting(false);
  };

  const handleLike = (comment: Comment) => {
    if (!user) { onAuthRequired(); return; }
    const alreadyLiked = comment.likedBy.includes(user.username);
    const updated: Comment = {
      ...comment,
      likes: alreadyLiked ? comment.likes - 1 : comment.likes + 1,
      likedBy: alreadyLiked
        ? comment.likedBy.filter(u => u !== user.username)
        : [...comment.likedBy, user.username],
    };
    updateComment(updated);
    setComments(getComments(videoId));
  };

  const handleDelete = (comment: Comment) => {
    if (!user) return;
    if (user.username !== comment.username && !user.isAdmin) return;
    deleteCommentFromStorage(videoId, comment.id);
    setComments(getComments(videoId));
  };

  return (
    <div className="mt-6 border-t border-zinc-800 pt-6">
      <h4 className="font-rajdhani font-bold text-white text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-yellow-400">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Comments
        <span className="text-gray-600 font-inter font-normal text-xs">({comments.length})</span>
      </h4>

      {/* Input */}
      <div className="flex gap-3 mb-6">
        <div className="w-8 h-8 flex-shrink-0 bg-zinc-800 rounded-full flex items-center justify-center">
          {user ? (
            <span className="font-orbitron font-black text-yellow-400 text-xs">
              {user.username.charAt(0).toUpperCase()}
            </span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-zinc-600">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onClick={() => { if (!user) onAuthRequired(); }}
            placeholder={user ? `Comment on "${videoTitle}"...` : 'Sign in to comment...'}
            rows={2}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-yellow-400/40 text-white placeholder-zinc-600 px-3 py-2 rounded-lg font-inter text-sm outline-none transition-colors resize-none"
            readOnly={!user}
          />
          {text.trim() && user && (
            <div className="flex justify-end gap-2">
              <button onClick={() => setText('')} className="font-rajdhani font-bold text-xs text-gray-500 hover:text-white uppercase tracking-wider px-3 py-1.5 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="font-rajdhani font-bold text-xs bg-yellow-400 hover:bg-yellow-300 text-black uppercase tracking-wider px-4 py-1.5 rounded transition-all disabled:opacity-60 flex items-center gap-1.5"
              >
                {submitting && <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>}
                Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className="text-gray-600 font-inter text-sm text-center py-4">
          No comments yet. Be the first to drop some intel!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3 group">
              <div className="w-8 h-8 flex-shrink-0 bg-zinc-800 rounded-full flex items-center justify-center">
                <span className="font-orbitron font-black text-xs text-yellow-400">
                  {comment.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-rajdhani font-bold text-sm ${comment.username === 'RageIntel' ? 'text-yellow-400' : 'text-white'}`}>
                    {comment.username}
                    {comment.username === 'RageIntel' && (
                      <span className="ml-1.5 text-[9px] bg-yellow-400 text-black px-1.5 py-0.5 rounded uppercase font-orbitron font-black tracking-wider">
                        Admin
                      </span>
                    )}
                  </span>
                  <span className="text-gray-600 text-xs font-inter">{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-gray-300 font-inter text-sm mt-1 leading-relaxed break-words">{comment.text}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleLike(comment)}
                    className={`flex items-center gap-1 text-xs font-rajdhani font-semibold uppercase tracking-wider transition-colors ${
                      user && comment.likedBy.includes(user.username)
                        ? 'text-yellow-400'
                        : 'text-gray-600 hover:text-yellow-400'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill={user && comment.likedBy.includes(user.username) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                    {comment.likes > 0 && comment.likes}
                  </button>
                  {user && (user.username === comment.username || user.isAdmin) && (
                    <button
                      onClick={() => handleDelete(comment)}
                      className="text-xs font-rajdhani font-semibold uppercase tracking-wider text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
