<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        if ($request->input('query')) {
            $data['posts'] = Posts::search($request->input('query'))->get();
        } else {
            $data['posts'] = Posts::latest()->get();
        }
        return Inertia::render('posts/Posts', $data);
    }
}
