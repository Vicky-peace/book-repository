// Define the structure of a book object
export interface Book {
    id?: number;
    title: string;
    author: string;
    year: string;
  }
  
  // Define props for components that need to handle a single book
  export interface BookProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (bookId: number) => void;
  }
  
  // Define props for the list of books
  export interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (bookId: number) => void;
    
  }
  
  // Define props for pagination component
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  // Define props for the search component
  export interface SearchProps {
    onSearch: (query: string) => void;
  }
  
  // Define props for the book form
  export interface BookFormProps {
    onSubmit: (book: Book) => void;
    initialData?: Book;
  }
  
  export interface SearchProps {
    onSearch: (query: string) => void;
  }
  
  export type onSubmit = (book: Book) => void;

  export type BookAction =
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
