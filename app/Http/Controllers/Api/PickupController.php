<?php

namespace App\Http\Controllers\Api;
use App\Http\Resources\PickupResource;
use App\Models\Batiment;
use App\Models\Pickup;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PickupController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pickup = Pickup::latest()->paginate();

        if ($pickup->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return PickupResource::collection($pickup);
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
            'pickup_batiment' => 'required|string|max:255',
            'pickup_code' => 'required|string|max:255',
            'pickup_crate_quantity' => 'required|numeric',
            'pickup_quantity_remain' => 'required|numeric',
            'pickup_quantity_loss' => 'required|numeric',
            'pickup_total_quantity' => 'required|numeric',
            'pickup_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Find Batiment where 'batiment_code' matches 'pickup_batiment'
        $batiment = Batiment::where('batiment_code', $request->pickup_batiment)->first();
    
        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided pickup_batiment.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;
    
        // Create a Pickup record
        $pickup = Pickup::create($data);

        // return redirect()->route('dashboard.ponte')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Pickup created successfully.',
            'data' => $pickup,
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
    public function edit(Pickup $pickup)
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
            'pickup_batiment' => 'required|string|max:255',
            'pickup_code' => 'required|string|max:255',
            'pickup_crate_quantity' => 'required|numeric',
            'pickup_quantity_remain' => 'required|numeric',
            'pickup_quantity_loss' => 'required|numeric',
            'pickup_total_quantity' => 'required|numeric',
            'pickup_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the Pickup record or return a 404 error
        $pickup = Pickup::findOrFail($id);

        // Find Batiment based on pickup_batiment
        $batiment = Batiment::where('batiment_code', $request->pickup_batiment)->first();
        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided pickup_batiment.',
            ], 404);
        }

        // Update the batiment_id in the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;

        // Update the Pickup record with the validated and modified data
        $pickup->update($data);

        return response()->json([
            'message' => 'Pickup updated successfully.',
            'data' => $pickup,
        ], 200); // Ensure a proper 200 status code is returned.
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $pickup = Pickup::findOrFail($id); // Find the record or throw a 404 error
        $pickup->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
