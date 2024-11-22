<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentsController extends Controller
{
    public function index()
    {
        // Fetch appointments and include the patient information
        $appointments = Appointment::with('patient')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'patientName' => $appointment->patient->name ?? 'Unknown',
                    'date' => $appointment->date,
                    'start_time' => $appointment->start_time,
                    'end_time' => $appointment->end_time,
                    'appointment_type' => $appointment->appointment_type,
                    'status' => $appointment->status,
                ];
            });

        // Pass data to the frontend (Inertia.js)
        return inertia('Appointments/Main', [
            'appointments' => $appointments,
        ]);
    }

    public function store(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id', // Ensure the patient exists in the database
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'appointment_type' => 'required|string|max:255',
            'status' => 'required|string|max:50',
        ]);

        // Create a new appointment record
        $appointment = Appointment::create([
            'patient_id' => $validated['patient_id'],
            'date' => $validated['date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'appointment_type' => $validated['appointment_type'],
            'status' => $validated['status'],
        ]);

        // Optionally, send a confirmation email to the patient

        // Redirect to the appointments index or send a success message
        return redirect()->route('appointments.index')->with('success', 'Appointment created successfully.');
    }
}
