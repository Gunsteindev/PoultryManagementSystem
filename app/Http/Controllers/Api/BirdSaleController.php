<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BirdSaleResource;
use App\Models\Batiment;
use App\Models\BirdSale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BirdSaleController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $birdsale = BirdSale::latest()->paginate();

        if ($birdsale->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return BirdSaleResource::collection($birdsale);
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
            'bird_sale_code' => 'required|string|max:255',
            'bird_sale_batiment_code' => 'required|string|max:255',
            'bird_sale_description' => 'required|string|max:255',
            'bird_sale_unit_price' => 'required|numeric',
            'bird_sale_reduction' => 'required|numeric',
            'bird_sale_quantity' => 'required|integer',
            'bird_sale_total_cost' => 'required|numeric',
            'bird_sale_date' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find Batiment where 'batiment_code' matches 'bird_sale_batiment_code'
        $batiment = Batiment::where('batiment_code', $request->bird_sale_batiment_code)->first();
    
        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided bird_sale_batiment_code.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;

        // Create a BirdBuy record
        $birdSale = BirdSale::create($data);

        // return redirect()->route('dashboard.volaille')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Bird Sale created successfully.',
            'data' => $birdSale,
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
    public function edit(BirdSale $birdSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'bird_sale_code' => 'required|string|max:255',
            'bird_sale_batiment_code' => 'required|string|max:255',
            'bird_sale_description' => 'required|string|max:255',
            'bird_sale_unit_price' => 'required|numeric',
            'bird_sale_reduction' => 'required|numeric',
            'bird_sale_quantity' => 'required|integer',
            'bird_sale_total_cost' => 'required|numeric',
            'bird_sale_date' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the record or return a 404 error
        $birdSale = BirdSale::findOrFail($id);

        // Find Batiment where 'batiment_code' matches 'bird_sale_batiment_code'
        $batiment = Batiment::where('batiment_code', $request->bird_sale_batiment_code)->first();
    
        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided bird_sale_batiment_code.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;

        $birdSale->update($data);

        return response()->json([
            'message' => 'Bird Sale updated successfully.',
            'data' => $birdSale,
        ], 200); // Ensure a proper 200 status code is returned.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $birdSale = BirdSale::findOrFail($id); // Find the record or throw a 404 error
        $birdSale->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
