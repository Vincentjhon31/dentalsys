<?php

namespace App\Http\Controllers;

use App\Models\Addpatient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientsController extends Controller
{
    // Display all patients with pagination
    // Display all patients
public function index()
{
    // You can paginate if you have many patients
    $patients = Addpatient::paginate(10); // Change the number if needed

    // Return Inertia view and pass patients data
    return Inertia::render('Patients/Index', [
        'patients' => $patients, // This will be accessible in the React component
    ]);
}


    // Store new patient
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'dental_case' => 'nullable|string|max:255', // Allow null if not provided
            'status' => 'required|string',
        ]);

        // Save the new patient record in the addpatients table
        Addpatient::create($validatedData);

        // Redirect back to the patients index with success message
        return redirect()->route('patients.index')->with('success', 'Patient added successfully!');
    }
}
