export interface Video {
  id: string;
  url: string;
   <boltAction type="file" filePath="src/types/video.ts">export interface Video {
  id: string;
  url: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  createdAt: string;
  userId: string;
}

export interface Stream {
  id: string;
  title: string;
  description?: string;
  scheduledFor: string;
  isLive: boolean;
  viewerCount: number;
  chatEnabled: boolean;
  recordingEnabled: boolean;
  userId: string;
  createdAt: string;
  endedAt?: string;
}

export interface StreamAnalytics {
  peakViewers: number;
  averageViewers: number;
  totalViews: number;
  chatMessages: number;
  duration: number;
  startTime: string;
  endTime?: string;
}