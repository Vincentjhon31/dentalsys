import React, { useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    // State to track selected view (Monthly, Weekly, Daily)
    const [view, setView] = useState("monthly");

    // Simulated data for appointments (Replace with real data)
    const monthlyData = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [{
            label: "Appointments per Month",
            data: [120, 90, 150, 130, 110, 160, 175, 140, 155, 170, 200, 180],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        }],
    };

    const weeklyData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [{
            label: "Appointments per Week",
            data: [30, 40, 35, 45],  // Simulated data for each week
            backgroundColor: "rgba(255, 159, 64, 0.6)",  // New color for weekly
            borderColor: "rgba(255, 159, 64, 1)",  // New color for weekly
            borderWidth: 1,
        }],
    };

    const dailyData = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [{
            label: "Appointments per Day",
            data: [15, 18, 12, 10, 22, 30, 28],  // Simulated data for each day
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        }],
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
                    text: "Number of Appointments",
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
            <div style={{ width: "100%", height: "250px", margin: "20px" }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart;
