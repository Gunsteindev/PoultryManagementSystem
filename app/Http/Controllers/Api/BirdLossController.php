<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BirdLossResource;
use App\Models\BirdLoss;
use Illuminate\Http\Request;
use App\Models\Batiment;
use Illuminate\Support\Facades\Validator;

class BirdLossController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loss = BirdLoss::latest()->paginate();

        if ($loss->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return BirdLossResource::collection($loss);
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
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'bird_loss_batiment' => 'required|string|max:255',
            'bird_loss_category' => 'required|string|max:255',
            'bird_loss_quantity' => 'required|numeric',
            'bird_loss_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

       // Find Batiment where 'batiment_code' matches 'bird_loss_batiment'
       $batiment = Batiment::where('batiment_code', $request->bird_loss_batiment)->first();
    
       if (!$batiment) {
           return response()->json([
               'message' => 'No matching Batiment found for the provided bird_loss_batiment.',
           ], 404);
       }
   
       // Assign the found Batiment ID to the request data
       $data = $request->all();
       $data['batiment_id'] = $batiment->id;
   
       // Create a Loss record
       $birdloss = BirdLoss::create($data);

       // return redirect()->route('dashboard.ponte')->with('success', 'Data stored successfully'); // Redirect to the index page
       return response()->json([
           'message' => 'Bird Loss created successfully.',
           'data' => $birdloss,
       ], 200); 
    }

    /**
     * Display the specified resource.
     */
    public function show(BirdLoss $losses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BirdLoss $losses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'bird_loss_batiment' => 'required|string|max:255',
            'bird_loss_category' => 'required|string|max:255',
            'bird_loss_quantity' => 'required|numeric',
            'bird_loss_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the Loss record or return a 404 error
        $birdloss = BirdLoss::findOrFail($id);

       // Find Batiment where 'batiment_code' matches 'bird_loss_batiment'
       $batiment = Batiment::where('batiment_code', $request->bird_loss_batiment)->first();
    
       if (!$batiment) {
           return response()->json([
               'message' => 'No matching Batiment found for the provided bird_loss_batiment.',
           ], 404);
       }
   
       // Assign the found Batiment ID to the request data
       $data = $request->all();
       $data['batiment_id'] = $batiment->id;
   
       // Update the Pickup record with the validated and modified data
       $birdloss->update($data);

       // return redirect()->route('dashboard.ponte')->with('success', 'Data stored successfully'); // Redirect to the index page
       return response()->json([
           'message' => 'Bird Loss updated successfully.',
           'data' => $birdloss,
       ], 200); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $birdloss = BirdLoss::findOrFail($id); // Find the record or throw a 404 error
        $birdloss->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
