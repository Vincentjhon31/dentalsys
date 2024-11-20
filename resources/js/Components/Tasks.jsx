// resources/js/Components/Tasks.jsx
import React from "react";

const Tasks = () => {
    return (
        <div>
            <style>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1 {
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                .time {
                    color: #2a9d8f;
                    font-weight: bold;
                }
            `}</style>
            <h1>Today's Appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Type of Appointment</th>
                        <th>Full Name</th>
                        <th>Contact Number</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cleaning</td>
                        <td>John Smith</td>
                        <td>(123) 456-7890</td>
                        <td className="time">09:30 AM</td>
                    </tr>
                    <tr>
                        <td>Checkup</td>
                        <td>Jane Doe</td>
                        <td>(987) 654-3210</td>
                        <td className="time">10:15 AM</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default Tasks;
