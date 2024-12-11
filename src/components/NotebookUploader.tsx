import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface NotebookUploaderProps {
  uploadHandler: (file: File) => Promise<any>;
}

export const NotebookUploader: React.FC<NotebookUploaderProps> = ({ uploadHandler }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (isUploading) return; // Prevent multiple uploads at once

    const file = e.dataTransfer.files[0]; // Only handle the first file for simplicity
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadHandler(file);
      alert('Upload successful!');
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadHandler(file);
      alert('Upload successful!');
    } catch (error) {
      console.error('File upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all
        ${isDragging ? 'border-pink-500 bg-pink-50' : 'border-gray-300'}
        ${isUploading ? 'opacity-50' : 'hover:border-pink-500'}`}
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-pink-600" />
          <p className="text-gray-600">Uploading your notebook...</p>
        </div>
      ) : (
        <label className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400" />
          <p className="text-gray-600">Drop your notebook here or click to upload</p>
          <p className="text-sm text-gray-500">Supports PDF, DOCX, TXT</p>
          <input
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.docx,.txt"
          />
        </label>
      )}
    </div>
  );
};
