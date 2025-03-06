import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Pagination({ page, hasMore, searchTerm, setPage }) {
  const router = useRouter();

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    router.push(`/?page=${newPage}&search=${searchTerm}`, { scroll: false });
  }, [router, searchTerm]);

    return (
      <div className="flex justify-center mt-6 space-x-6 ">
        <button
          onClick={() => handlePageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg w-[100px]  ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-400 text-white hover:bg-indigo-500 cursor-pointer"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-indigo-100 text-lg rounded-full">{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasMore}
          className={`px-4 py-2 rounded-lg w-[100px] ${
            !hasMore
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-400 text-white hover:bg-indigo-500 cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
    );
  }
  