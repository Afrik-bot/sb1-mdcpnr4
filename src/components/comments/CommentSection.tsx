import { useState } from 'react';
import type { Comment } from '../../types/comment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentSectionProps {
  leaderId: string;
}

export default function CommentSection({ leaderId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      content: 'Great progress on the education initiatives!',
      timestamp: Date.now() - 3600000,
      likes: 5,
      hasLiked: false,
      replies: [
        {
          id: '2',
          userId: 'user2',
          userName: 'Jane Smith',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
          content: 'Agreed, the impact has been significant.',
          timestamp: Date.now() - 1800000,
          likes: 2,
          hasLiked: false,
          replies: []
        }
      ]
    }
  ]);

  const addComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'Current User',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      content,
      timestamp: Date.now(),
      likes: 0,
      hasLiked: false,
      replies: []
    };
    setComments([newComment, ...comments]);
  };

  const addReply = (commentId: string, content: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'Current User',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current',
      content,
      timestamp: Date.now(),
      likes: 0,
      hasLiked: false,
      replies: []
    };

    const updateReplies = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateReplies(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(updateReplies(comments));
  };

  const toggleLike = (commentId: string) => {
    const updateLikes = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            hasLiked: !comment.hasLiked,
            likes: comment.hasLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateLikes(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(updateLikes(comments));
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-800">
      <h3 className="text-lg font-medium text-white mb-4">Comments</h3>
      
      <div className="mb-6">
        <CommentForm onSubmit={addComment} />
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={addReply}
            onLike={toggleLike}
          />
        ))}
      </div>
    </div>
  );
}