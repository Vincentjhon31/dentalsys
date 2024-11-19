import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";


export default function Index({ appointments }) {
    return (
        <AuthenticatedLayout>
            <Head title="Appointments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-semibold text-violet-600">
                                Appointments
                            </h1>
                            <p className="mt-4 text-gray-700">
                                View your appointments here.
                            </p>

                            <table className="mt-6 table-auto w-full border-separate border-spacing-0">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">
                                            Patient Name
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Date
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Time
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td className="border-t px-4 py-2">
                                                {appointment.patient_name}
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                {appointment.date}
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                {appointment.time}
                                            </td>
                                            <td className="border-t px-4 py-2">
                                                {appointment.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
