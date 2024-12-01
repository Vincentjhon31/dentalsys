import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TailSpin } from "react-loader-spinner";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios"; // Ensure axios is imported

export default function EditableAppointmentDetails({
    auth,
    appointment,
    services: initialServices, // Ensure services are passed from the backend if needed
}) {
    const [formData, setFormData] = useState({
        full_name: appointment.full_name || "",
        service: appointment.service || "",
        date: appointment.date || "",
        start_time: appointment.start_time || "",
        end_time: appointment.end_time || "",
    });

    const [services, setServices] = useState(initialServices || []); // Manage services state
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(route("services.index"));
                setServices(response.data.services || []);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        if (!initialServices) {
            fetchServices();
        }
    }, []);
    const handleSave = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsSaving(true); // Set the saving state to true

        try {
            // Use Inertia's `router.put` for the update request
            await router.put(
                route("appointments.update", appointment.id),
                formData,
                {
                    onSuccess: () => {
                        // Redirect to the index page on successful update
                        router.get(route("appointments.index"));
                    },
                    onError: (errors) => {
                        console.error("Validation errors:", errors); // Log any validation errors
                    },
                    onFinish: () => {
                        setIsSaving(false); // Reset the saving state
                    },
                }
            );
        } catch (error) {
            // Handle unexpected errors
            console.error("Error updating appointment:", error);
            setIsSaving(false);
        }
    };

    const confirmDelete = () => setShowDeleteModal(true);

    const handleDelete = async () => {
        setShowDeleteModal(false);

        try {
            await router.delete(route("appointments.destroy", appointment.id), {
                onSuccess: () => router.get(route("appointments.index")),
            });
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const handleCancel = () => {
        router.get(route("appointments.index"));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center">
                    <Link
                        href={route("appointments.index")}
                        className="text-gray-600 hover:text-black mr-2"
                    >
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
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                        Edit Appointment
                    </h2>
                </div>
            }
        >
            <Head title="Edit Appointment" />

            <div className="container mx-auto p-6">
                <div className="mb-4 flex items-center justify-end">
                    <span className="mr-2 text-sm font-medium text-gray-700">
                        Edit Mode
                    </span>
                    <Switch
                        checked={isEditing}
                        onChange={setIsEditing}
                        className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-indigo-600"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                        />
                    </Switch>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label
                            htmlFor="full_name"
                            className="block font-medium text-sm text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            id="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            readOnly
                            className={`block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${
                                !isEditing
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : ""
                            }`}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="service"
                            className="block font-medium text-sm text-gray-700"
                        >
                            Service
                        </label>
                        <select
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${
                                !isEditing
                                    ? "bg-gray-200 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            <option value="">Select a service</option>
                            {services?.length > 0 ? (
                                services.map((service) => (
                                    <option
                                        key={service.id}
                                        value={service.name}
                                    >
                                        {service.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading services...</option>
                            )}
                        </select>
                    </div>

                    {[
                        { id: "date", label: "Date", type: "date" },
                        { id: "start_time", label: "Start Time", type: "time" },
                        { id: "end_time", label: "End Time", type: "time" },
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
                                value={formData[id]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${
                                    !isEditing
                                        ? "bg-gray-200 cursor-not-allowed"
                                        : ""
                                }`}
                            />
                        </div>
                    ))}

                    {isEditing && (
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="px-4 py-2 text-red-600 border border-red-600 rounded-full hover:bg-red-50"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-4 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Update"}
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold">
                            Confirm Deletion
                        </h2>
                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete this appointment?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
