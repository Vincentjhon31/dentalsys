<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

use App\Models\Services;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
    public function show(Services $services)
    {
        //
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
    public function update(Request $request, Services $services)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Services $services)
    {
        //
    }
}
