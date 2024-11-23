import axios from 'axios';
import type { Book } from '@/types';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

export const simplifyText = async (text: string): Promise<Book> => {
  try {
    console.log('Sending request to:', process.env.NEXT_PUBLIC_API_URL);
    console.log('With text:', text);
    
    const response = await api.post('/process/', 
      { text },  // Request body
      {          // Request config
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getBook = async (bookId: number): Promise<Book> => {
  const response = await api.get(`/books/${bookId}/`);
  return response.data;
};

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await api.get('/books/');
  return response.data;
};

export const updateBookTitle = async (bookId: number, title: string): Promise<Book> => {
  try {
    const response = await api.patch(`/books/${bookId}/update/`, { title });
    return response.data;
  } catch (error) {
    console.error('Error updating book title:', error);
    throw error;
  }
};