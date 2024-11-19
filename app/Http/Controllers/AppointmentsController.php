<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Inertia\Inertia;

class AppointmentsController extends Controller
{
    public function index()
    {
        $appointments = Appointment::all(); 

        
        return Inertia::render('Appointments/Index', [
            'appointments' => $appointments
        ]);
    }
}
