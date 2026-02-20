<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/posts', [PostController::class, 'store']);
Route::get('/posts', [PostController::class, 'getAllPosts']);
Route::get('/posts/{post}', [PostController::class, 'getPost']);
Route::put('posts/{id}', [PostController::class, 'update']);
Route::delete('posts/{id}', [PostController::class, 'delete']);
Route::delete('images/{id}', [ImageController::class, 'delete']);