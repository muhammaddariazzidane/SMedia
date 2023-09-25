<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Posts;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'posts' => Posts::where('user_id', auth()->user()->id)->latest()->get()
            // 'users' => User::all()
        ];
        return Inertia::render('Dashboard', $data);
    }
}
