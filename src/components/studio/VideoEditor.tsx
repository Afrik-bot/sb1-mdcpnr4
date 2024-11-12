import { useState, useRef, useCallback } from 'react';
import { PlayIcon, PauseIcon, ScissorsIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { formatDuration } from '../../utils/format';

interface VideoClip {
  startTime: number;
  endTime: number;
  thumbnail?: string;
}

export default function VideoEditor() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
      setClips([]);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setClips([{ startTime: 0, endTime: videoRef.current.duration }]);
    }
  };

  const createThumbnail = useCallback(async (time: number): Promise<string> => {
    return new Promise((resolve) => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      video.currentTime = time;

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg'));
      };
    });
  }, []);

  const handleSplitClip = async () => {
    if (!videoRef.current || clips.length === 0) return;

    const currentClip = clips.find(
      clip => currentTime >= clip.startTime && currentTime <= clip.endTime
    );

    if (!currentClip) return;

    setIsProcessing(true);
    const thumbnail = await createThumbnail(currentTime);
    
    const newClips = clips.flatMap(clip => {
      if (clip === currentClip) {
        return [
          { startTime: clip.startTime, endTime: currentTime, thumbnail },
          { startTime: currentTime, endTime: clip.endTime, thumbnail }
        ];
      }
      return [clip];
    });

    setClips(newClips);
    setIsProcessing(false);
  };

  const handleSaveChanges = async () => {
    setIsProcessing(true);
    // Here you would implement the actual video processing
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    alert('Changes saved successfully!');
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white mb-2">Video Editor</h2>
        <p className="text-sm text-gray-400">Edit your video before uploading</p>
      </div>

      {!videoUrl ? (
        <label className="block w-full aspect-video border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
          <input
            type="file"
            accept="video/mp4,video/webm"
            className="hidden"
            onChange={handleFileSelect}
          />
          <div className="flex flex-col items-center justify-center h-full">
            <PlayIcon className="w-12 h-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Select a video to edit</p>
          </div>
        </label>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              muted={isMuted}
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4 mb-2">
                <button 
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6 text-white" />
                  ) : (
                    <PlayIcon className="w-6 h-6 text-white" />
                  )}
                </button>
                
                <div className="flex-1">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = Number(e.target.value);
                      }
                    }}
                    className="w-full accent-purple-500"
                  />
                </div>

                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-6 h-6 text-white" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6 text-white" />
                  )}
                </button>
                
                <span className="text-white text-sm">
                  {formatDuration(currentTime)} / {formatDuration(duration)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleSplitClip}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <ScissorsIcon className="w-5 h-5" />
              Split at Current Time
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isProcessing}
              className="flex items-center justify-center gap-2 p-3 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                'Save Changes'
              )}
            </button>
          </div>

          {clips.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Clips</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {clips.map((clip, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative group cursor-pointer"
                  >
                    {clip.thumbnail && (
                      <img
                        src={clip.thumbnail}
                        alt={`Clip ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">
                        {formatDuration(clip.startTime)} - {formatDuration(clip.endTime)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}