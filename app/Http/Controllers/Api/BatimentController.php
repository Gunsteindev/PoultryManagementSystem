<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BatimentResource;
use App\Models\Batiment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BatimentController extends Controller
{
            /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $batiment = Batiment::latest()->paginate();

        if ($batiment->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }
        
        return BatimentResource::collection($batiment);
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
            'batiment_code' => 'required|string|max:255',
            'batiment_description' => 'required|string|max:255',
            'batiment_capacity' => 'required|numeric',
            'batiment_category' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create a BirdBuy record
        $batiment = Batiment::create($request->all());

        // return redirect()->route('dashboard.admin')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Batiment created successfully.',
            'data' => $batiment,
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
    public function edit(Batiment $batiment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'batiment_code' => 'required|string|max:255',
            'batiment_description' => 'required|string|max:255',
            'batiment_capacity' => 'required|numeric',
            'batiment_category' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the record or return a 404 error
        $batiment = Batiment::findOrFail($id);

        $batiment->update($request->all());

        return response()->json([
            'message' => 'Batiment updated successfully.',
            'data' => $batiment,
        ], 200); // Ensure a proper 200 status code is returned.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $batiment = Batiment::findOrFail($id); // Find the record or throw a 404 error
        $batiment->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);

    }
}
