import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ appointments }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        patient_id: "",
        date: "",
        start_time: "",
        end_time: "",
        appointment_type: "",
        status: "",
    });

    // Handle input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post("/appointments", formData, {
            onSuccess: () => {
                setShowModal(false);
                toast.success("Appointment added successfully!");
            },
            onError: () => {
                toast.error("Failed to add appointment. Please try again.");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Appointments" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden h-[600px]">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4 space-x-4">
                                <div className="relative w-2/3">
                                    <input
                                        type="text"
                                        placeholder="Search appointments..."
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
                                        setFormData({
                                            patient_id: "",
                                            date: "",
                                            start_time: "",
                                            end_time: "",
                                            appointment_type: "",
                                            status: "",
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    />
                                    Add Appointment
                                </button>
                            </div>

                            {/* Modal for Add */}
                            {showModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                                        <h2 className="text-2xl font-bold mb-4">
                                            Add New Appointment
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Patient ID
                                                </label>
                                                <input
                                                    type="text"
                                                    name="patient_id"
                                                    value={formData.patient_id}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Start Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="start_time"
                                                    value={formData.start_time}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    End Time
                                                </label>
                                                <input
                                                    type="time"
                                                    name="end_time"
                                                    value={formData.end_time}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700">
                                                    Appointment Type
                                                </label>
                                                <input
                                                    type="text"
                                                    name="appointment_type"
                                                    value={
                                                        formData.appointment_type
                                                    }
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
                                                    <option value="Scheduled">
                                                        Scheduled
                                                    </option>
                                                    <option value="Completed">
                                                        Completed
                                                    </option>
                                                    <option value="Cancelled">
                                                        Cancelled
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
                        </div>
                    </div>
                </div>
            </div>
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </AuthenticatedLayout>
    );
}
