import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faBell,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

import ServiceChart from "@/Components/ServiceChart";
import BarChart from "@/Components/BarChart";
import Dashupdate from "@/Components/Dashupdate";
import Totaldash from "@/Components/Totaldash";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [patientCount, setPatientCount] = useState(0);
    const [serviceRates, setServiceRates] = useState([]);
    const [dentalAppointments, setDentalAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        setLoading(true);
        axios
            .get("/data")
            .then((response) => {
                const { patients, services, dentalAnalytics } = response.data;
                setPatientCount(patients.length);
                setServiceRates(services.sort((a, b) => b.rate - a.rate));
                setDentalAppointments(dentalAnalytics.appointments);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const handleNotificationClick = () => {
        alert("Notifications clicked!");
    };

    // Prepare month labels and data for dental appointments chart
    const monthLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dentalDataByMonth = monthLabels.map((month) => {
        return dentalAppointments.filter(({ date }) => {
            const appointmentMonth = new Date(date).toLocaleString("default", {
                month: "long",
            });
            return appointmentMonth === month;
        }).length;
    });

    // Chart data configurations
    const patientData = {
        labels: monthLabels,
        datasets: [
            {
                label: "Total Patients",
                data: Array(12).fill(patientCount / 12),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const serviceData = {
        labels: serviceRates.map((service) => service.name),
        datasets: [
            {
                label: "Service Rates (%)",
                data: serviceRates.map((service) => service.rate),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const dentalData = {
        labels: monthLabels,
        datasets: [
            {
                label: "Appointments by Month",
                data: dentalDataByMonth,
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex-1 p-6 bg-gray-100">
                <div className="flex justify-end items-center mb-6 space-x-4">
                    <div className="relative flex items-center border-2 border-lavender-500 rounded-full w-64">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 w-full text-sm rounded-full py-2 pr-10 pl-4"
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute right-2 text-gray-500"
                        />
                    </div>
                    <div className="flex items-center bg-lavender-100 px-2 py-1 rounded-full shadow-sm w-48">
                        <input
                            type="date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            className="bg-transparent focus:outline-none text-gray-700 border-none text-sm w-full"
                        />
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => alert("Messages clicked!")}
                    >
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-gray-700 text-2xl"
                        />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-white border-2"></span>
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={handleNotificationClick}
                    >
                        <FontAwesomeIcon
                            icon={faBell}
                            className="text-gray-700 text-2xl"
                        />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-white border-2"></span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Dashboard Analytics
                    </h2>
                    {loading ? (
                        <p>Loading analytics...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Total Patients Chart */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">
                                    Appointment Rates
                                    <BarChart></BarChart>
                                </h3>
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 ml-20">
                                    Service Popularity
                                    <ServiceChart></ServiceChart>
                                </h3>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between space-x-4 mt-8">
                    {/* Dashupdate Box */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                        <Dashupdate />
                    </div>

                    {/* Totaldash Box (aligned at the top) */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
                        <Totaldash />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
