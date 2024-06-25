import React from 'react';
import BookForm from './components/bookform/BookForm';
import BookList from './components/booklist/BookList';
import SearchComponent from './components/searchComponent/SearchComponent';
import { Book } from './types';  

import './App.scss';

function App() {
 
  const [books, setBooks] = React.useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

 
  const handleFormSubmit = (book: Book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
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
      <BookForm onSubmit={handleFormSubmit} />
      <BookList books={filteredBooks} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}

export default App;
