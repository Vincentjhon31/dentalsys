<?php 
namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentsController extends Controller
{
    public function index()
    {
        $appointments = Appointment::with('patient')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'patientName' => $appointment->patient->name ?? 'Unknown',
                    'date' => $appointment->date,
                    'time' => $appointment->time,
                ];
            });

        // Pass data to the frontend
        return inertia('Appointments/Main', [
            'appointments' => $appointments,
        ]);
    }
}
   
