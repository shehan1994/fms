<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('customer',\App\Http\Controllers\CustomerController::class);
    Route::apiResource('apartment',\App\Http\Controllers\ApartmentController::class);
    Route::apiResource('employee',\App\Http\Controllers\EmployeeController::class);

    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/customers', [\App\Http\Controllers\CustomerController::class, 'search']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
