import { useEffect, useRef, useState } from 'react';
import { WebRTCService } from '../../services/webrtc';
import StreamControls from './StreamControls';

interface LiveStreamProps {
  streamId: string;
  onEndStream: () => void;
}

export default function LiveStream({ streamId, onEndStream }: LiveStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [webrtcService] = useState(new WebRTCService());
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeStream = async () => {
      try {
        await webrtcService.initializeStream(streamId, (stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        });
        setIsInitializing(false);
      } catch (err: any) {
        console.error('Failed to initialize stream:', err);
        setError(err.message || 'Failed to start stream');
        setIsInitializing(false);
      }
    };

    initializeStream();

    return () => {
      webrtcService.stopStream();
    };
  }, [streamId, webrtcService]);

  const handleEndStream = async () => {
    try {
      await webrtcService.stopStream();
      onEndStream();
    } catch (err) {
      console.error('Error ending stream:', err);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onEndStream}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 rounded-lg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Initializing stream...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      <StreamControls
        onToggleVideo={(enabled) => webrtcService.toggleVideo(enabled)}
        onToggleAudio={(enabled) => webrtcService.toggleAudio(enabled)}
        onEndStream={handleEndStream}
      />
    </div>
  );
}