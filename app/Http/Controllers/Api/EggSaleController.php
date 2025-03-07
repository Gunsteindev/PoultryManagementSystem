<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EggSaleResource;
use App\Models\Client;
use App\Models\EggSale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EggSaleController extends Controller
{
         /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $eggsale = EggSale::latest()->paginate();

        if ($eggsale->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return EggSaleResource::collection($eggsale);

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
            'eggsale_client_name' => 'required|string|max:255',
            'eggsale_code' => 'required|string|max:255',
            'eggsale_description' => 'required|string|max:255',
            'eggsale_unit_price' => 'required|numeric',
            'eggsale_quantity' => 'required|numeric',
            'eggsale_reduction' => 'required|numeric',
            'eggsale_total_cost' => 'required|numeric',
            'eggsale_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',

        ]);

        if ($validator->fails()) {
            return redirect()->route('dashboard.ponte') // Redirect back to the index page
                ->withErrors($validator) // Pass errors to the session
                ->withInput(); // Preserve input values
        }
    
        // Find Batiment where 'client_code' matches 'eggsale_client'
        $client = Client::where('client_name', $request->eggsale_client_name)->first();
    
        if (!$client) {
            return response()->json([
                'message' => 'No matching client found for the provided eggsale_client_name.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['client_id'] = $client->id;
    
        // Create a EggSale record
        $eggsale = EggSale::create($data);

        // return redirect()->route('dashboard.ponte') // Redirect to the index page
        // ->with('success', 'Data stored successfully'); 
        return response()->json([
            'message' => 'Egg Sale created successfully.',
            'data' => $eggsale,
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
    public function edit(EggSale $eggsale)
    {
        return Inertia::render('bird/edit', [
            'eggsale' => new EggSaleResource($eggsale),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'eggsale_client_name' => 'required|string|max:255',
            'eggsale_code' => 'required|string|max:255',
            'eggsale_description' => 'required|string|max:255',
            'eggsale_unit_price' => 'required|numeric',
            'eggsale_quantity' => 'required|numeric',
            'eggsale_reduction' => 'required|numeric',
            'eggsale_total_cost' => 'required|numeric',
            'eggsale_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return redirect()->route('dashboard.ponte') // Redirect back to the index page
                ->withErrors($validator) // Pass errors to the session
                ->withInput(); // Preserve input values
        }

        // Find the record or return a 404 error
        $eggsale = EggSale::findOrFail($id);

        $eggsale->update($request->all());

        return response()->json([
            'message' => 'Egg Sale updated successfully.',
            'data' => $eggsale,
        ], 200); // Ensure a proper 200 status code is returned. 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $eggsale = EggSale::findOrFail($id); // Find the record or throw a 404 error
        $eggsale->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
