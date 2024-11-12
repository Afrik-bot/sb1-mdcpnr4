import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';
import type { Comment } from '../../types/comment';
import CommentForm from './CommentForm';

interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string, content: string) => void;
  onLike: (commentId: string) => void;
}

export default function CommentItem({ comment, onReply, onLike }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (content: string) => {
    onReply(comment.id, content);
    setShowReplyForm(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <img
          src={comment.userAvatar}
          alt={comment.userName}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-white">{comment.userName}</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-gray-300">{comment.content}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onLike(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-500 transition-colors"
            >
              {comment.hasLiked ? (
                <HeartIconSolid className="w-4 h-4 text-purple-500" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
              {comment.likes}
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-500 transition-colors"
            >
              <ChatBubbleLeftIcon className="w-4 h-4" />
              Reply
            </button>
          </div>

          {showReplyForm && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReply}
                placeholder="Write a reply..."
                buttonText="Reply"
              />
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-3 space-y-3 pl-4 border-l border-gray-800">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}