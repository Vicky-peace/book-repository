import  { useState } from 'react';
import BookForm from './components/bookform/BookForm';
import BookList from './components/booklist/BookList';
import SearchComponent from './components/searchComponent/SearchComponent';
import Modal from './components/modal/Modal';
import { useBookContext } from './context/BookContext';
import { Book } from './types';
import { addBook, updateBook, deleteBook } from './api';
import './App.scss';

function App() {
  const { state, dispatch } = useBookContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);

  const handleFormSubmit = (book: Book) => {
    const operation = editBook ? updateBook : addBook; // Choose the operation based on edit state
    operation(book).then((savedBook: Book) => {
      const actionType = editBook ? 'UPDATE_BOOK' : 'ADD_BOOK';
      dispatch({ type: actionType, payload: savedBook });
      closeModal(); // Close modal after successful operation
    }).catch((err: Error) => {
      console.error(`Failed to ${editBook ? 'update' : 'add'} book:`, err);
    });
  };

  const handleDelete = (bookId: number) => {
    deleteBook(bookId).then(() => {
      dispatch({ type: 'DELETE_BOOK', payload: bookId });
    }).catch((err: Error) => console.error('Failed to delete book:', err));
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredBooks = state.books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <SearchComponent onSearch={handleSearch} />
      <button onClick={() => setModalOpen(true)} className='add-book-btn'>Add Book</button>
      <Modal show={isModalOpen} onClose={closeModal}>
        <BookForm onSubmit={handleFormSubmit} initialData={editBook} closeModal={closeModal} />
      </Modal>
      <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default App;
