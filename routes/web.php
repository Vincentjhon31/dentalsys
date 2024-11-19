<?php

use App\Http\Controllers\ChirpController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Profile;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\AppointmentsController;


// Other routes
Route::get('data', [Profile::class, 'fetchData']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
        
Route::get('/patients', [PatientsController::class, 'index'])->name('patients');
        
Route::post('/patients', [PatientsController::class, 'store'])->name('patients.store');
    });


Route::get('/appointments', function () {
    return Inertia::render('Appointments/Index');
})->middleware(['auth'])->name('appointments');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics');
Route::get('/patients', [PatientsController::class, 'index'])->name('patients');
Route::get('/appointments', [AppointmentsController::class, 'index'])->name('appointments');
Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');

Route::get('/patients', [PatientController::class, 'index'])->name('patients.index');

Route::put('/patients/{patient}', [PatientController::class, 'update']);
Route::delete('/patients/{patient}', [PatientController::class, 'destroy']);



require __DIR__.'/auth.php';
