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


Route::resource('services', ServicesController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
