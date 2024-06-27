import React, { useState, FormEvent, useEffect, useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import { toast } from 'react-toastify';
import './bookform.scss';
import { addBook,updateBook } from '../../api';
import { Book } from '../../types';

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book | null;
  closeModal: () => void;
}

const BookForm = ({  initialData, closeModal }: BookFormProps): JSX.Element => {
  const [book, setBook] = useState<Book>({ id: 0, title: '', author: '', year: '' });
  
  // Using non-null assertion operator since we're sure the context is never undefined
  const { dispatch } = useContext(BookContext)!;

  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clone the book object and remove the 'id' property for new entries
    let submissionBook = { ...book };
    if (!initialData) {
      delete submissionBook?.id; 
    }
  
    try {
     
      const savedBook = initialData
        ? await updateBook(submissionBook)
        : await addBook(submissionBook);
  
      dispatch({ type: initialData ? 'UPDATE_BOOK' : 'ADD_BOOK', payload: savedBook });
      resetForm();
      closeModal();
      toast.success("Book added successfully!");
    } catch (error: any) {
      console.error('Error submitting book:', error.response?.data || error.message);
      alert(`Failed to submit book: ${error.response?.data.error || error.message}`);
      toast.error(`Failed to ${initialData ? 'update' : 'add'} book: ${error.response?.data.error || error.message}`);
      toast.error("Failed to add book!");
    }
  };
  
  // Function to reset the form to initial empty values
  const resetForm = () => {
    setBook({ id: 0, title: '', author: '', year: '' }); 
  };
  
  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Add Book</h2>
      <div className='form-group'>
        <label htmlFor="title" className='label'>Title</label>
        <input id="title" type="text" name="title" value={book.title} onChange={handleChange} className='input' required />
        <label htmlFor="author" className='label'>Author</label>
        <input id="author" type="text" name="author" value={book.author} onChange={handleChange} className='input' required />
        <label htmlFor="year" className='label'>Publication Year</label>
        <input id="year" type="text" name="year" value={book.year} onChange={handleChange} className='input' required />
        <button type="submit" className='submitBtn'>Submit</button>
      </div>
    </form>
  );
};

export default BookForm;
