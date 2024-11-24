import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Show({ patient }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Patient Details - ${patient.name}`} />

            {/* Patient Details Header */}
            <div className="w-full h-20 bg-white shadow-sm px-6 py-4 mb-6">
                <h1 className="text-lg font-semibold text-gray-800">
                    Patient Details
                </h1>
            </div>

            {/* Centered Patient Information Box */}
            <div className="flex justify-center">
                <div className="relative bg-gray-100 shadow-lg px-10 py-8 w-full max-w-3xl rounded-lg">
                    {/* Message Icon at Top-Right */}
                    <button
                        className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
                        onClick={() => alert("Messaging feature coming soon!")}
                    >
                        <FontAwesomeIcon icon={faEnvelope} />
                    </button>

                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back
                    </button>

                    {/* Patient Name */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {patient.name}
                        </h2>
                    </div>

                    {/* Patient Information */}
                    <div className="space-y-4">
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">Age:</strong>{" "}
                            {patient.age}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">Gender:</strong>{" "}
                            {patient.gender}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">Contact:</strong>{" "}
                            {patient.contact}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">Address:</strong>{" "}
                            {patient.address}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">
                                Dental Case:
                            </strong>{" "}
                            {patient.dental_case}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">Status:</strong>{" "}
                            {patient.status}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">Email:</strong>{" "}
                            {patient.email}
                        </p>
                        <p className="text-base text-gray-700">
                            <strong className="font-medium">
                                Date of Birth:
                            </strong>{" "}
                            {patient.dob}
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
