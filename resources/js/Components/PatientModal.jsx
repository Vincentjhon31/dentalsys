import React, { useEffect, useState } from "react";
import SecondaryButton from "./SecondaryButton";
import axios from "axios";

export default function PatientModal({
    show,
    searchTerm,
    setSearchTerm,
    onSelectPatient,
    onClose,
}) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch patients when the modal is shown
    useEffect(() => {
        if (show) {
            setLoading(true);
            axios
                .get("/api/patients") // Adjust the API route if needed
                .then((response) => {
                    setPatients(response.data.patients);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching patients:", error);
                    setLoading(false);
                });
        }
    }, [show]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg h-3/4 overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Select Patient</h2>

                    {/* Patient Search */}
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mb-4"
                    />

                    {/* Loading Spinner */}
                    {loading ? (
                        <p>Loading patients...</p>
                    ) : patients.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {patients
                                .filter((patient) =>
                                    patient.full_name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((patient) => (
                                    <li
                                        key={patient.id}
                                        className="flex flex-col space-y-1 py-3 px-1 cursor-pointer hover:bg-gray-200 rounded-lg"
                                        onClick={() => {
                                            onSelectPatient(patient); // Pass the full patient object
                                            onClose();
                                        }}
                                    >
                                        <span>{patient.full_name}</span>
                                        <span className="text-sm text-gray-500">
                                            {patient.email}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p>No patients found.</p>
                    )}

                    <div className="flex justify-end space-x-4 mt-4">
                        <SecondaryButton
                            className="rounded-full"
                            onClick={onClose}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
