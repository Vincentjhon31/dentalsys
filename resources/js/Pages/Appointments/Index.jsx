import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddButtonMobile from "@/Components/AddButtonMobile";
import PatientModal from "@/Components/PatientModal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarStyles.css";
import TimeSelector from "@/Components/TimeSelector";
import Pagination from "@/Components/Pagination";
import { router } from "@inertiajs/react";

export default function AddAppointment({ auth, appointments, clients }) {
    const [showModal, setShowModal] = useState(false);
    const [services, setServices] = useState([]); // State to store services
    const [searchTerm, setSearchTerm] = useState(""); // Add search term state
    const localizer = momentLocalizer(moment); // Initialize moment for the calendar
    const [availableTimes, setAvailableTimes] = useState([]); // Tracks available times
    const [timeRange, setTimeRange] = useState({ start: "", end: "" });
    const startMoment = moment(timeRange.start || "12:00 AM", "hh:mm A");
    const [isModalOpen, setModalOpen] = useState(false); // Fix: Add missing state
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to track window width
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7; // Number of appointments per page
    const totalPages = Math.ceil(appointments.length / pageSize);

    // Get appointments for the current page
    const currentAppointments = appointments.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [selectedPatient, setSelectedPatient] = useState({
        id: null,
        name: "",
    });

    const { data, setData, post, processing, reset, errors } = useForm({
        patient_id: null,
        date: "",
        start_time: "",
        end_time: "",
        service: "",
        full_name: "",
    });

    useEffect(() => {
        if (data.date) {
            updateAvailableTimes(data.date);
        }
    }, [data.date, appointments]);

    useEffect(() => {
        if (timeRange.start) {
            const availableEndTimes = availableTimes.filter((time) =>
                moment(time, "hh:mm A").isAfter(
                    moment(timeRange.start, "hh:mm A")
                )
            );
            setTimeRange((prevState) => ({
                ...prevState,
                end: availableEndTimes.length ? availableEndTimes[0] : "",
            }));
        }
    }, [timeRange.start, availableTimes]);

    const updateAvailableTimes = (date) => {
        const startTime = moment("08:00 AM", "hh:mm A");
        const endTime = moment("06:00 PM", "hh:mm A");
        const allTimes = [];

        // Generate all 30-minute time slots within the day
        while (startTime < endTime) {
            allTimes.push(startTime.clone());
            startTime.add(30, "minutes");
        }

        // Retrieve booked time ranges for the selected date
        const bookedRanges = appointments
            .filter((appt) => appt.date === date)
            .map((appt) => ({
                start: moment(appt.start_time, "hh:mm A"),
                end: moment(appt.end_time, "hh:mm A"),
            }));

        // Filter available times by excluding overlaps with booked ranges
        const filteredTimes = allTimes.filter((time) => {
            return !bookedRanges.some((range) =>
                time.isBetween(range.start, range.end, null, "[)")
            );
        });

        setAvailableTimes(filteredTimes.map((time) => time.format("hh:mm A")));
        setTimeRange({ start: "", end: "" });
    };
    useEffect(() => {
        if (timeRange.start) {
            const availableEndTimes = availableTimes.filter((time) =>
                moment(time, "hh:mm A").isAfter(
                    moment(timeRange.start, "hh:mm A")
                )
            );
            setTimeRange((prevState) => ({
                ...prevState,
                end: availableEndTimes.length ? availableEndTimes[0] : "",
            }));
        }
    }, [timeRange.start, availableTimes]);
    // Handle changes to the start time using buttons
    const handleStartTimeChange = (time) => {
        setTimeRange((prevState) => ({
            ...prevState,
            start: prevState.start === time ? "" : time,
            end: "",
        }));
        setData("start_time", time === timeRange.start ? "" : time);
    };
    // Handle changes to the end time using buttons
    const handleEndTimeChange = (time) => {
        if (
            timeRange.start &&
            moment(time, "hh:mm A").isBefore(moment(timeRange.start, "hh:mm A"))
        ) {
            toast.error("End time must be after the start time.");
            return;
        }
        setTimeRange((prevState) => ({
            ...prevState,
            end: prevState.end === time ? "" : time,
        }));
        setData("end_time", time === timeRange.end ? "" : time);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!data.full_name) {
            toast.error("Please select a patient.");
            return;
        }

        if (!data.date) {
            toast.error("Please select a date.");
            return;
        }

        if (!timeRange.start || !timeRange.end) {
            toast.error("Please select valid start and end times.");
            return;
        }

        if (!data.service) {
            toast.error("Please select a service.");
            return;
        }
        // Ensure times are in 24-hour format and exclude AM/PM
        const formatTime = (time) => {
            // Convert AM/PM format to 24-hour format
            return moment(time, "hh:mm A").format("HH:mm");
        };

        // Format the start and end times
        const submissionData = {
            ...data,
            start_time: formatTime(timeRange.start),
            end_time: formatTime(timeRange.end),
        };

        post(route("appointments.store"), {
            data: submissionData,
            onSuccess: () => {
                toast.success("Appointment created successfully!");
                reset();
                setShowModal(false);
                setTimeRange({ start: "", end: "" });
            },
            onError: (errors) => {
                console.error("Submission Errors:", errors);
                toast.error("An error occurred. Please check your input.");
            },
        });
    };

    // Modify event creation to ensure correct datetime
    const events = appointments.map((appointment) => ({
        title: `${appointment.full_name || "Unknown"} - ${appointment.service}`,
        start: moment(
            `${appointment.date} ${appointment.start_time}`,
            "YYYY-MM-DD HH:mm "
        ).toDate(),
        end: moment(
            `${appointment.date} ${appointment.start_time}- ${appointment.end_time}`,
            "YYYY-MM-DD HH:mm HH:mm "
        ).toDate(),
        allDay: false,
    }));

    const handleSelectPatient = (patient) => {
        setData("patient_id", patient.id);
        setData("full_name", patient.full_name);
        setModalOpen(false); // Corrected to use setModalOpen
    };
    useEffect(() => {
        // Fetch available services
        fetch(route("api.services.index"), {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.services) {
                    setServices(data.services); // Populate services list
                } else {
                    console.error("Invalid data format:", data);
                }
            })
            .catch((error) =>
                console.error("Error fetching services:", error.message)
            );
    }, []);

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-1000">
                        Appointments
                    </h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-black text-white rounded-full p-1 shadow-lg hover:bg-violet-950 z-50 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>
            }
        >
            <Head title="Add Appointment" />
            <ToastContainer position="bottom-right" />
            <h1 className="text-2xl font-bold text-start my-4 md:hidden">
                Appointments
            </h1>
            {/* Modal for Adding Appointments */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl h-5/6 overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Create New Appointment
                            </h2>
                            <form onSubmit={submit}>
                                <label
                                    htmlFor="full_name"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Patient's Name
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        id="full_name"
                                        type="text"
                                        value={data.full_name}
                                        className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(true)}
                                        className="bg-blue-500 text-white rounded px-2 py-1"
                                    >
                                        Select Patient
                                    </button>
                                </div>
                                <InputError
                                    message={errors.full_name}
                                    className="mt-2"
                                />
                                {/* Service Dropdown */}
                                <label
                                    htmlFor="service"
                                    className="block font-medium text-sm text-gray-700 mt-4"
                                >
                                    Service
                                </label>
                                <select
                                    id="service"
                                    value={data.service}
                                    onChange={(e) =>
                                        setData("service", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                >
                                    <option value="">Select a service</option>
                                    {services.map((service) => (
                                        <option
                                            key={service.id}
                                            value={service.name}
                                        >
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                                {/* Appointment Date */}
                                <label className="block font-medium text-sm text-gray-700 mt-4">
                                    Appointment Date
                                </label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    className="block w-full mt-1 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                                <label className="block font-medium text-sm text-gray-700 mt-4">
                                    Appointment Time
                                </label>
                                <TimeSelector
                                    availableTimes={availableTimes}
                                    selectedStartTime={timeRange.start}
                                    selectedEndTime={timeRange.end}
                                    onStartTimeChange={handleStartTimeChange}
                                    onEndTimeChange={handleEndTimeChange}
                                />

                                {/* Cancel & Submit Buttons */}
                                <div className="flex justify-end space-x-4 mt-4">
                                    <SecondaryButton
                                        className="mt-4 rounded-full"
                                        onClick={() => {
                                            setShowModal(false);
                                            reset(); // Reset the input
                                        }}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <PrimaryButton
                                        className="mt-4 rounded-full"
                                        disabled={processing}
                                    >
                                        Create
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Patient Selection Modal */}
            <PatientModal
                show={isModalOpen}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSelectPatient={handleSelectPatient}
                onClose={() => setModalOpen(false)}
            />
            {/* Add Service Button for Mobile */}
            <AddButtonMobile
                onClick={() => setShowModal(true)}
            ></AddButtonMobile>
            {/* Calendar View */}
            <div
                className={`${
                    windowWidth <= 768 ? "hidden" : "block"
                } w-full md:w-1/2 mr-auto`} // Adds a class to hide on small screens (max-width: 768px)
            >
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: "80vh", // Uses viewport height
                        width: "70vw", // Uses viewport width%",
                        margin: "0 auto",
                        color: "black",
                    }}
                    className="custom-calendar"
                    onSelectEvent={(event) => toast.info(event.title)}
                    onSelectSlot={(slotInfo) => {
                        setShowModal(true);
                        setData(
                            "date",
                            slotInfo.start.toISOString().split("T")[0]
                        );
                        setData(
                            "time",
                            slotInfo.start
                                .toISOString()
                                .split("T")[1]
                                .slice(0, 5)
                        );
                    }}
                    selectable
                />
            </div>
            <div className="mt-4 bg-white shadow-lg rounded-lg divide-y mx-auto p-6 sm:p-8 lg:p-10 max-w-3xl">
                {/* Upcoming Appointments */}
                <h1 className="text-2xl font-bold text-start my-6 text-gray-900">
                    Upcoming Appointments
                </h1>

                {currentAppointments && currentAppointments.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {currentAppointments.map((appointment) => {
                            // Format the date and time
                            const formattedDate = new Date(
                                appointment.date
                            ).toLocaleDateString("en-US", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            });
                            const formattedTime = `${new Date(
                                `1970-01-01T${appointment.start_time}`
                            ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })} - ${new Date(
                                `1970-01-01T${appointment.end_time}`
                            ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}`;

                            return (
                                <li
                                    key={appointment.id}
                                    className="flex items-center justify-between py-6 px-4 cursor-pointer hover:bg-blue-50 rounded-lg transition duration-300 ease-in-out"
                                >
                                    <div className="flex flex-col space-y-2">
                                        <div className="text-lg font-medium text-gray-900">
                                            {appointment.full_name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {formattedDate} - {formattedTime}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">
                                                Service:
                                            </span>{" "}
                                            {appointment.service}
                                        </div>
                                    </div>

                                    {/* Button or icon for more options */}
                                    <button
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    "appointments.show",
                                                    appointment.id
                                                )
                                            )
                                        }
                                        className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
                                    >
                                        View Details
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="text-center text-gray-600 py-4">
                        No appointments found.
                    </div>
                )}

                {/* Pagination */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    className="mt-6"
                />
            </div>
        </AuthenticatedLayout>
    );
}
