import {createContext,useReducer, useEffect, ReactNode, Dispatch, useContext} from 'react';
import {Book, BookAction} from '../types';
import { fetchBooks } from '../api';



interface BookState {
    books: Book[];
}

interface BookProviderProps{
    children: ReactNode;
}

const initialState: BookState = {
    books: [],
};

const BookContext = createContext<{state: BookState, dispatch: Dispatch<BookAction>} | undefined>(undefined);

function bookReducer(state: BookState, action: BookAction): BookState {
    switch(action.type){
        case 'SET_BOOKS':
            return {...state, books: action.payload};
        case 'ADD_BOOK':
            return {...state, books: [...state.books, action.payload]};
        case 'UPDATE_BOOK':
            return {...state, books: state.books.map(book => book.id === action.payload.id ? action.payload : book)};
        case 'DELETE_BOOK':
            return {...state, books: state.books.filter(book => book.id !== action.payload)};
        default:
            throw new Error('Unhandled action type');
    }
}

const BookProvider = ({children}: BookProviderProps) => {
    const [state, dispatch] = useReducer(bookReducer, initialState);

    useEffect(() => {
        fetchBooks().then(books => dispatch({type: 'SET_BOOKS', payload: books}));
    }, []);

    return <BookContext.Provider value={{state, dispatch}}>{children}</BookContext.Provider>;
};

export {BookContext, BookProvider};

// In your BookContext file
export function useBookContext() {
    const context = useContext(BookContext);
    if (context === undefined) {
        throw new Error('useBookContext must be used within a BookProvider');
    }
    return context;
}
