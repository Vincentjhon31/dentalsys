import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Import the layout

const Main = ({ appointments }) => {
    // appointments are passed from the backend
    return (
        <AuthenticatedLayout header="Appointments">
            {" "}
            {/* Wrap content with AuthenticatedLayout */}
            <div className="container mx-auto py-6 px-4">
                <h1 className="text-2xl font-bold mb-6">Appointments</h1>

                {!appointments || appointments.length === 0 ? (
                    <p className="text-gray-500">No appointments available.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {appointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="bg-white shadow rounded-lg p-4"
                            >
                                <h2 className="text-lg font-semibold">
                                    {appointment.patientName}
                                </h2>
                                <p className="text-gray-600">
                                    {appointment.date}
                                </p>
                                <p className="text-gray-600">
                                    {appointment.time}
                                </p>
                                <Link
                                    href={`/appointments/${appointment.id}`}
                                    className="text-indigo-600 hover:underline"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Main;
