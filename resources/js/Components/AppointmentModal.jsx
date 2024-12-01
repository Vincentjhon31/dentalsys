import React from "react";

const AppointmentCreate = ({ patients }) => {
    const [showPatientsModal, setShowPatientsModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState("");

    return (
        <div>
            <button onClick={() => setShowPatientsModal(true)}>
                Select Patient
            </button>

            {showPatientsModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg h-3/4 overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Select Patient
                            </h2>
                            <ul>
                                {patients.map((patient) => (
                                    <li
                                        key={patient.id}
                                        className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                                        onClick={() => {
                                            setSelectedPatient(
                                                patient.full_name
                                            );
                                            setShowPatientsModal(false);
                                        }}
                                    >
                                        {patient.full_name}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => setShowPatientsModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentCreate;
