<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;

class ImageController extends Controller
{
    public function delete(Request $request, $id) {
        $image = Image::findOrFail($id);
        if ($image) {
            Storage::disk('public')->delete($image->image_path);
            $image->delete();
        }
        return response()->json(['message' => 'Post image is deleted.']);
    }
}
