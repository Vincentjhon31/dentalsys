// resources/js/Components/AppointmentTable.jsx

import React from "react";
import { Link } from "@inertiajs/react";

const AppointmentTable = ({ appointments }) => {
    return (
        <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Patient Name</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Start Time</th>
                        <th className="px-4 py-2 text-left">End Time</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id} className="border-t">
                            <td className="px-4 py-2">
                                {appointment.patientName}
                            </td>
                            <td className="px-4 py-2">{appointment.date}</td>
                            <td className="px-4 py-2">
                                {appointment.start_time}
                            </td>
                            <td className="px-4 py-2">
                                {appointment.end_time}
                            </td>
                            <td className="px-4 py-2">{appointment.status}</td>
                            <td className="px-4 py-2">
                                <Link
                                    href={`/appointments/${appointment.id}`}
                                    className="text-indigo-600 hover:underline"
                                >
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentTable;
