import React, { useCallback, useState } from "react";

export default function Search({ setSearchTerm, setPage, searchTerm = "" }) {
  const [searchInput, setSearchInput] = useState(searchTerm);
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const searchNewValue = useCallback(() => {
    setSearchTerm(searchInput);
    setPage(1);
  }, [setSearchTerm, setPage, searchInput]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchNewValue();
    }
  };
  return (
    <div className="flex gap-4">
      <input
        type='text'
        placeholder='Search by card name...'
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className='p-2 border rounded-lg md:w-md w-full max-w-xl text-m focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        onClick={searchNewValue}
        className='px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg w-fit cursor-pointer'
      >
        Search
      </button>
    </div>
  );
}
