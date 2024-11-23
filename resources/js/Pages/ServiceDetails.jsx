import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TailSpin } from "react-loader-spinner";
import { Head, Link, router } from "@inertiajs/react";

export default function EditableServiceDetails({ auth, service }) {
    const [formData, setFormData] = useState({
        name: service.name || "",
        description: service.description || "",
        duration: service.duration || "",
        cost: service.cost || "",
        location: service.location || "",
        category: service.category || "",
        buffer_time: service.buffer_time || "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        service.image
            ? `${window.location.origin}/storage/${service.image}`
            : null
    );

    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal visibility state

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("duration", formData.duration);
        formDataToSend.append("cost", formData.cost);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("buffer_time", formData.buffer_time);
        if (image) {
            formDataToSend.append("image", image);
        }

        try {
            await router.post(
                route("services.update", service.id),
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onFinish: () => setIsSaving(false),
                }
            );
        } catch (error) {
            console.error("Error saving service:", error);
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        router.get(route("services.index"));
    };

    const confirmDelete = () => {
        setShowDeleteModal(true); // Show modal
    };

    const handleDelete = () => {
        setShowDeleteModal(false); // Close modal
        try {
            router.delete(route("services.destroy", service.id), {
                onSuccess: () => {
                    // alert("Service deleted successfully.");
                    router.get(route("services.index"));
                },
                onError: () => {
                    // alert("An error occurred while deleting the service.");
                },
            });
        } catch (error) {
            console.error("Error deleting service:", error);
            // alert("An error occurred while deleting the service.");
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center">
                    <Link
                        href={route("services.index")}
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
                        {service.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Edit ${service.name}`} />
            <div className="container mx-auto p-6">
                <form onSubmit={handleSave} className="space-y-4">
                    {/* Image Upload and Preview */}
                    <div className="flex justify-center mb-4">
                        <label
                            htmlFor="image"
                            className="block relative w-32 h-32 bg-gray-200 rounded-full shadow cursor-pointer"
                        >
                            {/* Image Preview */}
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Service Preview"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                            ) : (
                                <span className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                                    Click to Upload
                                </span>
                            )}

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Editable Fields */}
                    {[
                        "name",
                        "description",
                        "duration",
                        "cost",
                        "location",
                        "category",
                    ].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block font-medium text-sm text-gray-700"
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            {field === "description" ? (
                                <textarea
                                    id={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                            ) : (
                                <input
                                    id={field}
                                    type={field === "cost" ? "number" : "text"}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                            )}
                        </div>
                    ))}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="items-center rounded-full border border-red-600 bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 shadow-sm transition duration-150 ease-in-out hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
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
            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Confirm Deletion
                        </h2>
                        <p className="text-sm text-gray-600">
                            Are you sure you want to delete this service? This
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
