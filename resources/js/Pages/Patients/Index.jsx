import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faPlus,
    faEdit,
    faTrash,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ patients }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation
    const [patientToDelete, setPatientToDelete] = useState(null); // Store the patient ID to delete

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        dental_case: "",
        status: "",
        email: "",
        dob: "",
    });

    const [message, setMessage] = useState(null); // State to manage message notifications
    const [isEditMode, setIsEditMode] = useState(false); // To manage add/edit mode

    useEffect(() => {
        if (message) {
            toast.success(message); // Show the success message as a toast
        }
    }, [message]);
    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Open delete confirmation modal
    const openDeleteModal = (patient) => {
        setPatientToDelete(patient);
        setShowDeleteModal(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setPatientToDelete(null);
        setShowDeleteModal(false);
    };

    // Confirm delete action
    const confirmDelete = () => {
        if (!patientToDelete) return;

        Inertia.delete(`/patients/${patientToDelete.id}`, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setPatientToDelete(null);
                toast.success("Patient deleted successfully!");

                // Reload patient data or update local state
                Inertia.get("/patients");
            },
            onError: (error) => {
                console.error("Delete error:", error);
                toast.error("Failed to delete patient. Please try again.");
            },
        });
    };

    const handleEdit = (patient) => {
        setFormData({
            id: patient.id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            contact: patient.contact,
            address: patient.address,
            dental_case: patient.dental_case,
            status: patient.status,
            email: patient.email,
            dob: patient.dob,
        });
        setIsEditMode(true); // Set to edit mode
        setShowModal(true); // Show the modal
    };

    const handleView = (id) => {
        Inertia.visit(`/patients/${id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            // Edit Patient
            Inertia.put(`/patients/${formData.id}`, formData, {
                onSuccess: () => {
                    setShowModal(false);
                    setIsEditMode(false);
                    setFormData({
                        id: "",
                        name: "",
                        age: "",
                        gender: "",
                        contact: "",
                        address: "",
                        dental_case: "",
                        status: "",
                        email: "", // Reset the email field
                        dob: "", // Reset the date of birth field
                    });
                    setMessage({
                        text: "Patient updated successfully!",
                        type: "success",
                    });

                    // Reload the patient list after successful edit
                    Inertia.get("/patients");
                },
                onError: () => {
                    setMessage({
                        text: "Failed to update patient. Please try again.",
                        type: "error",
                    });
                },
            });
        } else {
            // Add New Patient
            Inertia.post("/patients", formData, {
                onSuccess: () => {
                    setShowModal(false);
                    setFormData({
                        name: "",
                        age: "",
                        gender: "",
                        contact: "",
                        address: "",
                        dental_case: "",
                        status: "",
                        email: "", // Reset the email field
                        dob: "", // Reset the date of birth field
                    });
                    setMessage({
                        text: "Patient added successfully!",
                        type: "success",
                    });

                    // Reload the patient list after successful addition
                    Inertia.get("/patients");
                },
                onError: () => {
                    setMessage({
                        text: "Failed to add patient. Please try again.",
                        type: "error",
                    });
                },
            });
        }
    };

    const [query, setQuery] = useState("");

    return (
        <AuthenticatedLayout>
            <Head title="Patients" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden h-[600px]">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4 space-x-4">
                                <div className="relative w-2/3">
                                    <input
                                        type="text"
                                        id="search-patients"
                                        placeholder="Search patients..."
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        } // Handle changes
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
                                        setIsEditMode(false); // Add mode
                                        setFormData({
                                            id: "",
                                            name: "",
                                            age: "",
                                            gender: "",
                                            contact: "",
                                            address: "",
                                            dental_case: "",
                                            status: "",
                                            email: "", // Reset the email field
                                            dob: "", // Reset the date of birth field
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    />
                                    Add Patient
                                </button>
                            </div>

                            {/* Notification Message */}
                            {message && (
                                <div
                                    className={`p-4 mb-4 text-sm rounded-md ${
                                        message.type === "success"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            {/* Modal for Add/Edit */}
                            {showModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
                                        <h2 className="text-2xl font-bold mb-4">
                                            {isEditMode
                                                ? "Edit Patient"
                                                : "Add New Patient"}
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                                {/* Name Field */}
                                                <div>
                                                    <label
                                                        htmlFor="name"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Full Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                                {/* Age Field */}
                                                <div>
                                                    <label
                                                        htmlFor="age"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Age
                                                    </label>
                                                    <input
                                                        id="age"
                                                        type="number"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                                {/* Gender Field */}
                                                <div>
                                                    <label
                                                        htmlFor="gender"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Gender
                                                    </label>
                                                    <select
                                                        id="gender"
                                                        name="gender"
                                                        value={formData.gender}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Gender
                                                        </option>
                                                        <option value="Male">
                                                            Male
                                                        </option>
                                                        <option value="Female">
                                                            Female
                                                        </option>
                                                        <option value="Other">
                                                            Other
                                                        </option>
                                                    </select>
                                                </div>
                                                {/* Contact Field */}
                                                <div>
                                                    <label
                                                        htmlFor="contact"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Contact
                                                    </label>
                                                    <input
                                                        id="contact"
                                                        type="text"
                                                        name="contact"
                                                        value={formData.contact}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                                {/* Address Field */}
                                                <div>
                                                    <label
                                                        htmlFor="address"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Address
                                                    </label>
                                                    <input
                                                        id="address"
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                                {/* Dental Case Field */}
                                                <div>
                                                    <label
                                                        htmlFor="dental_case"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Dental Case
                                                    </label>
                                                    <input
                                                        id="dental_case"
                                                        type="text"
                                                        name="dental_case"
                                                        value={
                                                            formData.dental_case
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                                {/* Status Field */}
                                                <div>
                                                    <label
                                                        htmlFor="status"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    >
                                                        <option value="">
                                                            Select Status
                                                        </option>
                                                        <option value="Student">
                                                            Student
                                                        </option>
                                                        <option value="Teacher">
                                                            Teacher
                                                        </option>
                                                        <option value="Visitor">
                                                            Eme lang
                                                        </option>
                                                        <option value="Staff">
                                                            Senior
                                                        </option>
                                                        <option value="Alumni">
                                                            Tambay
                                                        </option>
                                                    </select>
                                                </div>
                                                {/* Email Field */}
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Email
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                                {/* Date of Birth Field */}
                                                <div>
                                                    <label
                                                        htmlFor="dob"
                                                        className="block text-sm text-gray-700"
                                                    >
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        id="dob"
                                                        type="date"
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="w-full px-3 py-1.5 border rounded-md text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {/* Action Buttons */}
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    type="button"
                                                    className="bg-gray-400 text-white px-3 py-1 rounded-md mr-2 text-sm"
                                                    onClick={() =>
                                                        setShowModal(false)
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-violet-600 text-white px-3 py-1 rounded-md text-sm"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Delete Confirmation Modal */}
                            {showDeleteModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
                                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                            Are you sure you want to delete this
                                            patient?
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            {patientToDelete?.name} (ID:{" "}
                                            {patientToDelete?.id})
                                        </p>
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                onClick={closeDeleteModal}
                                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={confirmDelete}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Patients Table */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                    Patients List
                                </h2>
                                <table
                                    className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden"
                                    style={{ height: "230px" }} // Adjusted overall table height
                                >
                                    <thead>
                                        <tr className="bg-violet-100">
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "50px" }}
                                            >
                                                ID
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "130px" }}
                                            >
                                                Name
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "40px" }}
                                            >
                                                Age
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "80px" }}
                                            >
                                                Gender
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "120px" }}
                                            >
                                                Contact
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "120px" }}
                                            >
                                                Dental Case
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "80px" }}
                                            >
                                                Status
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "120px" }}
                                            >
                                                Email
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-left text-sm font-medium text-gray-700"
                                                style={{ width: "80px" }}
                                            >
                                                Date of Birth
                                            </th>
                                            <th
                                                className="border px-2 py-1 text-center text-sm font-medium text-gray-700"
                                                style={{ width: "100px" }}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        className="overflow-y-auto"
                                        style={{ maxHeight: "180px" }} // Adjusted body height
                                    >
                                        {patients.data &&
                                        patients.data.length > 0
                                            ? [
                                                  ...patients.data.map(
                                                      (patient) => (
                                                          <tr
                                                              key={patient.id}
                                                              className="hover:bg-violet-50"
                                                              style={{
                                                                  height: "35px",
                                                              }} // Adjusted row height
                                                          >
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {patient.id}
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {patient.name}
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {patient.age}
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {
                                                                      patient.gender
                                                                  }
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {
                                                                      patient.contact
                                                                  }
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {
                                                                      patient.dental_case
                                                                  }
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {
                                                                      patient.status
                                                                  }
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {
                                                                      patient.email
                                                                  }
                                                              </td>
                                                              <td className="border px-2 py-1 text-sm text-gray-700 truncate">
                                                                  {patient.dob}
                                                              </td>
                                                              <td className="border px-2 py-1 text-center text-sm text-gray-700 truncate">
                                                                  <button
                                                                      onClick={() =>
                                                                          handleEdit(
                                                                              patient
                                                                          )
                                                                      }
                                                                      className="text-blue-600 hover:underline mr-1"
                                                                  >
                                                                      <FontAwesomeIcon
                                                                          icon={
                                                                              faEdit
                                                                          }
                                                                      />
                                                                  </button>
                                                                  <button
                                                                      onClick={(
                                                                          e
                                                                      ) => {
                                                                          e.stopPropagation();
                                                                          openDeleteModal(
                                                                              patient
                                                                          );
                                                                      }}
                                                                      className="text-red-600 hover:underline"
                                                                  >
                                                                      <FontAwesomeIcon
                                                                          icon={
                                                                              faTrash
                                                                          }
                                                                      />
                                                                  </button>

                                                                  <button
                                                                      onClick={() =>
                                                                          handleView(
                                                                              patient.id
                                                                          )
                                                                      } // Attach the view handler
                                                                      className="text-green-600 hover:underline ml-2"
                                                                  >
                                                                      <FontAwesomeIcon
                                                                          icon={
                                                                              faEye
                                                                          }
                                                                      />
                                                                  </button>
                                                              </td>
                                                          </tr>
                                                      )
                                                  ),
                                                  ...Array(
                                                      10 - patients.data.length
                                                  )
                                                      .fill(null)
                                                      .map((_, index) => (
                                                          <tr
                                                              key={`placeholder-${index}`}
                                                              style={{
                                                                  height: "35px",
                                                              }} // Ensured consistent row height
                                                          >
                                                              {Array(10)
                                                                  .fill(null)
                                                                  .map(
                                                                      (
                                                                          __,
                                                                          colIndex
                                                                      ) => (
                                                                          <td
                                                                              key={`placeholder-col-${colIndex}`}
                                                                              className="border px-2 py-1"
                                                                          ></td>
                                                                      )
                                                                  )}
                                                          </tr>
                                                      )),
                                              ]
                                            : Array(10)
                                                  .fill(null)
                                                  .map((_, index) => (
                                                      <tr
                                                          key={`placeholder-${index}`}
                                                          style={{
                                                              height: "35px",
                                                          }} // Ensured consistent row height
                                                      >
                                                          {Array(10)
                                                              .fill(null)
                                                              .map(
                                                                  (
                                                                      __,
                                                                      colIndex
                                                                  ) => (
                                                                      <td
                                                                          key={`placeholder-col-${colIndex}`}
                                                                          className="border px-2 py-1"
                                                                      ></td>
                                                                  )
                                                              )}
                                                      </tr>
                                                  ))}
                                    </tbody>
                                </table>

                                <Pagination links={patients.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
}
