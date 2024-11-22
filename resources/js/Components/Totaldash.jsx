import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaUser,
    FaCalendarAlt,
    FaCalendarDay,
    FaCalendarCheck,
    FaClock,
} from "react-icons/fa";

const TotalDash = () => {
    const [patientsCount, setPatientsCount] = useState(0);
    const [appointmentsCount, setAppointmentsCount] = useState(0);
    const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
    const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] =
        useState(0);
    const [pendingPatientsCount, setPendingPatientsCount] = useState(0);

    useEffect(() => {
        // Fetch total patients count from the Laravel API
        axios
            .get("/addpatients/count") // This assumes /patients/count is the correct endpoint in web.php
            .then((response) => {
                setPatientsCount(response.data.count); // Set the total patients count
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
            });

        // Fetch appointments data from Laravel API (adjust API endpoint as needed)
        axios
            .get("/appointments") // Replace with the actual endpoint to fetch appointments
            .then((response) => {
                const appointments = response.data;
                setAppointmentsCount(appointments.length); // Total appointments

                const today = new Date().toISOString().split("T")[0];

                setTodayAppointmentsCount(
                    appointments.filter(
                        (appointment) => appointment.date === today
                    ).length
                );
                setUpcomingAppointmentsCount(
                    appointments.filter(
                        (appointment) => appointment.date > today
                    ).length
                );
                setPendingPatientsCount(
                    appointments.filter(
                        (appointment) => appointment.status === "pending"
                    ).length
                );
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4 mx-auto max-w-5xl">
            {/* Box for total patients */}
            <div className="bg-blue-100 p-4 rounded-md shadow-sm flex items-center justify-center space-x-4 h-27 w-64 mx-auto">
                <FaUser className="text-blue-600 text-3xl" />
                <div className="text-center">
                    <h4 className="text-xs font-semibold">Total Patients</h4>
                    <p className="text-lg font-bold text-blue-800">
                        {patientsCount}
                    </p>
                </div>
            </div>

            {/* Box for total appointments */}
            <div className="bg-green-100 p-4 rounded-md shadow-sm flex items-center justify-center space-x-4 h-27 w-64 mx-auto">
                <FaCalendarAlt className="text-green-600 text-3xl" />
                <div className="text-center">
                    <h4 className="text-xs font-semibold">
                        Total Appointments
                    </h4>
                    <p className="text-lg font-bold text-green-800">
                        {appointmentsCount}
                    </p>
                </div>
            </div>

            {/* Box for today's appointments */}
            <div className="bg-yellow-100 p-4 rounded-md shadow-sm flex items-center justify-center space-x-4 h-27 w-64 mx-auto">
                <FaCalendarDay className="text-yellow-600 text-3xl" />
                <div className="text-center">
                    <h4 className="text-xs font-semibold">
                        Today's Appointments
                    </h4>
                    <p className="text-lg font-bold text-yellow-800">
                        {todayAppointmentsCount}
                    </p>
                </div>
            </div>

            {/* Box for upcoming appointments */}
            <div className="bg-purple-100 p-4 rounded-md shadow-sm flex items-center justify-center space-x-4 h-27 w-64 mx-auto">
                <FaCalendarCheck className="text-purple-600 text-3xl" />
                <div className="text-center">
                    <h4 className="text-xs font-semibold">
                        Upcoming Appointments
                    </h4>
                    <p className="text-lg font-bold text-purple-800">
                        {upcomingAppointmentsCount}
                    </p>
                </div>
            </div>

            {/* Box for pending appointments */}
            <div className="bg-red-100 p-4 rounded-md shadow-sm flex items-center justify-center space-x-4 h-27 w-64 mx-auto">
                <FaClock className="text-red-600 text-3xl" />
                <div className="text-center">
                    <h4 className="text-xs font-semibold">
                        Pending Appointments
                    </h4>
                    <p className="text-lg font-bold text-red-800">
                        {pendingPatientsCount}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TotalDash;
