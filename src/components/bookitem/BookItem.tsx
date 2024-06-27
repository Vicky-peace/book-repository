import  { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import { deleteBook } from '../../api'; 
import './bookItem.scss';
import { Book } from '../../types';

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookItem = ({ book, onEdit }: BookItemProps) => {
  const { dispatch } = useContext(BookContext)!;

  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId);
      dispatch({ type: 'DELETE_BOOK', payload: bookId });
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
    onEdit(book);
  };

  return (
    <tr className='bookItem'>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td className='actions'>
        <button onClick={handleEdit} className='edit'>Edit</button>
        <button onClick={() => book.id && handleDelete(book.id)} className='delete'>Delete</button>
      </td>
    </tr>
  );
};

export default BookItem;
