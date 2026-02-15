<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request) {
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content
        ]);

        if($request->hasFile('images')) {
            $files = $request->file('images');
            foreach ($files as $file) {
                $path = $file->store('posts', 'public');
                $post->images()->create([
                    'image_path' => $path
                ]);
            };
        };

        return response()->json(['message' => 'Successfully created post!']);
    }

    public function getAllPosts() {
        $posts = Post::with('images')->get();
        return response()->json($posts);
    }

    public function getPost(Post $post) {
        return response()->json($post);
    }
}
