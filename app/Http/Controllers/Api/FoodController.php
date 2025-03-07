<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoodResource;
use App\Models\Food;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FoodController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::latest()->paginate();

        if ($food->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return FoodResource::collection($food);
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
            'food_code' => 'required|string|max:255',
            'food_name' => 'required|string|max:255',
            'food_supplier_name' => 'required|string|max:255',
            'food_price_per_bag' => 'required|numeric',
            'food_discount' => 'required|numeric',
            'food_quantity' => 'required|numeric',
            'food_total_cost' => 'required|numeric',
            'food_purchase_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',

        ]);

        if ($validator->fails()) {
            return redirect()->route('dashboard.consomation') // Redirect back to the index page
                ->withErrors($validator) // Pass errors to the session
                ->withInput(); // Preserve input values
        }
    
        // Find Batiment where 'client_code' matches 'eggsale_client'
        $supplier = Supplier::where('supplier_name', $request->food_supplier_name)->first();
    
        if (!$supplier) {
            return response()->json([
                'message' => 'No matching supplier found for the provided food_supplier_name.',
            ], 404);
        }
    
        // Assign the found Batiment ID to the request data
        $data = $request->all();
        $data['supplier_id'] = $supplier->id;

        // Create a Food record
        $food = Food::create($data);

        // return redirect()->route('dashboard.consomation') // Redirect to the index page
        // ->with('success', 'Data stored successfully');
        return response()->json([
            'message' => 'Food created successfully.',
            'data' => $food,
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
    public function edit(Food $food)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'food_code' => 'required|string|max:255',
            'food_name' => 'required|string|max:255',
            'food_supplier_name' => 'required|string|max:255',
            'food_price_per_bag' => 'required|numeric',
            'food_discount' => 'required|numeric',
            'food_quantity' => 'required|numeric',
            'food_total_cost' => 'required|numeric',
            'food_purchase_date' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return redirect()->route('dashboard.consomation') // Redirect back to the index page
                ->withErrors($validator) // Pass errors to the session
                ->withInput(); // Preserve input values
        }

        // Find the record or return a 404 error
        $food = Food::findOrFail($id);

        $food->update($request->all());

        return response()->json([
            'message' => 'Food updated successfully.',
            'data' => $food,
        ], 200); // Ensure a proper 200 status code is returned.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $food = Food::findOrFail($id); // Find the record or throw a 404 error
        $food->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
