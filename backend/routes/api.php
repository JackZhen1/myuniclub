<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts', [PostController::class, 'getAllPosts']);
Route::get('/posts/{post}', [PostController::class, 'getPost']);