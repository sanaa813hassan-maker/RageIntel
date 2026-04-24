// 4. src/components/Comments.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface Comment {
  id: string; videoId: string; username: string; text: string; createdAt: string;
  likes: number; likedBy: string[]; dislikes: number; dislikedBy: string[]; parentId?: string;
}

function getComments(videoId: string): Comment[] {
  try { return (JSON.parse(localStorage.getItem('rageintel_comments') || '{}')[videoId] || []); } catch { return []; }
}
function saveComments(videoId: string, comments: Comment[]) {
  const all = JSON.parse(localStorage.getItem('rageintel_comments') || '{}');
  all[videoId] = comments; localStorage.setItem('rageintel_comments', JSON.stringify(all));
}

export default function Comments({ videoId, videoTitle, onAuthRequired }: { videoId: string, videoTitle: string, onAuthRequired: () => void }) {
  const { user, hasPermission } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  useEffect(() => { setComments(getComments(videoId)); }, [videoId]);

  const handleSubmit = (parentId?: string) => {
    if (!user) { onAuthRequired(); return; }
    if (!text.trim()) return;
    const newC: Comment = { id: Date.now().toString(), videoId, username: user.username, text: text.trim(), createdAt: new Date().toISOString(), likes: 0, likedBy: [], dislikes: 0, dislikedBy: [], parentId };
    const updated = [...comments, newC]; saveComments(videoId, updated); setComments(updated); setText(''); setReplyTo(null);
  };

  const handleVote = (id: string, type: 'like'|'dislike') => {
    if (!user) { onAuthRequired(); return; }
    const updated = comments.map(c => {
      if (c.id === id) {
        let { likes, likedBy, dislikes, dislikedBy } = c;
        if (type === 'like') {
          if (likedBy.includes(user.username)) { likes--; likedBy = likedBy.filter(u => u !== user.username); }
          else { likes++; likedBy.push(user.username); if (dislikedBy.includes(user.username)) { dislikes--; dislikedBy = dislikedBy.filter(u => u !== user.username); } }
        } else {
          if (dislikedBy.includes(user.username)) { dislikes--; dislikedBy = dislikedBy.filter(u => u !== user.username); }
          else { dislikes++; dislikedBy.push(user.username); if (likedBy.includes(user.username)) { likes--; likedBy = likedBy.filter(u => u !== user.username); } }
        }
        return { ...c, likes, likedBy, dislikes, dislikedBy };
      }
      return c;
    });
    saveComments(videoId, updated); setComments(updated);
  };

  const handleDelete = (id: string) => {
    const updated = comments.filter(c => c.id !== id && c.parentId !== id);
    saveComments(videoId, updated); setComments(updated);
  };

  const renderComment = (c: Comment, isReply = false) => (
    <div key={c.id} className={`flex gap-3 ${isReply ? 'ml-10 mt-3 border-l-2 border-zinc-800 pl-4' : 'mt-4'}`}>
      <div className="w-8 h-8 flex-shrink-0 bg-zinc-800 rounded-full flex justify-center items-center font-orbitron text-yellow-400 text-xs">
        {c.username[0].toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between"><span className="font-rajdhani font-bold text-white text-sm">{c.username}</span><span className="text-zinc-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span></div>
        <p className="text-zinc-300 text-sm mt-1">{c.text}</p>
        <div className="flex gap-3 mt-2 text-xs font-rajdhani text-zinc-500">
          <button onClick={() => handleVote(c.id, 'like')} className={`hover:text-yellow-400 ${c.likedBy.includes(user?.username||'')?'text-yellow-400':''}`}>▲ {c.likes}</button>
          <button onClick={() => handleVote(c.id, 'dislike')} className={`hover:text-red-400 ${c.dislikedBy.includes(user?.username||'')?'text-red-400':''}`}>▼ {c.dislikes}</button>
          {!isReply && <button onClick={() => setReplyTo(replyTo === c.id ? null : c.id)} className="hover:text-white">Reply</button>}
          {(user?.username === c.username || hasPermission('canDeleteComments')) && <button onClick={() => handleDelete(c.id)} className="hover:text-red-500">Delete</button>}
        </div>
        {replyTo === c.id && (
          <div className="mt-3 flex gap-2">
            <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-sm p-2 rounded" placeholder="Write a reply..." />
            <button onClick={() => handleSubmit(c.id)} className="bg-yellow-400 text-black px-3 rounded font-rajdhani font-bold text-sm">Post</button>
          </div>
        )}
        {comments.filter(reply => reply.parentId === c.id).map(reply => renderComment(reply, true))}
      </div>
    </div>
  );

  return (
    <div className="mt-6 border-t border-zinc-800 pt-4">
      <div className="flex gap-2 mb-4">
        <input value={replyTo === null ? text : ''} onChange={e => {if(!replyTo) setText(e.target.value)}} onClick={()=>{if(!user)onAuthRequired()}} className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-sm p-2 rounded" placeholder="Add a comment..." readOnly={!user} />
        {user && !replyTo && text && <button onClick={() => handleSubmit()} className="bg-yellow-400 text-black px-4 rounded font-rajdhani font-bold">Post</button>}
      </div>
      <div>{comments.filter(c => !c.parentId).map(c => renderComment(c))}</div>
    </div>
  );
}
