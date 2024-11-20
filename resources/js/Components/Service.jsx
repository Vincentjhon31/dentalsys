import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth, services }) {
    return (
        <>
            <Head title="Services" />

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold mb-4">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services && services.length > 0 ? (
                        services.map((service) => (
                            <div
                                key={service.id}
                                className="border rounded-lg p-4 shadow"
                            >
                                <img
                                    src={`${window.location.origin}/storage/${service.image}`}
                                    alt={service.name}
                                    className="w-full h-48 object-cover"
                                />
                                <h2 className="text-xl font-bold">
                                    {service.name}
                                </h2>
                                <p className="text-gray-700 mt-2">
                                    {service.description}
                                </p>
                                <p className="text-gray-500 mt-2">
                                    <strong>Duration:</strong>{" "}
                                    {service.duration}
                                </p>
                                <p className="text-gray-500">
                                    <strong>Cost:</strong> ${service.cost}
                                </p>
                                <p className="text-gray-500">
                                    <strong>Location:</strong>{" "}
                                    {service.location}
                                </p>
                                <p className="text-gray-500">
                                    <strong>Category:</strong>{" "}
                                    {service.category}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No services available at the moment.</p>
                    )}
                </div>
            </div>
        </>
    );
}
