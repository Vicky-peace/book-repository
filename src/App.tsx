import {useState} from 'react';
import BookForm from './components/bookform/BookForm';
import BookList from './components/booklist/BookList';
import SearchComponent from './components/searchComponent/SearchComponent';
import { Book } from './types';

import './App.scss';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editBook, setEditBook] = useState<Book | null>(null);

  const handleFormSubmit = (book: Book) => {
    if (book.id && books.some(b => b.id === book.id)) {
      // Update existing book
      setBooks(books.map(b => b.id === book.id ? book : b));
    } else {
      // Add new book
      const newBook = { ...book, id: Math.random() }; // Ensure unique ID
      setBooks([...books, newBook]);
    }
    setEditBook(null); // Clear editBook state
  };

  const handleEdit = (book: Book) => {
    setEditBook(book); // Set book to be edited
  };

  const handleDelete = (bookId: number) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <SearchComponent onSearch={handleSearch} />
      <BookForm onSubmit={handleFormSubmit} initialData={editBook} />
      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
export default App;