import BookItem from '../bookitem/BookItem';
import { Book } from '../../types';
import './booktable.scss';

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookTable = ({ books, onEdit, onDelete }: BookTableProps): JSX.Element => {
  return (
    <table className='bookTable'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publication Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <BookItem
            key={book.id}
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
