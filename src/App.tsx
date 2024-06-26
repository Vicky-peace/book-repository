import  { useState } from 'react';
import BookForm from './components/bookform/BookForm';
import BookList from './components/booklist/BookList';
import SearchComponent from './components/searchComponent/SearchComponent';
import Modal from './components/modal/Modal'; 
import useLocalStorage from './customHooks/useLocalStorage';
import { Book } from './types';
import './App.scss';

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isModalOpen, setModalOpen] = useState(false); 

  const handleFormSubmit = (book: Book) => {
    if (editBook && books.some(b => b.id === book.id)) {
      setBooks(books.map(b => b.id === book.id ? book : b));
    } else {
      const newBook = { ...book, id: Math.random() }; // Ensure unique ID for new books
      setBooks([...books, newBook]);
    }
    setEditBook(null);
    setModalOpen(false); // Close modal on form submit
  };

  const handleDelete = (bookId: number) => {
    setBooks(books.filter(book => book.id !== bookId));
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setModalOpen(true); 
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
      <button onClick={() => setModalOpen(true)} className='add-book-btn'>Add Book</button>
      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <BookForm onSubmit={handleFormSubmit} initialData={editBook} />
      </Modal>
      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
