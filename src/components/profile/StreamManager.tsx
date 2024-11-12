import { useState, useEffect } from 'react';
import { VideoCameraIcon, ChatBubbleLeftIcon, UsersIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import StreamChat from './StreamChat';

interface Stream {
  id: string;
  title: string;
  description: string;
  scheduledFor: string;
  isLive: boolean;
  viewerCount: number;
  chatEnabled: boolean;
}

export default function StreamManager() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Fetch user's streams
    const fetchStreams = async () => {
      try {
        const response = await fetch('/api/streams');
        const data = await response.json();
        setStreams(data);
      } catch (error) {
        console.error('Error fetching streams:', error);
      }
    };

    fetchStreams();
  }, []);

  const handleCreateStream = async (streamData: Partial<Stream>) => {
    try {
      const response = await fetch('/api/streams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(streamData),
      });
      const newStream = await response.json();
      setStreams([newStream, ...streams]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating stream:', error);
    }
  };

  const handleStartStream = async (streamId: string) => {
    try {
      const response = await fetch(`/api/streams/${streamId}/start`, { method: 'POST' });
      const updatedStream = await response.json();
      setStreams(streams.map(s => s.id === streamId ? updatedStream : s));
      setSelectedStream(updatedStream);
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const handleEndStream = async (streamId: string) => {
    try {
      await fetch(`/api/streams/${streamId}/end`, { method: 'POST' });
      setStreams(streams.map(s => s.id === streamId ? { ...s, isLive: false } : s));
      setSelectedStream(null);
    } catch (error) {
      console.error('Error ending stream:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Live Streaming</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <VideoCameraIcon className="w-5 h-5" />
          Create Stream
        </button>
      </div>

      {isCreating && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">New Stream</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateStream({
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                scheduledFor: formData.get('scheduledFor') as string,
                chatEnabled: formData.get('chatEnabled') === 'true',
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Schedule For
              </label>
              <input
                type="datetime-local"
                name="scheduledFor"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="chatEnabled"
                id="chatEnabled"
                value="true"
                defaultChecked
                className="rounded border-gray-700 bg-gray-900 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="chatEnabled" className="text-sm text-gray-300">
                Enable chat during stream
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">{stream.title}</h3>
                <p className="text-sm text-gray-400">{stream.description}</p>
              </div>
              {stream.isLive ? (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="text-sm text-gray-400">
                  Scheduled for {formatDistanceToNow(new Date(stream.scheduledFor), { addSuffix: true })}
                </span>
              )}
            </div>

            {stream.isLive && (
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <UsersIcon className="w-4 h-4" />
                  {stream.viewerCount} viewers
                </div>
                {stream.chatEnabled && (
                  <div className="flex items-center gap-1">
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                    Chat enabled
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              {!stream.isLive ? (
                <button
                  onClick={() => handleStartStream(stream.id)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Start Stream
                </button>
              ) : (
                <button
                  onClick={() => handleEndStream(stream.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  End Stream
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedStream?.isLive && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="w-full max-w-6xl p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                {/* WebRTC Video Stream Component would go here */}
                <div className="aspect-video bg-gray-900 rounded-lg" />
              </div>
              {selectedStream.chatEnabled && (
                <StreamChat streamId={selectedStream.id} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}