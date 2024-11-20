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
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10000',
        'duration' => 'required|string',
        'cost' => 'required|numeric',
        'location' => 'required|string',
        'category' => 'required|string',
    ]);


    $imagePath = $request->file('image')->store('services', 'public');

    $service = Services::create([
        'name' => $request->name,
        'description' => $request->description,
        'image' => $imagePath,
        'duration' => $request->duration,
        'cost' => $request->cost,
        'location' => $request->location,
        'category' => $request->category,
    ]);

    return redirect()->back()->with('success', 'Service added successfully!');
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
