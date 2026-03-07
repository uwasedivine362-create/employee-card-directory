import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or email..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="search"
    />
  );
};

export default SearchBar;
