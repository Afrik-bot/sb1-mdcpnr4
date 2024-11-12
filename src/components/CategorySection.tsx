import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import VideoCard from './VideoCard';
import { videos } from '../data/videos';

interface CategorySectionProps {
  category: string;
  description: string;
}

export default function CategorySection({ category, description }: CategorySectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const categoryVideos = videos.filter(video => video.category === category);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${category}`);
    if (container) {
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">{category}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div
        id={`scroll-${category}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {categoryVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}