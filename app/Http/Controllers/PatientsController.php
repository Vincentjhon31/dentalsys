<?php

namespace App\Http\Controllers;

use App\Models\Addpatient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientsController extends Controller
{
    // Display all patients with pagination
    public function index()
    {
        $patients = Addpatient::paginate(10); // Change the number if needed

        return Inertia::render('Patients/Index', [
            'patients' => $patients,
        ]);
    }

    // Store new patient
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'dental_case' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);

        Addpatient::create($validatedData);

        return redirect()->route('patients.index')->with('success', 'Patient added successfully!');
    }

    // Update existing patient
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'contact' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'dental_case' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);

        $patient = Addpatient::findOrFail($id);
        $patient->update($validatedData);

        return redirect()->route('patients.index')->with('success', 'Patient updated successfully!');
    }

    // Delete a patient
    public function destroy($id)
    {
        $patient = Addpatient::findOrFail($id);
        $patient->delete();

        return redirect()->route('patients.index')->with('success', 'Patient deleted successfully!');
    }
}
