import { useState } from 'react';
import { VideoCameraIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import VideoPlayer from './VideoPlayer';
import VideoUploader from './VideoUploader';
import { Video } from '../../types/video';

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = async (videoId: string) => {
    try {
      await fetch(`/api/videos/${videoId}`, { method: 'DELETE' });
      setVideos(videos.filter(v => v.id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEdit = async (video: Video, metadata: Partial<Video>) => {
    try {
      const response = await fetch(`/api/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      });
      const updatedVideo = await response.json();
      setVideos(videos.map(v => v.id === video.id ? updatedVideo : v));
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">My Videos</h2>
        <button
          onClick={() => setIsUploading(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <VideoCameraIcon className="w-5 h-5" />
          Upload Video
        </button>
      </div>

      {isUploading && (
        <VideoUploader
          onUploadComplete={(video) => {
            setVideos([video, ...videos]);
            setIsUploading(false);
          }}
          onCancel={() => setIsUploading(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-800 rounded-lg overflow-hidden group"
          >
            <div
              className="aspect-video relative cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-white mb-1">{video.title}</h3>
              <p className="text-sm text-gray-400 mb-2">
                {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <EyeIcon className="w-4 h-4" />
                  {video.views} views
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(video, { title: prompt('New title:', video.title) })}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}