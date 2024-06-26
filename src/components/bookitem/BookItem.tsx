
import { Book } from '../../types';
import './bookItem.scss';

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void; 
}


function BookItem({ book, onEdit, onDelete }: BookItemProps) {
  return (
    <div className='item'>
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div>{book.year}</div>
      <button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
}

export default BookItem;
