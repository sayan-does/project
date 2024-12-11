import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything about your notes..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 
          transition-colors disabled:opacity-50"
        disabled={!message.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
}