import { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CloudArrowUpIcon, VideoCameraIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { uploadVideo } from '../services/storage';
import VideoEditor from '../components/studio/VideoEditor';
import Analytics from '../components/studio/Analytics';
import Settings from '../components/studio/Settings';

export default function Studio() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadVideo(file);
      navigate('/express');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const tabs = [
    { path: '/studio', icon: VideoCameraIcon, label: 'Upload' },
    { path: '/studio/editor', icon: CloudArrowUpIcon, label: 'Editor' },
    { path: '/studio/analytics', icon: ChartBarIcon, label: 'Analytics' },
    { path: '/studio/settings', icon: Cog6ToothIcon, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Tam Tam <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">Studio</span>
          </h1>
          <div className="flex gap-2 border-b border-gray-800">
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  location.pathname === tab.path
                    ? 'text-purple-500 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <VideoCameraIcon className="w-8 h-8 text-purple-500" />
                  <div>
                    <h2 className="text-lg font-medium text-white">Upload Video</h2>
                    <p className="text-sm text-gray-400">MP4 or WebM, max 50MB</p>
                  </div>
                </div>

                <label className="relative block w-full aspect-video border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={uploading}
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <CloudArrowUpIcon className="w-12 h-12 text-gray-500 mb-4" />
                    <p className="text-gray-400 text-center">
                      {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                  </div>

                  {uploading && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                      <div 
                        className="h-full bg-purple-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </label>
              </div>
            }
          />
          <Route path="/editor" element={<VideoEditor />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}