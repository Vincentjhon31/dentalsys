import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"; // Import the layout
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // If you're using FontAwesome
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // If you're using FontAwesome
import axios from "axios"; // Import axios for making API calls

const Index = ({ appointments }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        patient_id: "",
        date: "",
        start_time: "",
        end_time: "",
        appointment_type: "",
        address: "",
        phone: "",
        status: "",
    });

    const [appointmentList, setAppointmentList] = useState(appointments || []); // Manage the list of appointments
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to save appointment
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage(""); // Reset error message before each submission
        setSuccessMessage(""); // Reset success message before each submission

        console.log("Form data being sent: ", formData); // Debugging: Log form data

        try {
            const response = await axios.post("/api/appointments", formData);

            // Log the response to see if the appointment was created successfully
            console.log("Response from API: ", response);

            // Check if the appointment was successfully created
            if (response.status === 201) {
                setSuccessMessage("Appointment created successfully!");
                // Update the local state with the newly created appointment
                setAppointmentList((prevAppointments) => [
                    ...prevAppointments,
                    response.data,
                ]);
                setShowModal(false); // Close the modal after submission

                // Hide the success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            }
        } catch (error) {
            console.error("Error saving appointment:", error);
            setErrorMessage(
                "Failed to save the appointment. Please try again."
            );
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto py-6 px-4">
                {/* Success or Error Message - Positioned on Top */}
                {successMessage && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md shadow-lg">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-lg">
                        {errorMessage}
                    </div>
                )}

                {/* Section with white background for Appointments and Add Appointment button */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Appointments</h1>
                        {/* Add Appointment Button */}
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
                                    address: "",
                                    phone: "",
                                    status: "",
                                });
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Appointment
                        </button>
                    </div>

                    {/* Check if appointments exist */}
                    {!appointmentList || appointmentList.length === 0 ? (
                        <p className="text-gray-500">
                            No appointments available.
                        </p>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {appointmentList.map((appointment) => (
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
                                        {appointment.start_time} -{" "}
                                        {appointment.end_time}
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

                {/* Modal for Add/Edit Appointment */}
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
                                        value={formData.appointment_type}
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
                                        <option value="">Select Status</option>
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
                                        onClick={() => setShowModal(false)}
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
        </AuthenticatedLayout>
    );
};

export default Index;
