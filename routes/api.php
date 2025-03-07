<?php

use App\Http\Controllers\Api\{
    BandPurchaseController,
    BatimentController,
    BirdSaleController,
    ClientController,
    ConsomationController,
    EggSaleController,
    FoodController,
    PickupController,
    SupplierController,
    TransferController,
    TreatmentController,
    BirdLossController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('bandpurchase', BandPurchaseController::class);
Route::apiResource('birdsale', BirdSaleController::class);
Route::apiResource('batiment', BatimentController::class);
Route::apiResource('pickup', PickupController::class);
Route::apiResource('eggsale', EggSaleController::class);
Route::apiResource('client', ClientController::class);
Route::apiResource('supplier', SupplierController::class);
Route::apiResource('treatment', TreatmentController::class);
Route::apiResource('foodPurchase', FoodController::class);
Route::apiResource('consomation', ConsomationController::class);
Route::apiResource('transfer', TransferController::class);
Route::apiResource('birdloss', BirdLossController::class);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
