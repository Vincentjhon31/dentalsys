import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecondaryButton from "@/Components/SecondaryButton";
import SearchBar from "@/Components/SearchBar";

export default function CreatePatient({ auth, patients = [] }) {
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [sortCriteria, setSortCriteria] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Change as needed
    const [searchTerm, setSearchTerm] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: "",
        email: "",
        contact_number: "",
        address: "",
        date_of_birth: "",
        gender: "",
        occupation: "",
    });

    const sortedPatients = [...patients].sort((a, b) => {
        const factor = sortOrder === "asc" ? 1 : -1; // Toggle direction
        if (sortCriteria === "name") {
            return factor * a.full_name.localeCompare(b.full_name);
        } else if (sortCriteria === "time") {
            return factor * (new Date(a.created_at) - new Date(b.created_at));
        }
        return 0;
    });

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    // Modal state management
    const [showModal, setShowModal] = useState(false);

    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("patients.store"), {
            onSuccess: () => {
                toast.success("Patient added successfully!");
                reset();
                setShowModal(false); // Close the modal after submissiontoas
            },
            onError: () => {
                toast.error("An error occurred. Please try again.");
            },
        });
    };

    // Pagination logic
    const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
    const paginatedPatients = sortedPatients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Filter patients based on search term
    const filteredPatients = patients.filter((patient) =>
        patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                        Patients Lists
                    </h2>
                    {/* Add Service Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white rounded-full p-1 shadow-lg hover:bg-violet-950  z-50 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>
            }
        >
            <Head title="Add Patient" />
            <ToastContainer position="bottom-right" />

            {/* Modal for adding patient */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl h-5/6 overflow-y-aut">
                        <div className="p-6">
                            <h1 className="text-xl font-bold mb-4">
                                Add Patient
                            </h1>
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                {[
                                    {
                                        id: "full_name",
                                        label: "Full Name",
                                        type: "text",
                                    },
                                    {
                                        id: "email",
                                        label: "Email",
                                        type: "email",
                                    },
                                    {
                                        id: "contact_number",
                                        label: "Contact Number",
                                        type: "text",
                                    },
                                    {
                                        id: "address",
                                        label: "Address",
                                        type: "text",
                                    },
                                    {
                                        id: "date_of_birth",
                                        label: "Date of Birth",
                                        type: "date",
                                    },
                                    {
                                        id: "occupation",
                                        label: "Occupation",
                                        type: "text",
                                    },
                                ].map(({ id, label, type }) => (
                                    <div key={id}>
                                        <label
                                            htmlFor={id}
                                            className="block font-medium text-sm text-gray-700"
                                        >
                                            {label}
                                        </label>
                                        <input
                                            id={id}
                                            type={type}
                                            value={data[id]}
                                            onChange={(e) =>
                                                setData(id, e.target.value)
                                            }
                                            className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                        />
                                        <InputError
                                            message={errors[id]}
                                            className="mt-2"
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block font-medium text-sm text-gray-700 mt-4"
                                    >
                                        Gender
                                    </label>

                                    <select
                                        id="gender"
                                        value={data.gender}
                                        onChange={(e) =>
                                            setData("gender", e.target.value)
                                        }
                                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <InputError message={errors.gender} />
                                </div>

                                <div className="flex justify-end space-x-4 mt-4">
                                    <div className="flex justify-end">
                                        <SecondaryButton
                                            className="mt-4 rounded-full"
                                            disabled={processing}
                                            onClick={() => {
                                                reset(); // Reset all form fields to their initial state
                                                setShowModal(false); // Close the modal
                                            }}
                                        >
                                            Cancel
                                        </SecondaryButton>
                                    </div>
                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <PrimaryButton
                                            className="mt-4 rounded-full"
                                            disabled={processing}
                                        >
                                            Create
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-2xl font-bold text-start my-4 md:hidden">
                Patients List
            </h1>

            {/* Add Patient Button */}
            <button
                className="fixed bottom-4 right-4 bg-black text-white rounded-full p-4 shadow-lg hover:bg-violet-950 focus:outline-none z-40 md:hidden"
                onClick={() => setShowModal(true)}
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

            {/* Sorting Options */}
            <div className="flex items-center justify-end mb-4">
                <label
                    htmlFor="sort"
                    className="mr-2 text-sm font-medium text-gray-700"
                >
                    Sort by:
                </label>
                <div className="flex items-center">
                    <select
                        id="sort"
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="border pr-8 border-gray-300 rounded-md shadow-sm focus:border-indigo-600 focus:ring-indigo-600 focus:ring focus:ring-opacity-50 text-sm p-2 bg-white text-gray-700"
                    >
                        <option value="name">Name</option>
                        <option value="time">Time</option>
                    </select>
                    <button
                        onClick={toggleSortOrder}
                        className="ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
                    >
                        {sortOrder === "asc" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div className="relative">
                {/* Add Service Button for Mobile */}
                <button
                    className="fixed bottom-4 right-4 bg-black text-white rounded-full p-4 shadow-lg hover:bg-violet-950 focus:outline-none z-40 md:hidden"
                    onClick={() => setShowModal(true)}
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

                {/* Patients List with Search Bar */}
                <div className="mt-4 bg-white shadow-sm rounded-lg divide-y mx-auto p-4 sm:p-6 lg:p-8">
                    {/* Search Bar */}
                    <SearchBar
                        placeholder="Search patients by name..."
                        value={searchTerm}
                        onChange={setSearchTerm}
                        className="mb-4"
                    />

                    {paginatedPatients.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {paginatedPatients
                                .filter((patient) =>
                                    patient.full_name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((patient) => (
                                    <li
                                        key={patient.id}
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
                                                {expandedDescriptions[
                                                    patient.id
                                                ]
                                                    ? patient.address ||
                                                      "No address available."
                                                    : (
                                                          patient.address ||
                                                          "No address available."
                                                      ).substring(0, 50)}
                                                {patient.address &&
                                                    patient.address.length >
                                                        50 && (
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

                    {/* Pagination Controls */}
                    <div className="mt-4 pt-4 flex p-4 items-center">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`px-2 py-2 mr-2 border rounded-full ${
                                currentPage === 1
                                    ? "bg-gray-300"
                                    : "bg-indigo-950 text-white hover:bg-indigo-900"
                            }`}
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
                                    d="M15.75 19.5 8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`px-2 py-2 ml-2 border rounded-full ${
                                currentPage === totalPages
                                    ? "bg-gray-300"
                                    : "bg-indigo-950 text-white hover:bg-indigo-900"
                            }`}
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
                                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                        <span className="text-center flex-1">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
