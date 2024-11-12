import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Video {
  id: string;
  username: string;
  userAvatar: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  hasLiked: boolean;
}

interface VideoInfoProps {
  video: Video;
}

export default function VideoInfo({ video }: VideoInfoProps) {
  return (
    <div className="absolute bottom-16 left-0 right-0 p-4 text-white z-10">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <div className="flex items-center mb-2">
            <img 
              src={video.userAvatar} 
              alt={video.username}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="font-semibold">{video.username}</span>
          </div>
          <p className="mb-2">{video.description}</p>
          <div className="flex flex-wrap gap-2">
            {video.tags.map(tag => (
              <span key={tag} className="text-sm text-blue-400">#{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="flex flex-col items-center">
            {video.hasLiked ? (
              <HeartIconSolid className="w-8 h-8 text-red-500" />
            ) : (
              <HeartIcon className="w-8 h-8" />
            )}
            <span className="text-sm">{video.likes}</span>
          </button>
          <button className="flex flex-col items-center">
            <ChatBubbleOvalLeftIcon className="w-8 h-8" />
            <span className="text-sm">{video.comments}</span>
          </button>
          <button className="flex flex-col items-center">
            <ShareIcon className="w-8 h-8" />
            <span className="text-sm">{video.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
}