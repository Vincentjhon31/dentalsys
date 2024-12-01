import React, { useState } from "react";

export default function SortComponent({ onSortChange }) {
    const [sortCriteria, setSortCriteria] = useState("name"); // Sorting option
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

    // Handle sorting option change
    const handleSortChange = (e) => {
        const newCriteria = e.target.value;
        setSortCriteria(newCriteria);
        onSortChange(newCriteria, sortOrder); // Pass the new sort option and current order
    };

    // Toggle sort order between ascending and descending
    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        onSortChange(sortCriteria, newOrder); // Pass the current sort option and new order
    };

    return (
        <div className="flex items-center justify-end mb-4">
            {/* Sort Label */}
            <label
                htmlFor="sort"
                className="mr-2 text-sm font-medium text-gray-700"
            >
                Sort by:
            </label>

            <div className="flex items-center">
                {/* Sort Dropdown */}
                <select
                    id="sort"
                    value={sortCriteria}
                    onChange={handleSortChange}
                    className="border pr-8 border-gray-300 rounded-md shadow-sm focus:border-indigo-600 focus:ring-indigo-600 focus:ring focus:ring-opacity-50 text-sm p-2 bg-white text-gray-700"
                >
                    <option value="name">Name</option>
                    <option value="time">Time</option>
                </select>

                {/* Sort Order Button */}
                <button
                    onClick={toggleSortOrder}
                    className="ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
                >
                    {sortOrder === "asc" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}
