import { useState, useEffect } from 'react';
import { ChartBarIcon, UsersIcon, HeartIcon, ShareIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { formatNumber } from '../../utils/format';

interface AnalyticsData {
  views: number;
  viewsChange: number;
  followers: number;
  followersChange: number;
  likes: number;
  likesChange: number;
  shares: number;
  sharesChange: number;
}

interface VideoPerformance {
  id: string;
  thumbnail: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  date: string;
  viewsChange: number;
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    views: 0,
    viewsChange: 0,
    followers: 0,
    followersChange: 0,
    likes: 0,
    likesChange: 0,
    shares: 0,
    sharesChange: 0
  });
  const [videos, setVideos] = useState<VideoPerformance[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAnalyticsData({
        views: 12500,
        viewsChange: 15,
        followers: 845,
        followersChange: 8,
        likes: 3200,
        likesChange: 12,
        shares: 1100,
        sharesChange: 5
      });

      setVideos([
        {
          id: '1',
          thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=1',
          title: 'Traditional Dance Performance',
          views: 5200,
          likes: 1200,
          comments: 89,
          date: '2 days ago',
          viewsChange: 25
        },
        {
          id: '2',
          thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=2',
          title: 'Cooking Tutorial',
          views: 3800,
          likes: 956,
          comments: 67,
          date: '4 days ago',
          viewsChange: -5
        },
        {
          id: '3',
          thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=3',
          title: 'Music Performance',
          views: 2900,
          likes: 734,
          comments: 45,
          date: '1 week ago',
          viewsChange: 10
        }
      ]);

      setIsLoading(false);
    };

    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">Overview</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:border-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ChartBarIcon, label: 'Views', value: analyticsData.views, change: analyticsData.viewsChange },
            { icon: UsersIcon, label: 'New Followers', value: analyticsData.followers, change: analyticsData.followersChange },
            { icon: HeartIcon, label: 'Likes', value: analyticsData.likes, change: analyticsData.likesChange },
            { icon: ShareIcon, label: 'Shares', value: analyticsData.shares, change: analyticsData.sharesChange }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold text-white">
                  {formatNumber(stat.value)}
                </span>
                <div className={`flex items-center text-sm ${
                  stat.change >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change >= 0 ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Top Performing Videos</h2>
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className={`absolute -top-2 -right-2 px-1.5 py-0.5 rounded text-xs font-medium ${
                  video.viewsChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {video.viewsChange >= 0 ? '+' : ''}{video.viewsChange}%
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{video.title}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{formatNumber(video.views)} views</span>
                  <span className="text-sm text-gray-400">{formatNumber(video.likes)} likes</span>
                  <span className="text-sm text-gray-400">{formatNumber(video.comments)} comments</span>
                  <span className="text-sm text-gray-400">{video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}