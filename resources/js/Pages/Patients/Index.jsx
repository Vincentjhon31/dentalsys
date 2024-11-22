import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faEdit,
    faTrash,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/components/Pagination";

export default function Index({ patients }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation
    const [patientToDelete, setPatientToDelete] = useState(null); // Store the patient ID to delete
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        dental_case: "",
        status: "",
    });
    const [message, setMessage] = useState(null); // State to manage message notifications
    const [isEditMode, setIsEditMode] = useState(false); // To manage add/edit mode

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // Edit Patient
            Inertia.put(`/patients/${formData.id}`, formData, {
                onSuccess: () => {
                    setShowModal(false);
                    setIsEditMode(false);
                    setFormData({
                        id: "",
                        name: "",
                        age: "",
                        gender: "",
                        contact: "",
                        address: "",
                        dental_case: "",
                        status: "",
                    });
                    setMessage({
                        text: "Patient updated successfully!",
                        type: "success",
                    });
                    Inertia.visit("/patients"); // Redirect to the patients index page
                },
                onError: () => {
                    setMessage({
                        text: "Failed to update patient. Please try again.",
                        type: "error",
                    });
                },
            });
        } else {
            // Add New Patient (This part remains the same)
            Inertia.post("/patients", formData, {
                onSuccess: () => {
                    setShowModal(false);
                    setFormData({
                        name: "",
                        age: "",
                        gender: "",
                        contact: "",
                        address: "",
                        dental_case: "",
                        status: "",
                    });
                    setMessage({
                        text: "Patient added successfully!",
                        type: "success",
                    });
                },
                onError: () => {
                    setMessage({
                        text: "Failed to add patient. Please try again.",
                        type: "error",
                    });
                },
            });
        }
    };

    // Handle Edit button click
    const handleEdit = (patient) => {
        setFormData({
            id: patient.id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            contact: patient.contact,
            address: patient.address,
            dental_case: patient.dental_case,
            status: patient.status,
        });
        setIsEditMode(true); // Set to edit mode
        setShowModal(true); // Show the modal
    };

    // Handle Delete button click - show confirmation modal
    const handleDelete = (id) => {
        setPatientToDelete(id);
        setShowDeleteModal(true);
    };

    // Confirm Delete
    const confirmDelete = () => {
        console.log("Deleting Patient ID:", patientToDelete); // Check if the correct ID is logged
        Inertia.delete(`/patients/${patientToDelete}`, {
            onSuccess: () => {
                setShowDeleteModal(false); // Close modal after successful deletion
                setMessage({
                    text: "Patient deleted successfully!",
                    type: "success",
                });
            },
            onError: (errors) => {
                console.error("Delete request failed:", errors); // Log errors to debug
                setMessage({
                    text: "Failed to delete patient. Please try again.",
                    type: "error",
                });
            },
        });
    };

    // Close Delete Modal without deleting
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Patients" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden h-[600px]">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4 space-x-4">
                                <div className="relative w-2/3">
                                    <input
                                        type="text"
                                        placeholder="Search patients..."
                                        className="w-full pl-4 pr-12 py-2 border-gray-300 rounded-full text-sm text-gray-800 focus:ring-violet-500 focus:border-violet-500"
                                    />
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    />
                                </div>
                                <button
                                    className="bg-violet-600 text-white px-4 py-2 rounded-md text-sm hover:bg-violet-700 flex items-center transition duration-200"
                                    onClick={() => {
                                        setShowModal(true);
                                        setIsEditMode(false); // Add mode
                                        setFormData({
                                            id: "",
                                            name: "",
                                            age: "",
                                            gender: "",
                                            contact: "",
                                            address: "",
                                            dental_case: "",
                                            status: "",
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    />
                                    Add Patient
                                </button>
                            </div>

                            {/* Notification Message */}
                            {message && (
                                <div
                                    className={`p-4 mb-4 text-sm rounded-md ${
                                        message.type === "success"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            {/* Modal for Add/Edit */}
                            {showModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                                        <h2 className="text-2xl font-bold mb-4">
                                            {isEditMode
                                                ? "Edit Patient"
                                                : "Add New Patient"}
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Age
                                                </label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Gender
                                                </label>
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                >
                                                    <option value="">
                                                        Select Gender
                                                    </option>
                                                    <option value="Male">
                                                        Male
                                                    </option>
                                                    <option value="Female">
                                                        Female
                                                    </option>
                                                    <option value="Other">
                                                        Other
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Contact
                                                </label>
                                                <input
                                                    type="text"
                                                    name="contact"
                                                    value={formData.contact}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Dental Case
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dental_case"
                                                    value={formData.dental_case}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Status
                                                </label>
                                                <select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                >
                                                    <option value="">
                                                        Select Status
                                                    </option>
                                                    <option value="Student">
                                                        Student
                                                    </option>
                                                    <option value="Teacher">
                                                        Teacher
                                                    </option>
                                                    <option value="Visitor">
                                                        Visitor
                                                    </option>
                                                    <option value="Staff">
                                                        Staff
                                                    </option>
                                                    <option value="Alumni">
                                                        Alumni
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-violet-600 text-white px-4 py-2 rounded-md"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Delete Confirmation Modal */}
                            {showDeleteModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                                        <h2 className="text-2xl font-bold mb-4">
                                            Are you sure you want to delete this
                                            patient?
                                        </h2>
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                onClick={closeDeleteModal}
                                                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={confirmDelete} // Restore the original delete logic
                                                className="bg-red-600 text-white px-4 py-2 rounded-md"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Patients Table */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                    Patients List
                                </h2>
                                <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                                    <thead>
                                        <tr className="bg-violet-100">
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                ID
                                            </th>
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Name
                                            </th>
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Age
                                            </th>
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Gender
                                            </th>
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Contact
                                            </th>
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Dental Case
                                            </th>
                                            <th className="border px-4 py-2 text-left text-sm font-medium text-gray-700">
                                                Status
                                            </th>
                                            <th className="border px-4 py-2 text-center text-sm font-medium text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.data &&
                                        patients.data.length > 0 ? (
                                            patients.data.map((patient) => (
                                                <tr
                                                    key={patient.id}
                                                    className="hover:bg-violet-50"
                                                >
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.id}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.name}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.age}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.gender}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.contact}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.dental_case}
                                                    </td>
                                                    <td className="border px-4 py-2 text-sm text-gray-700">
                                                        {patient.status}
                                                    </td>
                                                    <td className="border px-4 py-2 text-center text-sm text-gray-700">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    patient
                                                                )
                                                            }
                                                            className="text-blue-600 hover:underline mr-2"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    patient.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:underline"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                        <button className="text-green-600 hover:underline ml-5">
                                                            <FontAwesomeIcon
                                                                icon={faEye}
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="text-center p-4"
                                                >
                                                    No patients found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <Pagination links={patients.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
