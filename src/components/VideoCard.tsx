import { PlayIcon } from '@heroicons/react/24/solid';
import { formatNumber } from '../utils/format';

interface VideoCardProps {
  video: {
    id: string;
    url: string;
    username: string;
    userAvatar: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="flex-shrink-0 w-72 bg-gray-900 rounded-xl overflow-hidden">
      <div className="relative aspect-video bg-gray-800 group">
        <video
          src={video.url}
          className="w-full h-full object-cover"
          preload="metadata"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayIcon className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={video.userAvatar}
            alt={video.username}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-white">{video.username}</span>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2 mb-2">
          {video.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>{formatNumber(video.likes)} likes</span>
          <span>{formatNumber(video.comments)} comments</span>
          <span>{formatNumber(video.shares)} shares</span>
        </div>
      </div>
    </div>
  );
}