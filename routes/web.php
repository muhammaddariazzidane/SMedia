<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\socialite\GithubController;
use App\Http\Controllers\socialite\GoogleController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/post/{posts}', [PostsController::class, 'show'])->name('posts.detail');
Route::get('/post/{posts}/edit', [PostsController::class, 'edit'])->middleware('auth')->name('posts.edit');
Route::put('/post/{id}', [PostsController::class, 'update'])->middleware('auth')->name('posts.update');
Route::delete('/post/{posts}', [PostsController::class, 'destroy'])->middleware('auth')->name('posts.delete');
// Route::resource('posts', PostsController::class);

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/userLists', [ProfileController::class, 'index'])->name('userLists');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::post('/posts', [PostsController::class, 'store'])->name('posts.store');
});


// socialite
Route::get('/auth/{provider}/redirect', [GithubController::class, 'redirect'])->name('github');
Route::get('/auth/{provider}/callback', [GithubController::class, 'callback']);
Route::get('/{provider}/redirect', [GoogleController::class, 'redirect'])->name('google');
Route::get('/{provider}/callback', [GoogleController::class, 'callback']);

require __DIR__ . '/auth.php';
