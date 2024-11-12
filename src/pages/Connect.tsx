import { useState } from 'react';
import { UserCircleIcon, ChatBubbleLeftIcon, UserGroupIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import LeaderRanking from '../components/LeaderRanking';
import VideoThumbnail from '../components/VideoThumbnail';
import { leaders } from '../data/leaders';
import { videos } from '../data/videos';

const communities = [
  {
    id: '1',
    name: 'African Tech Hub',
    members: '12.4K',
    description: 'A community for African tech innovators and entrepreneurs',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=tech',
    category: 'Technology',
    featuredVideos: videos.filter(v => v.category === 'Technology').slice(0, 2)
  },
  {
    id: '2',
    name: 'Afrobeats Connect',
    members: '45.2K',
    description: 'Celebrating African music and dance culture',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=music',
    category: 'Music',
    featuredVideos: videos.filter(v => v.category === 'Music').slice(0, 2)
  },
  {
    id: '3',
    name: 'African Cuisine',
    members: '28.7K',
    description: 'Exploring traditional and modern African recipes',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=food',
    category: 'Cuisine',
    featuredVideos: videos.filter(v => v.category === 'Cuisine').slice(0, 2)
  },
  {
    id: '4',
    name: 'African Politics',
    members: '34.2K',
    description: 'Discussing African political developments and governance',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=politics',
    category: 'Politics',
    featuredVideos: videos.filter(v => v.category === 'Politics').slice(0, 2)
  }
];

type Tab = 'friends' | 'communities' | 'politics';

export default function Connect() {
  const [activeTab, setActiveTab] = useState<Tab>('communities');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 mb-6 bg-gray-900/50 backdrop-blur-sm rounded-xl">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'friends' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <UserCircleIcon className="w-5 h-5" />
            Friends
          </button>
          <button
            onClick={() => setActiveTab('communities')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'communities' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <UserGroupIcon className="w-5 h-5" />
            Communities
          </button>
          <button
            onClick={() => setActiveTab('politics')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'politics' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <UserGroupIcon className="w-5 h-5" />
            Politics
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'communities' && (
            <div className="grid gap-6">
              {communities.map((community) => (
                <div 
                  key={community.id} 
                  className="overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl hover:border-purple-500/30 transition-colors duration-200"
                >
                  <div className="relative h-48">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-xs text-purple-300">
                      {community.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">{community.name}</h3>
                      <span className="text-sm text-gray-400">{community.members} members</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">{community.description}</p>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Featured Videos</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {community.featuredVideos.map((video) => (
                          <VideoThumbnail key={video.id} video={video} />
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors">
                      Join Community
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Other tab content remains the same */}
        </div>
      </div>
    </div>
  );
}