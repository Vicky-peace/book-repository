// Define the structure of a book object
export interface Book {
    id: string;
    title: string;
    author: string;
    year: string;
  }
  
  // Define props for components that need to handle a single book
  export interface BookProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (bookId: string) => void;
  }
  
  // Define props for the list of books
  export interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (bookId: string) => void;
    
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

  