import React, { useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    // State to track selected view (Monthly, Weekly, Daily)
    const [view, setView] = useState("monthly");

    // Simulated data for services (replace with real data)
    const monthlyData = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Service A",
                data: [85, 90, 80, 95, 70, 100, 75, 80, 85, 110, 105, 120],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Service B",
                data: [70, 75, 90, 85, 60, 80, 90, 95, 100, 95, 80, 110],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Service C",
                data: [95, 85, 100, 105, 90, 110, 120, 125, 115, 130, 125, 140],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Service D",
                data: [60, 65, 75, 70, 55, 65, 80, 85, 90, 85, 95, 100],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
            },
        ],
    };

    const weeklyData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: "Service A",
                data: [85, 90, 80, 95],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Service B",
                data: [70, 75, 90, 85],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Service C",
                data: [95, 85, 100, 105],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Service D",
                data: [60, 65, 75, 70],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
            },
        ],
    };

    const dailyData = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
            {
                label: "Service A",
                data: [85, 90, 80, 95, 70, 100, 75],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Service B",
                data: [70, 75, 90, 85, 60, 80, 90],
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
            {
                label: "Service C",
                data: [95, 85, 100, 105, 90, 110, 120],
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Service D",
                data: [60, 65, 75, 70, 55, 65, 80],
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderColor: "rgba(255, 159, 64, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Function to handle view change
    const handleViewChange = (newView) => {
        setView(newView);
    };

    // Select data based on the current view
    let chartData;
    switch (view) {
        case "weekly":
            chartData = weeklyData;
            break;
        case "daily":
            chartData = dailyData;
            break;
        case "monthly":
        default:
            chartData = monthlyData;
            break;
    }

    // Chart configuration
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Rate of Services",
                },
            },
            x: {
                title: {
                    display: true,
                    text: view === "monthly" ? "Months" : view === "weekly" ? "Weeks" : "Days",
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            {/* View Switcher Buttons */}
            <div className="mb-4">
                <button
                    onClick={() => handleViewChange("monthly")}
                    className={`px-3 py-1 text-xs rounded-md ${view === "monthly" ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-700"}`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => handleViewChange("weekly")}
                    className={`px-3 py-1 text-xs rounded-md ${view === "weekly" ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-700"}`}
                >
                    Weekly
                </button>
                <button
                    onClick={() => handleViewChange("daily")}
                    className={`px-3 py-1 text-xs rounded-md ${view === "daily" ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-700"}`}
                >
                    Daily
                </button>
            </div>

            {/* Bar Chart */}
            <div style={{ width: "550px", height: "250px", margin: "20px" }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart;
