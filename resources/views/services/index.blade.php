@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
    <h1 class="text-2xl font-bold mb-4">Services</h1>
    <a href="{{ route('classes.create') }}" class="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">Add New Service</a>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach ($services as $service)
        <div class="border rounded-lg p-4 shadow">
            <img src="{{ asset('storage/' . $service->image) }}" alt="{{ $service->name }}" class="w-full h-48 object-cover rounded mb-4">
            <h2 class="text-xl font-bold">{{ $service->name }}</h2>
            <p class="text-gray-700">{{ $service->description }}</p>
            <p class="text-gray-500"><strong>Cost:</strong> ${{ $service->cost }}</p>
        </div>
        @endforeach
    </div>
</div>
@endsection
