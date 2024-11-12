import { useState } from 'react';
import { VideoCameraIcon, MicrophoneIcon, PhoneXMarkIcon } from '@heroicons/react/24/solid';
import { VideoCameraSlashIcon, MicrophoneSlashIcon } from '@heroicons/react/24/outline';

interface StreamControlsProps {
  onToggleVideo: (enabled: boolean) => void;
  onToggleAudio: (enabled: boolean) => void;
  onEndStream: () => void;
}

export default function StreamControls({ onToggleVideo, onToggleAudio, onEndStream }: StreamControlsProps) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onToggleVideo(!isVideoEnabled);
  };

  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio(!isAudioEnabled);
  };

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 p-4 bg-gray-900/90 backdrop-blur-sm rounded-xl">
      <button
        onClick={handleToggleVideo}
        className={`p-4 rounded-full ${
          isVideoEnabled ? 'bg-gray-700 text-white' : 'bg-red-500/20 text-red-500'
        }`}
      >
        {isVideoEnabled ? (
          <VideoCameraIcon className="w-6 h-6" />
        ) : (
          <VideoCameraSlashIcon className="w-6 h-6" />
        )}
      </button>

      <button
        onClick={handleToggleAudio}
        className={`p-4 rounded-full ${
          isAudioEnabled ? 'bg-gray-700 text-white' : 'bg-red-500/20 text-red-500'
        }`}
      >
        {isAudioEnabled ? (
          <MicrophoneIcon className="w-6 h-6" />
        ) : (
          <MicrophoneSlashIcon className="w-6 h-6" />
        )}
      </button>

      <button
        onClick={onEndStream}
        className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        <PhoneXMarkIcon className="w-6 h-6" />
      </button>
    </div>
  );
}