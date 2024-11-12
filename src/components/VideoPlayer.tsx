import { useEffect, useRef, useState } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon, PlayIcon, PauseIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface VideoPlayerProps {
  video: {
    url: string;
    description: string;
  };
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export default function VideoPlayer({ video, isActive, isMuted, onToggleMute }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => {
        setIsLoading(false);
        setError(null);
      };
      const handleError = () => {
        setError('Failed to load video');
        setIsLoading(false);
      };

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      videoElement.addEventListener('loadstart', handleLoadStart);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);

      if (isActive) {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            setError('Failed to play video');
          });
        }
      } else {
        videoElement.pause();
      }

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
        videoElement.removeEventListener('loadstart', handleLoadStart);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [isActive]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Playback error:', error);
            setError('Failed to play video');
          });
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full group">
      {isLoading && !error && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
          <ExclamationCircleIcon className="w-12 h-12 text-red-500 mb-2" />
          <p className="text-white text-sm">{error}</p>
        </div>
      )}

      <video
        ref={videoRef}
        src={video.url}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-6 h-6" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <button
          onClick={togglePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          {isPlaying ? (
            <PauseIcon className="w-8 h-8" />
          ) : (
            <PlayIcon className="w-8 h-8" />
          )}
        </button>
      </div>
    </div>
  );
}