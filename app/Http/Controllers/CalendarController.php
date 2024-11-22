<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index()
    {
        // Fetch all events to pass to the view
        $events = Calendar::all();
        return view('calendar.index', compact('events')); // Return the view with events
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'description' => 'nullable|string',
            'location' => 'nullable|string',
        ]);

        // Create a new event
        $event = Calendar::create($validated);

        // Redirect back to the calendar page with a success message
        return redirect()->route('calendar.index')->with('success', 'Event added successfully');
    }

    public function show($id)
    {
        // Fetch the event and show the details
        $event = Calendar::findOrFail($id);
        return view('calendar.show', compact('event'));
    }
}
