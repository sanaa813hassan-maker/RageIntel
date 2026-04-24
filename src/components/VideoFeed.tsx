import { useState, useEffect } from 'react';
import Comments from './Comments';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
}

const DEFAULT_FALLBACK_VIDEOS: Video[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'My Final Predictions for GTA 6 Trailer 3',
    description: 'Breaking down all the evidence and making my final predictions for the GTA 6 Trailer 3 release. Could it drop in April or May 2026?',
    thumbnail: `https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg`,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    viewCount: '8',
    duration: '7:30',
  },
  {
    id: 'oHg5SJYRHA0',
    title: 'GTA 6 NEEDS This Feature',
    description: 'There is one feature that GTA 6 absolutely NEEDS to include.',
    thumbnail: `https://i.ytimg.com/vi/oHg5SJYRHA0/hqdefault.jpg`,
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    viewCount: '549',
    duration: '5:50',
  },
  {
    id: 'aBcDeFgHiJk',
    title: 'GTA 6 Map LEAKED – Everything We Know',
    description: 'The GTA 6 map leaks are getting more detailed.',
    thumbnail: `https://i.ytimg.com/vi/aBcDeFgHiJk/hqdefault.jpg`,
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    viewCount: '1.2K',
    duration: '12:45',
  },
  {
    id: 'xYzAbCdEfGh',
    title: "Rockstar's SECRET Plans for GTA Online After GTA 6",
    description: "What happens to GTA Online when GTA 6 drops?",
    thumbnail: `https://i.ytimg.com/vi/xYzAbCdEfGh/hqdefault.jpg`,
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    viewCount: '892',
    duration: '9:22',
  },
  {
    id: 'mNoPqRsTuVw',
    title: 'GTA 6 Release Date – The Truth Revealed',
    description: "Let us decode all the clues and figure out the REAL GTA 6 release date window.",
    thumbnail: `https://i.ytimg.com/vi/mNoPqRsTuVw/hqdefault.jpg`,
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    viewCount: '3.4K',
    duration: '14:18',
  },
  {
    id: 'iJkLmNoPqRs',
    title: 'Every GTA 6 Easter Egg Found So Far',
    description: 'A complete roundup of every easter egg found in the GTA 6 trailer.',
    thumbnail: `https://i.ytimg.com/vi/iJkLmNoPqRs/hqdefault.jpg`,
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    viewCount: '2.1K',
    duration: '18:05',
  },
];

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  return `${months}mo ago`;
}

function formatViewCount(count?: string): string {
  if (!count) return '';
  const num = parseInt(count);
  if (isNaN(num)) return count;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return count;
}

function getAdminVideos(): Video[] {
  try {
    return JSON.parse(localStorage.getItem('rageintel_videos') || '[]');
  } catch { return []; }
}

