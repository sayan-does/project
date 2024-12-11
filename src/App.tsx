import React, { useState } from 'react';
import axios from 'axios';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { NotebookUploader } from './components/NotebookUploader';
import { Radio, Zap, BookOpen } from 'lucide-react';

const BASE_URL = 'http://localhost:5000';

// API service for handling backend requests
export const apiService = {
  uploadDocument: async (file: File, userId: string = 'default_user') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

    try {
      const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  },

  processQuery: async (query: string, userId: string = 'default_user') => {
    try {
      const response = await axios.post(`${BASE_URL}/query`, {
        query,
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      console.error('Query processing failed:', error);
      throw error;
    }
  },

  generateLLMText: async (prompt: string, maxLength: number = 200) => {
    try {
      const response = await axios.post(`${BASE_URL}/llm_text`, {
        prompt,
        max_length: maxLength,
      });
      return response.data;
    } catch (error) {
      console.error('LLM text generation failed:', error);
      throw error;
    }
  },
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey punk! Ready to study? Drop your notebooks and let's get started! 🤘",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await apiService.processQuery(content);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer || "I'm still rocking out your request! 🎸",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "Oops! Something went wrong while processing your request. 😞",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-pink-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-8 h-8 text-pink-500" />
              <h1 className="text-2xl font-bold">PunkStudy</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-500" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="text-pink-500" />
                <span>Study Smarter</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Section */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-4 h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>

            {/* Input */}
            <ChatInput onSend={handleSendMessage} />
          </div>

          {/* Uploader Section */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <h2 className="text-xl font-bold mb-4">Upload Your Notes</h2>
              <NotebookUploader uploadHandler={apiService.uploadDocument} />
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <h2 className="text-xl font-bold mb-4">Study Tips</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Upload your study materials
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Ask questions about your notes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Get AI-powered explanations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  Practice with generated quizzes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
