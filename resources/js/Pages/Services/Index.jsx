import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SecondaryButton from "@/Components/SecondaryButton";

export default function AddService({ auth, services }) {
    const [showModal, setShowModal] = useState(false);
    const [expandedDescriptions, setExpandedDescriptions] = useState({}); // Keeps track of expanded descriptions

    const toggleDescription = (serviceId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [serviceId]: !prev[serviceId],
        }));
    };
    const { data, setData, put, post, processing, reset, errors } = useForm({
        id: "", // To store the service ID for editing
        name: "",
        description: "",
        image: null,
        duration: "",
        cost: "",
        location: "",
        category: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("services.store"), {
            onSuccess: () => {
                toast.success("Service added successfully!");
                reset();
                setShowModal(false); // Close the modal after submissiontoas
            },
            onError: () => {
                toast.error("An error occurred. Please try again.");
            },
        });
    };

    const handleServiceClick = (service) => {
        window.location.href = `/services/${service.id}`;
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                        Services & Classes
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
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-4"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>
            }
        >
            <Head title="Add Service" />
            <ToastContainer position="bottom-right" />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl h-5/6 overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Create New Service
                            </h2>
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                {/* Image Upload with Preview */}
                                <div className="flex items-center justify-center mb-6">
                                    <label
                                        htmlFor="image"
                                        className="relative cursor-pointer w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center bg-gray-100 overflow-hidden"
                                    >
                                        {data.image ? (
                                            <img
                                                src={URL.createObjectURL(
                                                    data.image
                                                )}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                                />
                                            </svg>
                                        )}
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData(
                                                    "image",
                                                    e.target.files[0]
                                                )
                                            }
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </div>
                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />

                                {/* Service Title */}
                                <label
                                    htmlFor="name"
                                    className="block font-medium text-sm text-gray-700"
                                >
                                    Service Title
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />

                                {/* Description */}
                                <label
                                    htmlFor="description"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                ></textarea>
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />

                                {/* Duration */}
                                <label
                                    htmlFor="duration"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Duration
                                </label>
                                <input
                                    id="duration"
                                    type="text"
                                    value={data.duration}
                                    onChange={(e) =>
                                        setData("duration", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.duration}
                                    className="mt-2"
                                />

                                {/* Cost */}
                                <label
                                    htmlFor="cost"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Cost
                                </label>
                                <input
                                    id="cost"
                                    type="number"
                                    value={data.cost}
                                    onChange={(e) =>
                                        setData("cost", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.cost}
                                    className="mt-2"
                                />

                                {/* Location */}
                                <label
                                    htmlFor="location"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.location}
                                    className="mt-2"
                                />

                                {/* Category */}
                                <label
                                    htmlFor="category"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Category
                                </label>
                                <input
                                    id="category"
                                    type="text"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.category}
                                    className="mt-2"
                                />
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
                Services
            </h1>
            {/* Add Service Button for Mobile */}
            <button
                className="fixed bottom-4 right-4 bg-black text-white rounded-full p-4 shadow-lg hover:bg-violet-950 focus:outline-none z-40 md:hidden"
                onClick={() => setShowModal(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>

            <div className="relative">
                {/* Add Service Button */}
                <button
                    className="fixed bottom-4 right-4 bg-black text-white rounded-full p-4 shadow-lg hover:bg-violet-950 focus:outline-none z-50 md:hidden"
                    onClick={() => setShowModal(true)}
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
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                </button>
                {/* List View for Services */}
                <div className="mt-4 bg-white shadow-sm rounded-lg divide-y mx-auto p-4 sm:p-6 lg:p-8">
                    {services && services.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {services.map((service) => (
                                <li
                                    key={service.id}
                                    className="flex items-center space-x-4 py-4 px-2 cursor-pointer hover:bg-gray-200 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:px-4"
                                    onClick={() => handleServiceClick(service)}
                                >
                                    {/* Service Image */}
                                    {service.image ? (
                                        <img
                                            src={`${window.location.origin}/storage/${service.image}`}
                                            alt={service.name}
                                            className="w-20 h-20 object-cover rounded-full"
                                        />
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-20 h-20 text-gray-400"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                            />
                                        </svg>
                                    )}

                                    {/* Service Details */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 text-lg">
                                            {service.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {expandedDescriptions[service.id]
                                                ? service.description ||
                                                  "No description available."
                                                : (
                                                      service.description ||
                                                      "No description available."
                                                  ).substring(0, 50)}
                                            {service.description &&
                                                service.description.length >
                                                    50 && (
                                                    <span
                                                        className="text-blue-500 cursor-pointer ml-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleDescription(
                                                                service.id
                                                            );
                                                        }}
                                                    >
                                                        {expandedDescriptions[
                                                            service.id
                                                        ]
                                                            ? "Show less"
                                                            : "Show more..."}
                                                    </span>
                                                )}
                                        </p>
                                    </div>

                                    {/* Service Cost & Duration */}
                                    <div className="text-right">
                                        <p className="text-blue-600 font-semibold">
                                            {service.cost
                                                ? `₱${service.cost}`
                                                : "Free"}{" "}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {service.duration || "N/A"} mins
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">
                            No services available at the moment.
                        </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
