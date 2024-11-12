import { useState } from 'react';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { formatNumber } from '../utils/format';

interface VideoActionsProps {
  video: {
    likes: number;
    comments: number;
    shares: number;
    hasLiked: boolean;
  };
}

export default function VideoActions({ video }: VideoActionsProps) {
  const [hasLiked, setHasLiked] = useState(video.hasLiked);
  const [likes, setLikes] = useState(video.likes);

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikes(prev => hasLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <button 
        className="flex flex-col items-center group"
        onClick={handleLike}
      >
        {hasLiked ? (
          <HeartIconSolid className="w-8 h-8 text-red-500" />
        ) : (
          <HeartIcon className="w-8 h-8 text-white group-hover:text-red-500 transition-colors" />
        )}
        <span className="text-white text-xs mt-1">{formatNumber(likes)}</span>
      </button>
      
      <button className="flex flex-col items-center group">
        <ChatBubbleOvalLeftIcon className="w-8 h-8 text-white group-hover:text-purple-500 transition-colors" />
        <span className="text-white text-xs mt-1">{formatNumber(video.comments)}</span>
      </button>
      
      <button className="flex flex-col items-center group">
        <ShareIcon className="w-8 h-8 text-white group-hover:text-blue-500 transition-colors" />
        <span className="text-white text-xs mt-1">{formatNumber(video.shares)}</span>
      </button>
    </div>
  );
}