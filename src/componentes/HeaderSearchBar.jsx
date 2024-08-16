import React from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/_03-Componentes/_HeaderSearchBar.scss';

function HeaderSearchBar({ categories = [], onCategoryChange, searchQuery = '', setSearchQuery, placeholder = 'Search...' }) {
  const handleCategoryChange = (event) => {
    if (onCategoryChange) {
      onCategoryChange(event.target.value);
    }
  };

  const handleSearchChange = (event) => {
    if (setSearchQuery) {
      setSearchQuery(event.target.value);
    }
  };

  return (
    <div className="searchbar">
      <select onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
    </div>
  );
}

HeaderSearchBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  onCategoryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default HeaderSearchBar;
