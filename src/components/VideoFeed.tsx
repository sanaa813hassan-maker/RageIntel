// 7. src/components/VideoFeed.tsx (Simplified to read initialized storage)
import { useState, useEffect } from 'react';
import Comments from './Comments';

export default function VideoFeed({ onAuthRequired }: { onAuthRequired: () => void }) {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchV = () => setVideos(JSON.parse(localStorage.getItem('rageintel_videos') || '[]'));
    fetchV(); const int = setInterval(fetchV, 3000); return () => clearInterval(int);
  }, []);

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-orbitron font-black text-4xl text-white uppercase mb-8">Recent <span className="text-yellow-400">Videos</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(v => (
            <div key={v.id} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              <img src={v.thumbnail} className="w-full aspect-video object-cover" alt="thumb"/>
              <div className="p-4">
                <h3 className="text-white font-bold line-clamp-2">{v.title}</h3>
                <Comments videoId={v.id} videoTitle={v.title} onAuthRequired={onAuthRequired} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
