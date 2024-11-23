<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;


class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     // Fetch all services and pass them to the Inertia page
    //     return Inertia::render('Services/Index', [
    //         'services' => Services::latest()->get(),
    //     ]);
    // }

     public function index()
    {
        // Fetch all services and pass them to the Inertia page
        return inertia('Services/Index', [
            'services' => Services::latest()->get(),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10000',
            'duration' => 'required|string|max:100',
            'cost' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        // Handle image upload if present
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('services', 'public');
        }

        // Create a new service
        Services::create($validated);

        return redirect()->route('services.index')->with('success', 'Service added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $service = Services::findOrFail($id);
        return Inertia::render('ServiceDetails', ['service' => $service]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Services $services)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $service = Services::findOrFail($id);

    // Validate the request data
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'duration' => 'nullable|string',
        'cost' => 'nullable|numeric|min:0',
        'location' => 'nullable|string|max:255',
        'category' => 'nullable|string|max:255',
        'buffer_time' => 'nullable|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10000',
    ]);

    // Check if a new image was uploaded
    if ($request->hasFile('image')) {
        // Delete the old image if it exists
        if ($service->image && Storage::disk('public')->exists($service->image)) {
            Storage::disk('public')->delete($service->image);
        }

        // Store the new image
        $validated['image'] = $request->file('image')->store('services', 'public');
    }

    // Update the service with the validated data
    $service->update($validated);

    return redirect()->route('services.index')->with('success', 'Service updated successfully.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $service = Services::findOrFail($id);

    // Check if the service has an image
    if ($service->image && Storage::disk('public')->exists($service->image)) {
        Storage::disk('public')->delete($service->image); // Delete the image file
    }

    // Delete the service record from the database
    $service->delete();

    return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
}


}
