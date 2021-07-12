<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Color;
use App\Models\UserColor;
use App\Models\User;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//The api will a sign a user with a new uuid
Route::get('/colors', function (Request $request) {
    return Color::all();
});

Route::get('/users', function (Request $request) {
    return User::with('colors')->get();
});

Route::get('/user/signup', function (Request $request) {
    $user = new User;
    $user->save();
    return response($user->id);
});

Route::get('/user/{id}/addcolor/{color_id}', function (Request $request) {
    $row = new UserColor;
    $row->user_id = $request->id;
    $row->color_id = $request->color_id;
    $row->save();
    return $row->id;
});

Route::resource('user', UserController::class);