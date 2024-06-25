import React, { useState } from 'react';
import { SearchProps } from '../../types';
import './searchComponent.scss'; 

function SearchComponent({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm); // Trigger the search action passed from the parent component
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>
    </div>
  );
}

export default SearchComponent;
