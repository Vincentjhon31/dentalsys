import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashupdate = () => {
    const [appointments, setAppointments] = useState([]);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [showToday, setShowToday] = useState(true); // Default to show today's appointments

    useEffect(() => {
        // Fetch appointments from the server (assuming the endpoint provides this data)
        axios
            .get("/appointments") // Update with your actual API endpoint
            .then((response) => {
                const appointmentsData = response.data;
                setAppointments(appointmentsData);

                const today = new Date().toISOString().split("T")[0];

                // Filter today's and upcoming appointments
                setTodayAppointments(
                    appointmentsData.filter(
                        (appointment) => appointment.date === today
                    )
                );
                setUpcomingAppointments(
                    appointmentsData.filter(
                        (appointment) => appointment.date > today
                    )
                );
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, []);

    const renderAppointment = (appointment) => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="font-semibold text-lg">
                    {appointment.patientName}
                </p>
                <p className="text-sm text-gray-500">
                    {appointment.appointmentType}
                </p>
                <p className="text-sm text-gray-700">
                    Time: {new Date(appointment.time).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-700">
                    Address: {appointment.address}
                </p>
                <p className="text-sm text-gray-700">
                    Phone: {appointment.phone}
                </p>
            </div>
        );
    };

    return (
        <div className="max-w-2xl mx-auto">
            {" "}
            {/* Container with max width of half the page */}
            {/* Title and Buttons Container */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Appointments</h2>

                {/* Buttons for Today and Upcoming outside the grey box */}
                <div className="flex space-x-4">
                    <button
                        className={`px-4 py-1 text-sm rounded-md ${
                            showToday
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => setShowToday(true)}
                    >
                        Today
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md ${
                            !showToday
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-300 text-gray-700"
                        }`}
                        onClick={() => setShowToday(false)}
                    >
                        Upcoming
                    </button>
                </div>
            </div>
            {/* Box for appointments */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
                {/* Display Today or Upcoming Appointments based on the button clicked */}
                {showToday ? (
                    <>
                        <h3 className="font-semibold text-lg text-indigo-600 mb-4">
                            Appointments for today
                        </h3>
                        {todayAppointments.length > 0 ? (
                            todayAppointments.map(renderAppointment)
                        ) : (
                            <p>No appointments for today.</p>
                        )}
                    </>
                ) : (
                    <>
                        <h3 className="font-semibold text-lg text-indigo-600 mb-4">
                            Upcoming Appointments
                        </h3>
                        {upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map(renderAppointment)
                        ) : (
                            <p>No upcoming appointments.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashupdate;
