<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\CalendarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home route (Welcome Page)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Chirps Resource
Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// Patients Routes
Route::middleware('auth')->group(function () {
    Route::get('/patients', [PatientsController::class, 'index'])->name('patients.index');
    Route::post('/patients', [PatientsController::class, 'store'])->name('patients.store');
    Route::put('/patients/{id}', [PatientsController::class, 'update'])->name('patients.update');  // Fixed: Use PatientsController
    Route::delete('/patients/{patient}', [PatientsController::class, 'destroy'])->name('patients.destroy');
    Route::get('/patients/{id}', [PatientsController::class, 'show'])->name('patients.show');

});


// Calendar Route
Route::middleware('auth')->group(function () {
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
});



Route::get('data', [ProfileController::class, 'fetchData'])->name('data.fetch');


Route::get('/api/addpatients/count', [PatientsController::class, 'getPatientsCount']);

Route::middleware(['auth'])->group(function () {
    // Show the calendar page with events
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar.index');
    
    // Store a new event
    Route::post('/calendar', [CalendarController::class, 'store'])->name('calendar.store');
    
    // Show details for a specific event
    Route::get('/calendar/{id}', [CalendarController::class, 'show'])->name('calendar.show');

});


Route::middleware('auth')->group(function () {
    // Route to display the appointments page
    Route::get('/appointments', [AppointmentsController::class, 'index'])->name('appointments.index');
    Route::post('/appointments', [AppointmentsController::class, 'store'])->name('appointments.store');
});

require __DIR__.'/auth.php';
