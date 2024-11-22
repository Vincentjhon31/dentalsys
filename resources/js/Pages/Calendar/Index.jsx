import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Import the layout
import { Link } from "@inertiajs/react"; // Link component for navigation

const Calendar = () => {
    return (
        <AuthenticatedLayout header="Calendar">
            {/* Wrap content with AuthenticatedLayout */}
            <div className="container mx-auto py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Calendar</h1>

                {/* You can replace this part with a full calendar library like FullCalendar or custom calendar components */}
                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-lg text-gray-600">
                        This is your calendar page.
                    </p>
                    <p className="text-sm text-gray-400">
                        Add events, schedule appointments, etc.
                    </p>
                </div>

                {/* Placeholder link for now */}
                <div className="mt-6">
                    <Link href="/" className="text-indigo-600 hover:underline">
                        Go back to Dashboard
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Calendar;
