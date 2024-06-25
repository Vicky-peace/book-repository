import { useState, FormEvent, useEffect } from 'react';
import './bookform.scss';

interface Book {
    id: string;
  title: string;
  author: string;
  year: string;
}

export interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book;
}

function BookForm({ onSubmit, initialData }: BookFormProps): JSX.Element {
  // Using useState for form data management
  const [book, setBook] = useState<Book>({ id:'',title: '', author: '', year: '' });

  // Effect to pre-populate form when initialData changes
  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(book);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setBook({ id: '', title: '', author: '', year: '' });
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
