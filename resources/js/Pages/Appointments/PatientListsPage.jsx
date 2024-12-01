import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed, or you can use fetch()

export default function PatientsListPage({ setSelectedPatient }) {
    const [patients, setPatients] = useState([]); // To store patient data
    const [searchTerm, setSearchTerm] = useState(""); // To store the search term
    const [expandedDescriptions, setExpandedDescriptions] = useState({}); // For handling expanded addresses

    const navigate = useNavigate(); // Hook for navigation

    // Fetch patients from the database when the component mounts
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("/api/patients"); // Replace with your actual API endpoint
                setPatients(response.data); // Store fetched data in the state
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []); // Empty dependency array means this runs once when the component mounts

    // Toggle description for showing more/less address
    const toggleDescription = (id) => {
        setExpandedDescriptions((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient); // Set the selected patient in the parent
        navigate("/appointments"); // Navigate back to AppointmentModal with the selected patient
    };

    return (
        <div className="mt-4 bg-white shadow-sm rounded-lg divide-y mx-auto p-4 sm:p-6 lg:p-8">
            {/* Search Bar */}
            <SearchBar
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="mb-4"
            />

            {patients.length > 0 ? (
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
                                onClick={() => handleSelectPatient(patient)} // Patient click handler
                                className="flex items-center space-x-4 py-3 px-1 cursor-pointer hover:bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:px-1"
                            >
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500">
                                        {patient.full_name
                                            ? patient.full_name
                                                  .charAt(0)
                                                  .toUpperCase()
                                            : "N/A"}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 text-lg">
                                        {patient.full_name || "Unknown"}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {expandedDescriptions[patient.id]
                                            ? patient.address ||
                                              "No address available."
                                            : (
                                                  patient.address ||
                                                  "No address available."
                                              ).substring(0, 50)}
                                        {patient.address &&
                                            patient.address.length > 50 && (
                                                <span
                                                    className="text-blue-500 cursor-pointer ml-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleDescription(
                                                            patient.id
                                                        );
                                                    }}
                                                >
                                                    {expandedDescriptions[
                                                        patient.id
                                                    ]
                                                        ? "Show less"
                                                        : "Show more..."}
                                                </span>
                                            )}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Added on:{" "}
                                        {new Date(
                                            patient.created_at
                                        ).toLocaleString() || "N/A"}
                                    </p>
                                </div>
                            </li>
                        ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">
                    No patients available.
                </p>
            )}
        </div>
    );
}
