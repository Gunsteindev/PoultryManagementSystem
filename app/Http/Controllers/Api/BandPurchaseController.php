<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BandPurchaseResource;
use App\Models\BandPurchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class BandPurchaseController extends Controller
{
            //
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bandePurchase = BandPurchase::latest()->paginate();

        if ($bandePurchase->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return BandPurchaseResource::collection($bandePurchase);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'band_purchase_code' => 'required|string|max:255',
            'band_purchase_band_code' => 'required|string|max:255',
            'band_purchase_description' => 'required|string|max:255',
            'band_purchase_unit_price' => 'required|numeric',
            'band_purchase_reduction' => 'required|numeric',
            'band_purchase_quantity' => 'required|integer',
            'band_purchase_total_cost' => 'required|numeric',
            'band_purchase_date' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create a BirdBuy record
        $bandePurchase = BandPurchase::create($request->all());

        // return redirect()->route('dashboard.volaille')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Band Purchase created successfully.',
            'data' => $bandePurchase,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $bandPurchase = BandPurchase::findOrFail($id);

        return Inertia::render('BandPurchase/Show', [
            'bandPurchase' => new BandPurchaseResource($bandPurchase)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'band_purchase_code' => 'required|string|max:255',
            'band_purchase_band_code' => 'required|string|max:255',
            'band_purchase_description' => 'required|string|max:255',
            'band_purchase_unit_price' => 'required|numeric',
            'band_purchase_reduction' => 'required|numeric',
            'band_purchase_quantity' => 'required|integer',
            'band_purchase_total_cost' => 'required|numeric',
            'band_purchase_date' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the record or return a 404 error
        $bandePurchase = BandPurchase::findOrFail($id);

        $bandePurchase->update($request->all());


        return response()->json([
            'message' => 'Band Purchase updated successfully.',
            'data' => $bandePurchase,
        ], 200); // Ensure a proper 200 status code is returned.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $bandePurchase = BandPurchase::findOrFail($id); // Find the record or throw a 404 error
        $bandePurchase->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
