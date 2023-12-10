<?php

use App\Http\Controllers\API\AnswerController;
use App\Http\Controllers\API\QuestionController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function () {
        return auth()->user();
    });

    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::post('/user/update/profile', [UserController::class, 'updateProfile']);
    Route::post('/user/update/photo', [UserController::class, 'updatePhoto']);
    Route::post('/user/logout', [UserController::class, 'logout']);
});

Route::prefix('/user')->group(function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'authentication']);
});

Route::prefix('/question')->group(function () {
    Route::get('/', [QuestionController::class, 'question']);
    Route::get('/responded', [QuestionController::class, 'responded']);
    Route::get('/{id}', [QuestionController::class, 'show']);
    Route::post('/create', [QuestionController::class, 'store']);
});

Route::prefix('/answer')->group(function () {
    Route::get('/{id}', [AnswerController::class, 'show']);
    Route::post('/{id}/create', [AnswerController::class, 'store']);
});
