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
    public function index(): Response
{
    // Fetch all services from the database
    $services = Services::all();

    // Pass the services data to the Inertia view
    return Inertia::render('Services/Index', [
        'services' => $services,
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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request->user()->services()->create($validated);

        return redirect(route('services.index'));
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
