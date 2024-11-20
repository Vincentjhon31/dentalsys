import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    // Simulated data for different services' rates for each month
    const data = {
        labels: [
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
                    text: "Months",
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: "600px", height: "300px", margin: "3" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
