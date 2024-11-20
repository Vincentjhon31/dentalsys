@extends('layouts.app')

@section('content')
<div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-4">Add New Service</h1>
    <form action="{{ route('classes.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-4">
            <label for="name" class="block font-bold">Name</label>
            <input type="text" name="name" id="name" class="w-full border rounded px-3 py-2" value="{{ old('name') }}" required>
            @error('name') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label for="description" class="block font-bold">Description</label>
            <textarea name="description" id="description" rows="4" class="w-full border rounded px-3 py-2" required>{{ old('description') }}</textarea>
            @error('description') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label for="duration" class="block font-bold">Duration</label>
            <input type="text" name="duration" id="duration" class="w-full border rounded px-3 py-2" value="{{ old('duration') }}" required>
            @error('duration') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label for="cost" class="block font-bold">Cost</label>
            <input type="number" step="0.01" name="cost" id="cost" class="w-full border rounded px-3 py-2" value="{{ old('cost') }}" required>
            @error('cost') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label for="location" class="block font-bold">Location</label>
            <input type="text" name="location" id="location" class="w-full border rounded px-3 py-2" value="{{ old('location') }}" required>
            @error('location') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label for="category" class="block font-bold">Category</label>
            <input type="text" name="category" id="category" class="w-full border rounded px-3 py-2" value="{{ old('category') }}" required>
            @error('category') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <div class="mb-4">
            <label for="image" class="block font-bold">Image</label>
            <input type="file" name="image" id="image" class="w-full border rounded px-3 py-2">
            @error('image') <p class="text-red-500 text-sm">{{ $message }}</p> @enderror
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add Service</button>
    </form>
</div>
@endsection

