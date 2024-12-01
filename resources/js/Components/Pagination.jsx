import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null; // Hide pagination if only 1 page

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <div className="mt-4 pt-4 flex p-4 items-center">
            {/* Previous Button */}
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-2 py-2 mr-2 border rounded-full ${
                    currentPage === 1
                        ? "bg-gray-300"
                        : "bg-indigo-950 text-white hover:bg-indigo-900"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                </svg>
            </button>

            {/* Next Button */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-2 py-2 ml-2 border rounded-full ${
                    currentPage === totalPages
                        ? "bg-gray-300"
                        : "bg-indigo-950 text-white hover:bg-indigo-900"
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </button>
            {/* Page Info */}
            <span className="text-center flex-1">
                Page {currentPage} of {totalPages}
            </span>
        </div>
    );
}
