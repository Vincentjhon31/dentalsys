<?php

namespace App\Http\Controllers;


use App\Models\Appointment;
use App\Models\Services;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    $appointments = Appointment::with('patient')->get();

return Inertia::render('Appointments/Index', [
    'appointments' => $appointments,
]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $services = Services::all();
        $patients = Patient::all(); // Fetching all patients
        return Inertia::render('Appointments/Create', [
            'services' => $services,
            'patients' => $patients // Pass patients to the view
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    // Validate the incoming request
    $validatedData = $request->validate([

        'full_name' => 'required|string|max:255',
        'date' => 'required|date',
        'start_time' => 'required',
        'end_time' => 'required|after:start_time',
        'service' => 'required|string|max:255',
    ]);

    // Find the patient by full name
    $patient = Patient::where('full_name', $request->full_name)->first();

    if (!$patient) {
        // Return an error response if the patient is not found
        return response()->json([
            'errors' => ['full_name' => ['Patient not found.']],
        ], 422);
    }

    // Convert start time and end time from 12-hour AM/PM format to 24-hour format
    $startTime = Carbon::createFromFormat('h:i A', $validatedData['start_time'])->format('H:i');
    $endTime = Carbon::createFromFormat('h:i A', $validatedData['end_time'])->format('H:i');

    // Create a new appointment record
    $appointment = Appointment::create([
        'patient_id' => $patient->id,  // Associate the appointment with the patient
        'full_name' => $validatedData['full_name'],
        'service' => $validatedData['service'], // Store the service
        'date' => $validatedData['date'], // Store the date
        'start_time' => $startTime, // Store the start time in 24-hour format
        'end_time' => $endTime, // Store the end time in 24-hour format
    ]);

    // Redirect to the appointments index with a success message
    return redirect()->route('appointments.index')->with('success', 'Appointment created successfully.');
}

    /**
     * Display the specified resource.
     */
    public function show($id)
{
     $appointment = Appointment::with(['service', 'patient'])->findOrFail($id);

    return Inertia::render('Appointments/Show', [
        'appointment' => $appointment,
        'service' => $appointment->service, // Pass the associated service
    ]);

}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
        $services = Services::all();
        return Inertia::render('Appointments/Edit', [
            'appointment' => $appointment,
            'services' => $services,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $id)
    {
    $appointment = Appointment::findOrFail($id);

        $validatedData = $request->validate([
            // 'full_name' => 'required|string|max:255',
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required|after:start_time',
            'service' => 'required|string|max:255',
        ]);

        $appointment->update([
            // 'full_name' => $validatedData['full_name'],
            'date' => $validatedData['date'],
            'start_time' => Carbon::parse($validatedData['start_time'])->format('H:i'),
            'end_time' => Carbon::parse($validatedData['end_time'])->format('H:i'),
            'service' => $validatedData['service'],
        ]);

        return redirect()->route('appointments.index')->with('success', 'Appointment updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

    return redirect()->route('appointments.index')->with('success', 'Appointment deleted successfully.');
    }

      public function indexApi()
{
    return response()->json([
        'patients' => Patient::latest()->get(),
    ]);
}
public function servicesIndex()
{
    $services = Services::all(); // Fetch all services
    return response()->json([
        'services' => $services,
    ]);
}

}
