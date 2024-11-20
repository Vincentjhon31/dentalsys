import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddService({ auth, services }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
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

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                    Services & Classes
                </h2>
            }
        >
            <Head title="Add Service" />
            <ToastContainer position="bottom-right" />
            {/* Modal Trigger Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none"
            >
                Add Service
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Add a New Service
                            </h2>
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                {/* Service Name */}
                                <label
                                    htmlFor="name"
                                    className="block font-medium text-sm text-gray-700"
                                >
                                    Service Name
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

                                {/* Image Upload */}
                                <label
                                    htmlFor="image"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Image
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                    className="block w-full mt-1"
                                />
                                <InputError
                                    message={errors.image}
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

                                {/* Submit Button */}
                                <PrimaryButton
                                    className="mt-4"
                                    disabled={processing}
                                >
                                    Submit
                                </PrimaryButton>
                            </form>
                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-4 text-red-500 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-9 pl-11 pr-11">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => handleServiceClick(service)}
                    >
                        <img
                            src={`${window.location.origin}/storage/${service.image}`}
                            alt={service.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">
                                {service.name}
                            </h3>
                            <p className="text-gray-600">{service.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
