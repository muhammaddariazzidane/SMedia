<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = [
            'description' => 'required|max:2000',

        ];
        if ($request->file('image')) {
            $validate['image'] = 'image|file|max:3000';
        }

        $validateRules = $request->validate($validate);

        if ($request->file('image')) {
            $validateRules['image'] = $request->file('image')->store('postImages');
        }

        $request->user()->posts()->create($validateRules);

        return redirect()->back()->with('message', 'your post has been created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Posts $posts)
    {
        // dd($posts);
        return Inertia::render('posts/PostDetail', [
            'post' => $posts
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Posts $posts)
    {
        return Inertia::render('posts/PostEdit', [
            'posts' => $posts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Posts $posts): RedirectResponse
    {
        dd($request);
        // $validated = [
        //     'description' => 'required|max:255',
        // ];

        // if ($request->file('image')) {
        //     $validate['image'] = 'image|file|max:3000';
        // }

        // $validateRules = $request->validate($validated);

        // if ($request->file('image')) {
        //     $validateRules['image'] = $request->file('image')->store('postImages');
        //     Storage::delete($posts->image);
        // }

        // // $request->user()->posts()->update($validateRules);
        // $posts->update($validateRules);
        // return redirect(route('dashboard'))->with('message', 'success update post');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Posts $posts)
    {
        if ($posts->image) {
            Storage::delete($posts->image);
        }
        $posts->delete();
        return redirect()->back()->with('message', 'success delete post');
    }
}
