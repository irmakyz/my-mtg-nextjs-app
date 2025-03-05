import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

const Search = React.memo(({ searchTerm, setSearchTerm, setPage }) => {
  const router = useRouter();

  const handleSearchChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
      setPage(1);
      router.push(`/?page=1&search=${e.target.value}`, { scroll: false });
    },
    [router, setSearchTerm, setPage]
  );

  return (
    <input
      type="text"
      placeholder="Search by card name..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="p-2 border rounded-lg md:w-lg w-full max-w-xl text-m focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
});

Search.displayName = "Search";

export default Search;
