import { useState, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoActions from '../components/VideoActions';
import { mockVideos } from '../data/mockVideos';

export default function Express() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleScroll = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) < 50) return;

    if (e.deltaY > 0 && currentIndex < mockVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentIndex]);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative h-full">
        {mockVideos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-transform duration-500 ${
              index === currentIndex ? 'translate-y-0' :
              index < currentIndex ? '-translate-y-full' : 'translate-y-full'
            }`}
          >
            <div className="relative h-full">
              <VideoPlayer
                video={video}
                isActive={index === currentIndex}
                isMuted={isMuted}
                onToggleMute={toggleMute}
              />
              
              <div className="absolute bottom-20 left-4 right-20 z-20">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={video.userAvatar} 
                      alt={video.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold">{video.username}</span>
                  </div>
                  <p className="text-sm">{video.description}</p>
                </div>
              </div>

              <div className="absolute right-4 bottom-20 z-20">
                <VideoActions video={video} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}