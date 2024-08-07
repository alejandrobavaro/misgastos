import React from 'react';

function HeaderSearchBar({ categories, onCategoryChange, searchQuery, setSearchQuery, placeholder }) {
  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <select onChange={handleCategoryChange}>
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

export default HeaderSearchBar;
