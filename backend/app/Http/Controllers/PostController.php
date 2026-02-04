<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request) {
        Post::create([
            'title' => $request->title,
            'content' => $request->content
        ]);

        return response()->json(['message' => 'Successfully created post!']);
    }

    public function getAllPosts() {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function getPost(Post $post) {
        return response()->json($post);
    }
}
