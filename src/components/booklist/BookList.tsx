import React from 'react';
import BookItem from '../bookitem/BookItem';
import Pagination from '../pagination/Pagination';
import { useBookContext } from '../../context/BookContext';
import { Book } from '../../types';
import './booklist.scss';

interface BookListProps {
  books: Book[];  // Corrected from 'book' to 'books' for clarity and accuracy
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BOOKS_PER_PAGE = 4;

const BookList = ({ books, onEdit, onDelete }: BookListProps): JSX.Element => {
  useBookContext();  // Using the custom hook without assigning to a variable
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE); // Directly use 'books' passed as props

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const selectedBooks = books.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  if (books.length === 0) {
    return <div>No books found</div>;
  }

  return (
    <div className='bookList'>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedBooks.map((book: Book) => (
            <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default BookList;
