import s from './SearchBar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuerySearch = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Enter the film title');
    }

    onSearch(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          type="text"
          name="searchQuery"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Enter movie title..."
          onChange={handleQuerySearch}
          className={s.searchInput}
        />
        <button type="submit" className={s.searchButton}>
          Search
        </button>
      </form>
    </>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
