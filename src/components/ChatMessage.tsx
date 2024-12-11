import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'} mb-4`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${isBot ? 'bg-purple-600' : 'bg-pink-600'}`}>
        {isBot ? <Bot size={18} className="text-white" /> : <User size={18} className="text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isBot ? 'bg-gray-800 text-white' : 'bg-pink-600 text-white'
      }`}>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}