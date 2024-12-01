import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TailSpin } from "react-loader-spinner";
import { Head, Link, router } from "@inertiajs/react";

export default function PatientsDetails({ auth, patient }) {
    const [formData, setFormData] = useState({
        name: patient.name || "",
        age: patient.age || "",
        gender: patient.gender || "",
        contact_number: patient.contact_number || "",
        address: patient.address || "",
        medical_history: patient.medical_history || "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await router.post(route("patients.update", patient.id), formData, {
                onFinish: () => setIsSaving(false),
            });
        } catch (error) {
            console.error("Error saving patient details:", error);
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.get(route("patients.index"));
    };

    const confirmDelete = () => {
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        try {
            router.delete(route("patients.destroy", patient.id), {
                onSuccess: () => {
                    router.get(route("patients.index"));
                },
            });
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center">
                    <Link
                        href={route("patients.index")}
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
                        {patient.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${patient.name}`} />
            <div className="container mx-auto p-6">
                <form onSubmit={handleSave} className="space-y-4">
                    {[
                        "name",
                        "age",
                        "gender",
                        "contact_number",
                        "address",
                        "medical_history",
                    ].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block font-medium text-sm text-gray-700"
                            >
                                {field.charAt(0).toUpperCase() +
                                    field.slice(1).replace("_", " ")}
                            </label>
                            {field === "medical_history" ? (
                                <textarea
                                    id={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                            ) : (
                                <input
                                    id={field}
                                    type={field === "age" ? "number" : "text"}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="items-center rounded-full border border-red-600 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 shadow-sm transition duration-150 ease-in-out hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="items-center rounded-full border border-gray-300 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="bg-indigo-950 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-900 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <TailSpin
                                        color="#00BFFF"
                                        height={20}
                                        width={20}
                                    />
                                    <span>Saving...</span>
                                </div>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Confirm Deletion
                        </h2>
                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete this patient? This
                            action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
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
