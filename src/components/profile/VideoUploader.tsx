import { useState, useRef } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { generateThumbnail } from '../../utils/video';
import { Video } from '../../types/video';

interface VideoUploaderProps {
  onUploadComplete: (video: Video) => void;
  onCancel: () => void;
}

export default function VideoUploader({ onUploadComplete, onCancel }: VideoUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const validTypes = ['video/mp4', 'video/webm'];

    if (!validTypes.includes(file.type)) {
      throw new Error('Please upload an MP4 or WebM video file');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 100MB');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      validateFile(selectedFile);
      setFile(selectedFile);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    try {
      const thumbnail = await generateThumbnail(file);
      const formData = new FormData();
      formData.append('video', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);

      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(progress);
        },
      });

      if (!response.ok) throw new Error('Upload failed');

      const video = await response.json();
      onUploadComplete(video);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Upload Video</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          {!file ? (
            <label className="block w-full aspect-video border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center h-full">
                <CloudArrowUpIcon className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center">
                  Click to upload or drag and drop<br />
                  MP4 or WebM (max 100MB)
                </p>
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  placeholder="Enter video description"
                  rows={3}
                />
              </div>

              {progress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Uploading...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || !title.trim() || progress > 0}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}