import React from "react";
import { useLocation, Link } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation();

    // Split the current URL path into segments
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="bg-gray-100 px-4 py-2 sm:px-6 lg:px-8">
            <ol className="flex items-center space-x-4">
                {/* Home Link */}
                <li>
                    <Link
                        to="/"
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                        Home
                    </Link>
                </li>

                {/* Breadcrumb links based on path segments */}
                {pathnames.map((value, index) => {
                    const routeTo = `/${pathnames
                        .slice(0, index + 1)
                        .join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>

                            {isLast ? (
                                <span className="text-gray-700 text-sm font-medium">
                                    {decodeURIComponent(value)}
                                </span>
                            ) : (
                                <Link
                                    to={routeTo}
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                    {decodeURIComponent(value)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
