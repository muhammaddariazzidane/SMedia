<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\socialite\GithubController;
use App\Http\Controllers\socialite\GoogleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// socialite
Route::get('/auth/{provider}/redirect', [GithubController::class, 'redirect'])->name('github');
Route::get('/auth/{provider}/callback', [GithubController::class, 'callback']);
Route::get('/{provider}/redirect', [GoogleController::class, 'redirect'])->name('google');
Route::get('/{provider}/callback', [GoogleController::class, 'callback']);

require __DIR__.'/auth.php';
