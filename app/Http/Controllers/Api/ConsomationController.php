<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ConsomationResource;
use App\Models\Batiment;
use App\Models\Consomation;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsomationController extends Controller
{
           /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $consomation = Consomation::latest()->paginate();

        if ($consomation->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return ConsomationResource::collection($consomation);
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
            'consomation_batiment' => 'required|string|max:255',
            'consomation_name' => 'required|string|max:255',
            'consomation_quantity' => 'required|numeric',
            'consomation_date' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Find Batiment where 'batiment_code' matches 'consomation_batiment'
        $batiment = Batiment::where('batiment_code', $request->consomation_batiment)->first();

        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided consomation_batiment.',
            ], 404);
        }
    
        // Find Food where 'food_code' matches 'consomation_name'
        $food = Food::where('food_name', $request->consomation_name)->first();

        if (!$food) {
            return response()->json([
                'message' => 'No matching Food found for the provided consomation_name.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;
        $data['food_id'] = $food->id;
    
        // Create a Consomation record
        $consomation = Consomation::create($data);

        // return redirect()->route('dashboard.consomation') // Redirect to the index page
        // ->with('success', 'Data stored successfully');
        return response()->json([
            'message' => 'Consomation created successfully.',
            'data' => $consomation,
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
    public function edit(Consomation $consomation)
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
            'consomation_batiment' => 'required|string|max:255',
            'consomation_name' => 'required|string|max:255',
            'consomation_quantity' => 'required|numeric',
            'consomation_date' => 'required|string',
            'user_id' => 'required|exists:users,id',


        ]);

        // Handle validation errors
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the Consomation record or return a 404 error
        $consomation = Consomation::findOrFail($id);

        // Find Batiment where 'batiment_code' matches 'consomation_batiment'
        $batiment = Batiment::where('batiment_code', $request->consomation_batiment)->first();

        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided consomation_batiment.',
            ], 404);
        }

        // Find Food where 'food_code' matches 'consomation_name'
        $food = Food::where('food_name', $request->consomation_name)->first();

        if (!$food) {
            return response()->json([
                'message' => 'No matching Food found for the provided consomation_name.',
            ], 404);
        }

        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;
        $data['food_id'] = $food->id;

        // Update the Consomation record with the validated and modified data
        $consomation->update($data);

        return response()->json([
            'message' => 'Consomation updated successfully.',
            'data' => $consomation,
        ], 200); // Ensure a proper 200 status code is returned.
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $consomation = Consomation::findOrFail($id); // Find the record or throw a 404 error
        $consomation->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
