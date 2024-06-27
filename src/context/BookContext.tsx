import { createContext, useReducer, useEffect, ReactNode, Dispatch, useContext } from 'react';
import { Book, BookAction } from '../types';
import { fetchBooks } from '../api';

interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
    refreshTrigger: boolean;  // Add this to trigger refetches
}

interface BookProviderProps {
    children: ReactNode;
}

const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
    refreshTrigger: false
};

const BookContext = createContext<{ state: BookState; dispatch: Dispatch<BookAction> } | undefined>(undefined);

function bookReducer(state: BookState, action: BookAction): BookState {
    switch (action.type) {
        case 'SET_BOOKS':
            return { ...state, books: action.payload, loading: false };
        case 'ADD_BOOK':
        case 'UPDATE_BOOK':
        case 'DELETE_BOOK':
            return { ...state, refreshTrigger: !state.refreshTrigger };  // Toggle to trigger refetch
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            throw new Error('Unhandled action type');
    }
}

const BookProvider = ({ children }: BookProviderProps) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'SET_LOADING', payload: true });
        fetchBooks()
            .then(books => dispatch({ type: 'SET_BOOKS', payload: books }))
            .catch(error => dispatch({ type: 'SET_ERROR', payload: error.message }));
    }, [state.refreshTrigger]);  // Depend on refreshTrigger to refetch

    return <BookContext.Provider value={{ state, dispatch }}>{children}</BookContext.Provider>;
};

export { BookContext, BookProvider };

export function useBookContext() {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBookContext must be used within a BookProvider');
    }
    return context;
}
