export interface Video {
  id: string;
  url: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  username: string;
  description: string;
}