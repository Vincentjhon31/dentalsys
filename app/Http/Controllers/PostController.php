<?php

namespace App\Http\Controllers;

//use Illuminate\http\Response;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use function Pest\Laravel\get;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        //return Response('Hello World');
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id','name')->latest()->get(),
        ]);
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
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request->user()->posts()->create($validated);

        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
