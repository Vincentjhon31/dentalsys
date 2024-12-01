import React from "react";

const AddButtonMobile = ({ onClick }) => {
    return (
        <button
            className="fixed bottom-4 right-4 bg-black text-white rounded-full p-4 shadow-lg hover:bg-violet-950 focus:outline-none z-40 md:hidden"
            onClick={onClick}
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
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
        </button>
    );
};

export default AddButtonMobile;
