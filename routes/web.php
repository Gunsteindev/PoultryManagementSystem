<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard Routes (Protected)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('dashboard.home');
    })->name('dashboard');

    // Static pages
    Route::get('/Home/index', fn() => Inertia::render('Home/index'))->name('dashboard.home');
    Route::get('/Ponte/index', fn() => Inertia::render('Ponte/index'))->name('dashboard.ponte');
    Route::get('/Volaille/index', fn() => Inertia::render('Volaille/index'))->name('dashboard.volaille');
    Route::get('/Treatment/index', fn() => Inertia::render('Treatment/index'))->name('dashboard.treatment');
    Route::get('/Consomation/index', fn() => Inertia::render('Consomation/index'))->name('dashboard.consomation');
    Route::get('/Admin/index', fn() => Inertia::render('Admin/index'))->name('dashboard.admin');

});

// Profile Management Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Authentication Routes
require __DIR__ . '/auth.php';
