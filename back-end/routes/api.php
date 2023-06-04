<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Allgoods_Controller;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//images

Route::get('/images/{imageName}', [Allgoods_Controller::class, 'imagesDisplay'])->middleware('cors');

//Customer

Route::get('/customers', [Allgoods_Controller::class, 'sendDataC']);
Route::put('/customers/{customer_id}/suspend', [Allgoods_Controller::class, 'suspendCustomer']);
Route::put('/customers/{customer_id}/unsuspend', [Allgoods_Controller::class, 'unsuspendCustomer']);
Route::delete('/customers/{customer_id}', [Allgoods_Controller::class, 'DestroyC']);

//Partner

Route::get('/partners', [Allgoods_Controller::class, 'sendDataP']);
Route::put('/partners/{partner_id}/suspend', [Allgoods_Controller::class, 'suspendPartner']);
Route::put('/partners/{partner_id}/unsuspend', [Allgoods_Controller::class, 'unsuspendPartner']);
Route::delete('/partners/{partner_id}', [Allgoods_Controller::class, 'DestroyP']);


//Product

Route::get('/products', [Allgoods_Controller::class, 'sendDataPr']);
Route::delete('/products/{product_id}', [Allgoods_Controller::class, 'DestroyPr']);

//Command

Route::get('/commands', [Allgoods_Controller::class, 'sendDataCm']);
Route::patch('/commands/{command_id}', [Allgoods_Controller::class, 'updateCm']);
Route::delete('/commands/{command_id}', [Allgoods_Controller::class, 'DestroyCm']);



///image

