<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


// function getUsers() {
//     $users = User::with('colors')->get();
//     $new = $users->mapWithKeys(function ($item, $i) {
//         return [$i => [
//             'id' => $item['id'],
//             'colors' => $item['colors']->map(function ($c) {
//                 return ['id' => $c['color_id'], 'color' => $c['color']];
//             })
//         ]];
//     });
//     return $new->all();
// }

Route::get('/admin', function () {
    return view('admin')->with('users', getUsers());
});