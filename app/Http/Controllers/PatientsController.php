<?php

namespace App\Http\Controllers;

use App\Models\Addpatient;  // Ensure the correct model is used
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientsController extends Controller
{
    // This function will return the count of all patients
    public function getPatientsCount()
    {
        // Get the count of all patients in the 'addpatients' table
        $patientsCount = Addpatient::count();
        
        // Return the count in JSON format
        return response()->json(['count' => $patientsCount]);
    }

    // Display all patients with pagination
    public function index()
    {
        // Get patients with pagination
        $patients = Addpatient::paginate(10); // Adjust the number if needed

        return Inertia::render('Patients/Index', [
            'patients' => $patients,
            'links' => $patients->links() // Pass pagination links
        ]);
    }

    // Store new patient
    public function store(Request $request)
{
    // Validate incoming data
    $validated = $request->validate([
        'name' => 'required|string',
        'age' => 'required|integer',
        'gender' => 'required|string',
        'contact' => 'required|string',
        'address' => 'required|string',
        'dental_case' => 'required|string',
        'status' => 'required|string',
        'email' => 'required|email', // Added email field
        'dob' => 'required|date', // Added date of birth field
    ]);

        // Create a new patient using the validated data
        $patient = Addpatient::create($validated);
    
        // Redirect back with success message
        return redirect()->route('patients.index')->with('success', 'Patient added successfully!');
    }
    // Update existing patient
    public function update(Request $request, $id)
    {
        // Fetch the patient to be updated
        $patient = Addpatient::findOrFail($id);
        
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1',
            'gender' => 'required|string',
            'contact' => 'required|string',
            'address' => 'required|string',
            'dental_case' => 'required|string',
            'status' => 'required|string',
            'email' => 'required|email', // Added email validation
            'dob' => 'required|date', // Added date of birth validation
        ]);
    
    
    // Update the patient data
    $patient->update($validatedData);
    
    // Return an Inertia redirect with success message
    return Inertia::render('Patients/Index', [
        'patients' => Addpatient::paginate(10),  // Reload the patients list after update
    ])->with('success', 'Patient updated successfully!');
}


    // Delete a patient
    public function destroy($id)
    {
        // Find and delete the patient by ID
        $patient = Addpatient::findOrFail($id);  // Corrected to use Addpatient model
        $patient->delete();

        // Use toast notification instead of response()->json()
        return redirect()->route('patients.index')->with('toast', 'Patient deleted successfully!');
    }

    public function show($id)
{
    $patient = Addpatient::findOrFail($id); // Fetch the patient data by ID

    return inertia('Patients/Show', [
        'patient' => $patient, // Pass the data to the front-end
    ]);
}
}

