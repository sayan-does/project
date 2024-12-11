export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface NotebookUpload {
  id: string;
  name: string;
  uploadDate: Date;
  status: 'processing' | 'ready' | 'error';
}