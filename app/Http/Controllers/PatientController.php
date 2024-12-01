<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $patients = Patient::all(); // Fetch all patients
    return inertia('Patients/Index', ['patients' => $patients]); // Assuming Inertia.js setup
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    $patients = Patient::all(); // Fetch all patients
    return inertia('Patients/Create', ['patients' => $patients]); // Pass patients to the view
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
    'full_name' => 'required|string|max:255',
    'email' => 'required|email|unique:patients,email',
    'contact_number' => 'nullable|string|max:15',
    'address' => 'nullable|string|max:255',
    'date_of_birth' => 'nullable|date',
    'gender' => 'nullable|in:male,female,other',
    'occupation' => 'nullable|string|max:100',
], [
    'full_name.required' => 'Full Name is required.',
    'email.required' => 'Email is required.',
    'email.unique' => 'This email is already registered.',
    'gender.in' => 'Please select a valid gender option.',
]);


        Patient::create($validated);

        return redirect()->route('patients.create')->with('success', 'Patient added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        //
         return inertia('Patients/Edit', ['patient' => $patient]); // Render the edit form
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        //
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email,' . $patient->id,
            'contact_number' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'occupation' => 'nullable|string|max:100',
        ]);

        $patient->update($validated);

        return redirect()->route('patients.index')->with('success', 'Patient updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        //
        $patient->delete();

        return redirect()->route('patients.index')->with('success', 'Patient deleted successfully!');
    }

     public function indexApi()
{
    return response()->json([
        'patients' => Patient::latest()->get(),
    ]);
}

}
