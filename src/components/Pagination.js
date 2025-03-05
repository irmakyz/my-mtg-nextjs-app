// components/Pagination.js
import React from "react";

export default function Pagination({ page, hasMore, handlePageChange }) {
    return (
      <div className="flex justify-center mt-6 space-x-6 ">
        {/* Previous Button */}
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
  
        {/* Page Number */}
        <span className="px-4 py-2 bg-indigo-100 text-lg rounded-full">{page}</span>
  
        {/* Next Button */}
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
  