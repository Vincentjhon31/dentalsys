import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    // Simulated data for the number of appointments per month
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
                label: "Appointments per Month",
                data: [
                    120, 90, 150, 130, 110, 160, 175, 140, 155, 170, 200, 180,
                ], // Replace these with real data as needed
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 205, 86, 0.6)",
                    "rgba(201, 203, 207, 0.6)",
                    "rgba(99, 255, 132, 0.6)",
                    "rgba(192, 75, 75, 0.6)",
                    "rgba(160, 102, 255, 0.6)",
                    "rgba(255, 162, 99, 0.6)",
                    "rgba(132, 99, 255, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(201, 203, 207, 1)",
                    "rgba(99, 255, 132, 1)",
                    "rgba(192, 75, 75, 1)",
                    "rgba(160, 102, 255, 1)",
                    "rgba(255, 162, 99, 1)",
                    "rgba(132, 99, 255, 1)",
                ],
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
                    text: "Number of Appointments",
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
        <div style={{ width: "400px", height: "300px", margin: "20" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
