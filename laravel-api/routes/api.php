<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Color;
use App\Models\UserColor;
use App\Models\User;
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


Route::get('/colors', function (Request $request) {
    return Color::all();
});

function getUsers() {
    $users = User::with('colors')->get();
    $new = $users->mapWithKeys(function ($item, $i) {
        return [$i => [
            'id' => $item['id'],
            'colors' => $item['colors']->map(function ($c) {
                return ['id' => $c['color_id'], 'color' => $c['color']];
            })
        ]];
    });
    return $new->all();
}

Route::get('/user', function (Request $request) {
    return response(getUsers());
});

Route::get('/user/signup', function (Request $request) {
    $user = new User;
    $user->save();
    return response($user->id);
});

Route::get('/user/{id}/colors', function (Request $request) {
    $user = UserColor::where('user_id', $request->id)->join('colors', function($join) {
        $join->on('color_id', 'colors.id');
    })->get()->pluck('color');
    return response($user);
});

Route::delete('/user/{id}', function (Request $request) {
    return User::where('id', $request->id)->delete();
});

Route::delete('/user/{id}/color/{color_id}', function (Request $request) {
    return UserColor::where('user_id', $request->id)->where('color_id', $request->color_id)->delete();
});

Route::put('/user/{id}/color/{color_id}', function (Request $request) {
    // Change only one color
    if (($new_id = $request->query('replaceWith'))) {
        return UserColor::where('user_id', $request->id)
            ->where('color_id', $request->color_id)
            ->take(1)
            ->update(['color_id' => $new_id]);
    // Add new color
    } else {
        $row = new UserColor;
        $row->user_id = $request->id;
        $row->color_id = $request->color_id;
        $row->save();
        return $row->id;
    }
});