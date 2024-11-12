import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
}

interface StreamChatProps {
  streamId: string;
}

export default function StreamChat({ streamId }: StreamChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up WebSocket connection
    const ws = new WebSocket(`ws://localhost:8080/chat/${streamId}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    return () => ws.close();
  }, [streamId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Send message through WebSocket
    // This is a placeholder implementation
    const message: Message = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Current User',
      content: newMessage,
      timestamp: Date.now(),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-gray-900 rounded-lg flex flex-col h-[calc(100vh-2rem)]">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Live Chat</h3>
      </div>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {message.userName[0]}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  {message.userName}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-300">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}