function VideoCard({
  video,
  featured = false,
  onAuthRequired,
}: {
  video: Video;
  featured?: boolean;
  onAuthRequired: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      className={`group bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 rounded-lg overflow-hidden transition-all duration-300 ${
        featured ? 'col-span-full md:col-span-2' : ''
      }`}
    >
      {/* Thumbnail */}
      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden bg-zinc-800 aspect-video"
      >
        {!imgError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-16 h-16 text-zinc-600">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
        )}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs font-bold px-1.5 py-0.5 rounded font-rajdhani">
            {video.duration}
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600/90 flex items-center justify-center shadow-xl shadow-red-600/40 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        {new Date(video.publishedAt).getTime() > Date.now() - 86400000 * 3 && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-orbitron font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
            New
          </div>
        )}
      </a>

      {/* Info */}
      <div className="p-4">
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 className={`font-rajdhani font-bold text-white hover:text-yellow-400 transition-colors duration-200 leading-snug line-clamp-2 cursor-pointer ${featured ? 'text-xl' : 'text-base'}`}>
            {video.title}
          </h3>
        </a>

        {featured && (
          <p className="text-gray-400 text-sm mt-2 line-clamp-2 font-inter leading-relaxed">
            {video.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="black" className="w-3 h-3">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
            <span className="font-rajdhani text-gray-400 text-xs font-semibold uppercase tracking-wider">RAGE Intel</span>
          </div>
          <span className="text-gray-600 text-xs">•</span>
          <span className="text-gray-500 text-xs font-inter">{formatTimeAgo(video.publishedAt)}</span>
          {video.viewCount && (
            <>
              <span className="text-gray-600 text-xs">•</span>
              <span className="text-gray-500 text-xs font-inter">{formatViewCount(video.viewCount)} views</span>
            </>
          )}

          {/* Comments toggle */}
          <button
            onClick={() => setShowComments(s => !s)}
            className="ml-auto flex items-center gap-1 text-gray-600 hover:text-yellow-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs font-rajdhani font-semibold uppercase tracking-wider">
              {showComments ? 'Hide' : 'Comments'}
            </span>
          </button>
        </div>

        {showComments && (
          <Comments
            videoId={video.id}
            videoTitle={video.title}
            onAuthRequired={onAuthRequired}
          />
        )}
      </div>
    </div>
  );
}

interface VideoFeedProps {
  onAuthRequired: () => void;
}

export default function VideoFeed({ onAuthRequired }: VideoFeedProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiWorked, setApiWorked] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      const API_KEY = (import.meta as { env?: { VITE_YOUTUBE_API_KEY?: string } }).env?.VITE_YOUTUBE_API_KEY || '';
      const CHANNEL_HANDLE = '@RAGEIntelYT';

      // Get admin-added videos
      const adminVideos = getAdminVideos();

      if (!API_KEY) {
        setTimeout(() => {
          // Merge admin videos with fallbacks (admin first, no duplicates)
          const fallbackIds = new Set(adminVideos.map(v => v.id));
          const merged = [...adminVideos, ...DEFAULT_FALLBACK_VIDEOS.filter(v => !fallbackIds.has(v.id))];
          setVideos(merged);
          setLoading(false);
        }, 800);
        return;
      }

      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
        );
        const channelData = await channelRes.json();
        const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsPlaylistId) throw new Error('No uploads playlist');

        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&key=${API_KEY}`
        );
        const playlistData = await playlistRes.json();
        if (!playlistData.items?.length) throw new Error('No videos');

        const videoIds = playlistData.items.map(
          (item: { snippet: { resourceId: { videoId: string } } }) => item.snippet.resourceId.videoId
        ).join(',');

        const videoDetailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
        );
        const videoDetailsData = await videoDetailsRes.json();

        const fetchedVideos: Video[] = (videoDetailsData.items || []).map(
          (item: {
            id: string;
            snippet: { title: string; description: string; thumbnails: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } }; publishedAt: string };
            statistics?: { viewCount?: string };
            contentDetails?: { duration?: string };
          }) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
            publishedAt: item.snippet.publishedAt,
            viewCount: item.statistics?.viewCount,
            duration: formatDuration(item.contentDetails?.duration || ''),
          })
        );

        // Merge admin + API (admin first, deduplicate)
        const apiIds = new Set(fetchedVideos.map(v => v.id));
        const merged = [...adminVideos.filter(v => !apiIds.has(v.id)), ...fetchedVideos];
        setVideos(merged);
        setApiWorked(true);
      } catch {
        const adminIds = new Set(adminVideos.map(v => v.id));
        const merged = [...adminVideos, ...DEFAULT_FALLBACK_VIDEOS.filter(v => !adminIds.has(v.id))];
        setVideos(merged);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-400 text-xs font-rajdhani font-semibold uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-yellow-400" />
              Latest Content
            </div>
            <h2 className="font-orbitron font-black text-3xl sm:text-4xl text-white uppercase">
              Recent <span className="text-yellow-400">Videos</span>
            </h2>
            <p className="text-gray-400 font-inter text-sm mt-2 max-w-md">
              {apiWorked ? 'Live feed from @RAGEIntelYT' : 'Fresh Rockstar intel, GTA 6 theories & more'}
            </p>
          </div>
          <a
            href="https://www.youtube.com/@RAGEIntelYT/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 border border-zinc-700 hover:border-yellow-400/50 text-gray-400 hover:text-yellow-400 px-5 py-2.5 rounded font-rajdhani font-semibold text-sm uppercase tracking-wider transition-all duration-200"
          >
            View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-zinc-900/80 rounded-lg overflow-hidden border border-zinc-800 animate-pulse">
                <div className="aspect-video bg-zinc-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zinc-800 rounded w-full" />
                  <div className="h-4 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                featured={index === 0}
                onAuthRequired={onAuthRequired}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@RAGEIntelYT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-700 hover:border-red-600/50 hover:bg-red-600/10 text-gray-300 hover:text-white px-8 py-4 rounded font-rajdhani font-bold text-sm uppercase tracking-wider transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            More Videos on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

function formatDuration(iso: string): string {
  if (!iso) return '';
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
