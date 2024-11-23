import axios from 'axios';
import type { Book } from '@/types';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Add this for debugging
api.interceptors.request.use(request => {
    console.log('Starting Request:', request)
    return request
})

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('Server Error:', {
                status: error.response.status,
                data: error.response.data
            });
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Request Error:', error.message);
        }
        throw error;
    }
);


// api.ts
export const simplifyText = async (text: string): Promise<Book> => {
  try {
    console.log('Sending request to:', process.env.NEXT_PUBLIC_API_URL);
    console.log('With text:', text);
    
    const response = await api.post('/process/', 
      { text },  // Request body
      {          // Config object
        headers: {
          'Content-Type': 'application/json',
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