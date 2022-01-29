<?php

use Illuminate\Support\Facades\Route;

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

Auth::routes();

// Route::get('/', function () {
//     return view('welcome');
// });
//Route::get('/', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//Route::resource('wpp', App\Http\Controllers\WppconnectController::class);
Route::post('wpp', [App\Http\Controllers\WppconnectController::class, 'index'])->name('wpp.index');
Route::post('wpp/getqrcode', [App\Http\Controllers\WppconnectController::class, 'getQrCode'])->name('wpp.getqrcode');
Route::get('wpp/chat', [App\Http\Controllers\WppconnectController::class, 'chat'])->name('wpp.chat');
Route::post('wpp/chatmsg', [App\Http\Controllers\WppconnectController::class, 'getAllMessagesInChat'])->name('wpp.chatmsg');
Route::post('wpp/sendmsg', [App\Http\Controllers\WppconnectController::class, 'sendCahtMessage'])->name('wpp.sendmsg');
//Route::get('wpp/contact', [App\Http\Controllers\WppconnectController::class, 'contact'])->name('wpp.contact');
