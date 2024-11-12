import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoActions from '../components/VideoActions';
import BottomNav from '../components/BottomNav';

const videos = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-african-dancers-performing-together-4814-large.mp4',
    username: 'AfricanArts',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    description: 'Traditional dance performance in Lagos 🌍',
    tags: ['culture', 'dance', 'nigeria'],
    likes: 1200,
    comments: 85,
    shares: 45,
    hasLiked: false
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-practicing-a-choreography-40026-large.mp4',
    username: 'DanceAfrica',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    description: 'Modern African dance fusion 💃',
    tags: ['dance', 'modern', 'fusion'],
    likes: 2300,
    comments: 120,
    shares: 89,
    hasLiked: false
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-people-drumming-together-4783-large.mp4',
    username: 'DrumBeats',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    description: 'Drum circle in Senegal 🥁',
    tags: ['music', 'drums', 'senegal'],
    likes: 3400,
    comments: 230,
    shares: 156,
    hasLiked: false
  }
];

export default function VideoFeed() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  return (
    <div className="h-screen w-full bg-black">
      <div className="relative h-full snap-y snap-mandatory overflow-y-scroll">
        {videos.map((video, index) => (
          <div key={video.id} className="snap-start h-screen w-full relative">
            <VideoPlayer
              url={video.url}
              isActive={index === activeVideoIndex}
            />
            <VideoActions video={video} />
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}