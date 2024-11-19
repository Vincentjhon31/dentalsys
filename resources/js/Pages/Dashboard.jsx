import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        setLoading(true);
        axios
            .get("/data")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleNotificationClick = () => {
        alert("Notifications clicked!");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex-1 p-6 bg-gray-100">
                {/* Top-right elements */}
                <div className="flex justify-end items-center mb-6 space-x-4">
                    {/* Search Bar - Rounded with outline and no background */}
                    <div className="relative flex items-center border-2 border-lavender-500 rounded-full w-64">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full text-sm rounded-full py-2 pr-10 pl-4" // Added padding for icon space
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute right-2 text-gray-500"
                        />
                    </div>

                    {/* Date Picker */}
                    <div className="flex items-center bg-lavender-100 px-2 py-1 rounded-full shadow-sm w-48">
                        <input
                            type="date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            className="bg-transparent focus:outline-none text-gray-700 border-none text-sm w-full"
                        />
                    </div>

                    {/* Notification icon */}
                    <div
                        className="relative cursor-pointer"
                        onClick={handleNotificationClick}
                    >
                        <FontAwesomeIcon
                            icon={faBell}
                            className="text-gray-700 text-2xl"
                        />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-white border-2"></span>
                    </div>
                </div>
                {/* Add any other dashboard-specific content here */}
            </div>
        </AuthenticatedLayout>
    );
}
