import React from "react";

export default function SearchBar({
    placeholder = "Search...",
    onChange,
    value = "",
    className = "",
}) {
    return (
        <div className={`relative ${className}`}>
            <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute right-3 top-2/4 transform -translate-y-2/4 w-5 h-5 text-gray-400"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m2.6-6.9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
            </svg>
        </div>
    );
}
