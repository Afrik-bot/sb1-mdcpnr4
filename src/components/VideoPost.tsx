import { useState } from 'react';
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface VideoPostProps {
  video: {
    videoUrl: string;
    username: string;
    description: string;
    likes: number;
    comments: number;
    shares: number;
    isVerified: boolean;
  };
  isActive: boolean;
}

export default function VideoPost({ video, isActive }: VideoPostProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <video
        src={video.videoUrl}
        className="w-full h-full object-cover"
        playsInline
        loop
        muted={isMuted}
        autoPlay={isActive}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60">
        <div className="absolute bottom-20 left-4 right-20">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{video.username}</span>
              {video.isVerified && (
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-white text-sm mt-2">{video.description}</p>
          </div>
        </div>

        <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center"
          >
            {isLiked ? (
              <HeartIconSolid className="w-8 h-8 text-red-500" />
            ) : (
              <HeartIcon className="w-8 h-8 text-white" />
            )}
            <span className="text-white text-sm">{formatNumber(video.likes)}</span>
          </button>

          <button className="flex flex-col items-center">
            <ChatBubbleOvalLeftIcon className="w-8 h-8 text-white" />
            <span className="text-white text-sm">{formatNumber(video.comments)}</span>
          </button>

          <button className="flex flex-col items-center">
            <ShareIcon className="w-8 h-8 text-white" />
            <span className="text-white text-sm">{formatNumber(video.shares)}</span>
          </button>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-8 h-8 text-white" />
            ) : (
              <SpeakerWaveIcon className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}