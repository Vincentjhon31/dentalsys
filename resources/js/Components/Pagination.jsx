import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({ links }) => {
    const handlePaginationText = (text) => {
        // Replace HTML entities with symbols
        return text.replace(/&laquo;/g, "«").replace(/&raquo;/g, "»");
    };

    return (
        <div className="mt-4">
            <nav aria-label="Pagination">
                <ul className="flex justify-center space-x-2">
                    {/* Previous Button */}
                    {links.prev && (
                        <li>
                            <Link
                                href={links.prev}
                                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                            >
                                {handlePaginationText("&laquo;")} Previous
                            </Link>
                        </li>
                    )}

                    {/* Page Numbers */}
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link
                                href={link.url || "#"}
                                className={`px-4 py-2 rounded-md ${
                                    link.active
                                        ? "bg-violet-600 text-white"
                                        : "bg-white text-violet-600"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: handlePaginationText(link.label),
                                }}
                            />
                        </li>
                    ))}

                    {/* Next Button */}
                    {links.next && (
                        <li>
                            <Link
                                href={links.next}
                                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
                            >
                                Next {handlePaginationText("&raquo;")}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
