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
        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'dental_case' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);

        // Create a new patient record
        Addpatient::create($validatedData);

        return redirect()->route('patients.index')->with('success', 'Patient added successfully!');
    }

    // Update existing patient
    public function update(Request $request, $id)
    {
        // Find the patient by ID
        $patient = Addpatient::findOrFail($id); // Corrected to use Addpatient model

        // Validate the incoming data
        $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1|max:150',
            'gender' => 'required|string|in:Male,Female',
            'contact' => 'required|string|max:15',
            'address' => 'required|string',
            'dental_case' => 'required|string',
            'status' => 'required|string|in:Active,Inactive',
        ]);

        // Update the patient's data
        $patient->update($request->all());

        return redirect()->route('patients.index')->with('success', 'Patient updated successfully.');
    }

    // Delete a patient
    public function destroy($id)
    {
        // Find and delete the patient by ID
        $patient = Addpatient::findOrFail($id);  // Corrected to use Addpatient model
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully'], 200);
    }
}
