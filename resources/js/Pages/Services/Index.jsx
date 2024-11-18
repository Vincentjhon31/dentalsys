import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import Service from "@/Components/Service";

export default function AddService({ auth, services }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        description: "",
        image: null, // For the uploaded image
        duration: "",
        cost: "",
        location: "",
        category: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("services.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Add Service" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-bold mb-4">Add a New Service</h1>
                <form onSubmit={submit} encType="multipart/form-data">
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
                        onChange={(e) => setData("name", e.target.value)}
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.name} className="mt-2" />

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
                        onChange={(e) => setData("description", e.target.value)}
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />

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
                        onChange={(e) => setData("image", e.target.files[0])}
                        className="block w-full mt-1"
                    />
                    <InputError message={errors.image} className="mt-2" />

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
                        onChange={(e) => setData("duration", e.target.value)}
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.duration} className="mt-2" />

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
                        onChange={(e) => setData("cost", e.target.value)}
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.cost} className="mt-2" />

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
                        onChange={(e) => setData("location", e.target.value)}
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.location} className="mt-2" />

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
                        onChange={(e) => setData("category", e.target.value)}
                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.category} className="mt-2" />

                    {/* Submit Button */}
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Add Service
                    </PrimaryButton>
                </form>
            </div>

            {/* Display Services */}
            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {services.map((service) => (
                    <Service key={service.id} service={service} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
