<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function create()
    {
        return view('classes.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'duration' => 'required|string',
            'cost' => 'required|numeric',
            'location' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('classes', 'public');
        }

        ClassModel::create([
            'name' => $request->name,
            'description' => $request->description,
            'duration' => $request->duration,
            'cost' => $request->cost,
            'location' => $request->location,
            'category' => $request->category,
            'image' => $imagePath,
        ]);

        return redirect()->route('classes.index')->with('success', 'Classes added successfully!');
    }

    public function index()
    {
        $services = ClassModel::all();
        return view('classes.index', compact('classes'));
    }
}
