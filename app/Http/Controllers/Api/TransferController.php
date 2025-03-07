<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransferResource;
use App\Models\BandPurchase;
use App\Models\Batiment;
use App\Models\Transfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransferController extends Controller
{
               /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transfer = Transfer::latest()->paginate();

        if ($transfer->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return TransferResource::collection($transfer);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'transfer_batiment_code' => 'required|string|max:255',
            'transfer_band_code' => 'required|string|max:255',
            'transfer_quantity' => 'required|numeric',
            'user_id' => 'required|exists:users,id',

        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Find Batiment where 'batiment_code' matches 'transfer_batiment_code'
        $batiment = Batiment::where('batiment_code', $request->transfer_batiment_code)->first();
    
        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided transfer_batiment_code.',
            ], 404);
        }

        $bandPurchase = BandPurchase::where('band_purchase_band_code', $request->transfer_band_code)->first();
    
        if (!$bandPurchase) {
            return response()->json([
                'message' => 'No matching band_purchase_band_code found for the provided transfer_band_code.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;
        $data['band_purchase_id'] = $bandPurchase->id;
    
        // Create a Pickup record
        $transfer = Transfer::create($data);

        // return redirect()->route('dashboard.admin')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Transfer created successfully.',
            'data' => $transfer,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transfer $transfer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'transfer_batiment_code' => 'required|string|max:255',
            'transfer_band_purchase_code' => 'required|string|max:255',
            'transfer_quantity' => 'required|integer',
            'user_id' => 'required|exists:users,id',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the Treatment record or return a 404 error
        $transfer = Transfer::findOrFail($id);

       // Find Batiment where 'batiment_code' matches 'transfer_batiment_code'
       $batiment = Batiment::where('batiment_code', $request->transfer_batiment_code)->first();
    
       if (!$batiment) {
           return response()->json([
               'message' => 'No matching Batiment found for the provided transfer_batiment_code.',
           ], 404);
       }

       $bandPurchase = BandPurchase::where('band_purchase_code', $request->transfer_band_purchase_code)->first();
   
       if (!$bandPurchase) {
           return response()->json([
               'message' => 'No matching Batiment found for the provided transfer_band_purchase_code.',
           ], 404);
       }
   
       // Assign the found Batiment ID to the request data
       $data = $request->all();
       $data['batiment_id'] = $batiment->id;
       $data['band_purchase_id'] = $bandPurchase->id;

        // Update the Pickup record with the validated and modified data
        $transfer->update($data);

        return response()->json([
            'message' => 'Transfer updated successfully.',
            'data' => $transfer,
        ], 200); // Ensure a proper 200 status code is returned.
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $transfer = Transfer::findOrFail($id); // Find the record or throw a 404 error
        $transfer->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
