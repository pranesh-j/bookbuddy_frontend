import axios from 'axios';
import type { Book } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://bookbuddy-backend-pizr6y0tq-praneshs-projects-6f1c158f.vercel.app/api',
});

export const simplifyText = async (text: string): Promise<Book> => {
  try {
    const response = await api.post('/process/', { text });
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