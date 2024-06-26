import { Book } from '../../types';
import './bookItem.scss'
interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void; 
}

function BookItem({ book, onEdit, onDelete }: BookItemProps) {
  return (
    <tr className='bookItem'> 
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td className='actions'>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default BookItem;
