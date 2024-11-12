import { Video } from '../types/video';

export const uploadVideo = async (
  file: File,
  metadata: Partial<Video>,
  onProgress?: (progress: number) => void
): Promise<Video> => {
  const formData = new FormData();
  formData.append('video', file);
  Object.entries(metadata).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  const response = await fetch('/api/videos/upload', {
    method: 'POST',
    body: formData,
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });

  if (!response.ok) throw new Error('Failed to upload video');
  return response.json();
};

export const deleteVideo = async (videoId: string): Promise<void> => {
  const response = await fetch(`/api/videos/${videoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete video');
};

export const updateVideoMetadata = async (
  videoId: string,
  metadata: Partial<Video>
): Promise<Video> => {
  const response = await fetch(`/api/videos/${videoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metadata),
  });
  if (!response.ok) throw new Error('Failed to update video metadata');
  return response.json();
};

export const getVideoAnalytics = async (videoId: string): Promise<{
  views: number;
  likes: number;
  averageWatchTime: number;
  completionRate: number;
}> => {
  const response = await fetch(`/api/videos/${videoId}/analytics`);
  if (!response.ok) throw new Error('Failed to fetch video analytics');
  return response.json();
};