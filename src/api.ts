import axios from 'axios';
import { Book } from './types';

const api = 'https://book-repository-server.onrender.com';

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await axios.get(`${api}/books`);
    return response.data;
}



export const updateBook = async (book: Book): Promise<Book> => {
    const response = await axios.put<Book>(`${api}/books/${book.id}`, book);
    return response.data;
};
  
export const addBook = async (book: Book): Promise<Book> => {
    const response = await axios.post<Book>(`${api}/books`, book);
    return response.data;
};
  
export const deleteBook = async (bookId: number): Promise<void> => {
    await axios.delete(`${api}/books/${bookId}`);
};
