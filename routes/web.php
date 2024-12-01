<?php
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Profile;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShareController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\PatientController;


Route::get('/', [HomeController::class, 'index']);
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

Route::resource('/posts' , PostController::class)
    ->only(['index', 'store'])
    ->middleware(['auth','verified']);


Route::resource('/share',ShareController::class) #ito may binago ako sa /share, share dati sya
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::get('data', [profile::class, 'fetchData']);



Route::get('/services', [ServicesController::class, 'index'])->name('services.index')
 ->middleware(['auth', 'verified']);
Route::post('/services', [ServicesController::class, 'store'])->name('services.store');


Route::get('/services/{service}/edit', [ServicesController::class, 'edit'])->name('services.edit');
Route::patch('/services/{service}', [ServicesController::class, 'update'])->name('services.update');

Route::get('/services/{id}', [ServicesController::class, 'show'])->name('services.show');
Route::post('/services/{id}/update', [ServicesController::class, 'update'])->name('services.update');

// web.php
Route::delete('/services/{service}', [ServicesController::class, 'destroy'])->name('services.destroy');


Route::resource('appointments', AppointmentController::class)
    ->middleware(['auth', 'verified']);

Route::get('/api/services', [ServicesController::class, 'indexApi'])->name('api.services.index');
Route::post('/appointments/store', [AppointmentController::class, 'store'])->name('appointments.store');

Route::get('/patients/create', [PatientController::class, 'create'])->name('patients.create');
Route::post('/patients', [PatientController::class, 'store'])->name('patients.store');
Route::resource('patients', PatientController::class);
Route::resource('patients', PatientController::class)->middleware(['auth', 'verified']);

Route::get('/appointments/select', [AppointmentController::class, 'select'])->name('appointments.select');
Route::get('/api/patients', [PatientController::class, 'indexApi'])->name('api.patients.index');

Route::post('/appointments', [AppointmentController::class, 'store'])->name('appointments.store');
Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');

Route::get('/appointments/{id}', [AppointmentController::class, 'show'])->name('appointments.show');


require __DIR__.'/auth.php';
