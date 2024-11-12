import { useState } from 'react';
import { VideoCameraIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Live() {
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="max-w-lg mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Tam Tam <span className="text-red-500">Live</span>
          </h1>
          <div className="flex items-center gap-2">
            {isStreaming && (
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            )}
            <p className={`${isStreaming ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
              {isStreaming ? 'LIVE' : 'Start streaming to connect with your audience'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative border border-gray-800/50">
            {isStreaming ? (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-500 font-medium">LIVE</span>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoCameraIcon className="w-16 h-16 text-gray-700" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                isStreaming
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {isStreaming ? 'End Stream' : 'Go Live'}
            </button>
          </div>

          <div className="p-4 bg-gray-900 rounded-lg border border-gray-800/50">
            <div className="flex items-center gap-2 mb-4">
              <UserGroupIcon className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Viewers: 0</span>
            </div>

            <div className="h-48 overflow-y-auto bg-gray-950 rounded p-4 border border-gray-800/50">
              <p className="text-gray-500 text-center">Chat messages will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}