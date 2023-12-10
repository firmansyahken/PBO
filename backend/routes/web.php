<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
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

Route::get('/', function () {
    return view('welcome');
});

Route::middleware("auth:admin")->group(function() {
    Route::get("/dashboard", [DashboardController::class, "index"]);
    Route::get("/doctors", [DashboardController::class, "doctor"]);
    Route::get("/register", [DashboardController::class, "create"]);
    Route::post("/register", [DashboardController::class, "store"]);
    
});

Route::get("/admin", [AdminController::class, "login"])->name("login");
Route::post("/logout", [AdminController::class, "logout"]);
Route::post("/admin", [AdminController::class, "authentication"]);