import React, { useState, FormEvent, useEffect } from 'react';
import './bookform.scss';

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
}

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book | null;
}

function BookForm({ onSubmit, initialData }: BookFormProps): JSX.Element {
  // Initialize form state with initialData or blank fields
  const [book, setBook] = useState<Book>({ id: 0, title: '', author: '', year: '' });

  // Effect to set initial data when the form is to edit an existing book
  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    } else {
      setBook({ id: 0, title: '', author: '', year: '' }); // Reset form when not editing
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ id: 0, title: '', author: '', year: '' }); // Reset form after submit
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
    <h2>Add Book</h2>
    <div className='form-group'>
      <label htmlFor="title" className='label'>Title</label>
      <input
        id="title"
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        className='input'
        required
        aria-label="Book Title"
      />
    </div>
    <div className='form-group'>
      <label htmlFor="author" className='label'>Author</label>
      <input
        id="author"
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        className='input'
        required
        aria-label="Author Name"
      />
    </div>
    <div className='form-group'>
      <label htmlFor="year" className='label'>Publication Year</label>
      <input
        id="year"
        type="text"
        name="year"
        value={book.year}
        onChange={handleChange}
        className='input'
        required
        aria-label="Publication Year"
      />
    </div>
    <button type="submit" className='submitBtn'>Submit</button>
  </form>
  );
}
export default BookForm;