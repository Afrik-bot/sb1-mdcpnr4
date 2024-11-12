import { create } from 'zustand';
import { Video } from '../types/video';

interface VideoState {
  videos: Video[];
  currentVideoIndex: number;
  setVideos: (videos: Video[]) => void;
  setCurrentVideoIndex: (index: number) => void;
  likeVideo: (videoId: string) => void;
  toggleFollow: (username: string) => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  videos: [],
  currentVideoIndex: 0,
  setVideos: (videos) => set({ videos }),
  setCurrentVideoIndex: (index) => set({ currentVideoIndex: index }),
  likeVideo: (videoId) =>
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === videoId
          ? { ...video, hasLiked: !video.hasLiked, likes: video.hasLiked ? video.likes - 1 : video.likes + 1 }
          : video
      ),
    })),
  toggleFollow: (username) => {
    // Implement follow logic here
    console.log(`Toggled follow for ${username}`);
  },
}));