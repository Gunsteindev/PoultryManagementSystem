<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TreatmentResource;
use App\Models\Batiment;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TreatmentController extends Controller
{
           /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $batiment = Treatment::latest()->paginate();

        if ($batiment->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return TreatmentResource::collection($batiment);
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
            'treatment_batiment_code' => 'required|string|max:255',
            'treatment_veto_name' => 'required|string|max:255',
            'treatment_name' => 'required|string|max:255',
            'treatment_comment' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',

        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Find Batiment where 'batiment_code' matches 'treatment_batiment_code'
        $batiment = Batiment::where('batiment_code', $request->treatment_batiment_code)->first();
    
        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided pickup_batiment.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;
    
        // Create a Pickup record
        $treatment = Treatment::create($data);

        // return redirect()->route('dashboard.treatment')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Treatment created successfully.',
            'data' => $treatment,
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
    public function edit(Treatment $treatment)
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
            'treatment_batiment_code' => 'required|string|max:255',
            'treatment_veto_name' => 'required|string|max:255',
            'treatment_name' => 'required|string|max:255',
            'treatment_comment' => 'required|string|max:255',
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
        $treatment = Treatment::findOrFail($id);

        // Find Batiment based on treatment_batiment
        $batiment = Batiment::where('batiment_code', $request->treatment_batiment_code)->first();

        if (!$batiment) {
            return response()->json([
                'message' => 'No matching Batiment found for the provided treatment_batiment_code.',
            ], 404);
        }

        // Update the batiment_id in the request data
        $data = $request->all();
        $data['batiment_id'] = $batiment->id;

        // Update the Pickup record with the validated and modified data
        $treatment->update($data);

        return response()->json([
            'message' => 'Treatment updated successfully.',
            'data' => $treatment,
        ], 200); // Ensure a proper 200 status code is returned.
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $treatment = Treatment::findOrFail($id); // Find the record or throw a 404 error
        $treatment->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
