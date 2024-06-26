import BookItem from '../bookitem/BookItem';
import Pagination from '../pagination/Pagination';
import { Book } from '../../types';
import './booklist.scss';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

function BookList({ books, onEdit, onDelete }: BookListProps) {
  return (
    <div className='bookList'>
      {books.map(book => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    </div>
  );
}

export default BookList;
