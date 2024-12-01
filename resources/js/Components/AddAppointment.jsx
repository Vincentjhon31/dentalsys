import React, { useState } from "react";
import axios from "axios";
import PatientModal from "./PatientModal";

export default function AddAppointment() {
    const [data, setData] = useState({
        patient_id: "",
        date: "",
        time: "",
        service: "",
    });
    const [showPatientModal, setShowPatientModal] = useState(false);

    const handleSelectPatient = (patient) => {
        setData((prevData) => ({
            ...prevData,
            patient_id: patient.id, // Update with selected patient's ID
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data); // Debug: Check if `patient_id` exists

        try {
            await axios.post("/api/appointments", data);
            alert("Appointment created successfully!");
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Failed to create appointment.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Patient Selection */}
                <button type="button" onClick={() => setShowPatientModal(true)}>
                    Select Patient
                </button>
                <p>Selected Patient ID: {data.patient_id || "None"}</p>

                {/* Other Fields */}
                <input
                    type="date"
                    value={data.date}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    required
                />
                <input
                    type="time"
                    value={data.time}
                    onChange={(e) => setData({ ...data, time: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Service"
                    value={data.service}
                    onChange={(e) =>
                        setData({ ...data, service: e.target.value })
                    }
                    required
                />

                <button type="submit">Submit</button>
            </form>

            {/* PatientModal */}
            <PatientModal
                show={showPatientModal}
                onClose={() => setShowPatientModal(false)}
                onSelectPatient={handleSelectPatient}
            />
        </div>
    );
}
