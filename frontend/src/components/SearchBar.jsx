// src/components/SearchBar.jsx
import React from "react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="mb-4">
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200"
    />
  </div>
);

export default SearchBar;
