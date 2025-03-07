<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class SupplierController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supplier = Supplier::latest()->paginate();

        if ($supplier->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return SupplierResource::collection($supplier);
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
            'supplier_name' => 'required|string|max:255',
            'supplier_role' => 'required|string|max:255',
            'supplier_company' => 'required|string|max:255',
            'supplier_telephone' => 'required|string|max:255',
            'supplier_position' => 'required|string|max:255',
            'supplier_address' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create a Supplier record
        $supplier = Supplier::create($request->all());

        // return redirect()->route('dashboard.volaille')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Supplier created successfully.',
            'data' => $supplier,
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
    public function edit(Supplier $supplier)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'supplier_name' => 'required|string|max:255',
            'supplier_role' => 'required|string|max:255',
            'supplier_company' => 'required|string|max:255',
            'supplier_telephone' => 'required|string|max:255',
            'supplier_position' => 'required|string|max:255',
            'supplier_address' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the record or return a 404 error
        $supplier = Supplier::findOrFail($id);

        $supplier->update($request->all());

        return response()->json([
            'message' => 'Supplier updated successfully.',
            'data' => $supplier,
        ], 200); // Ensure a proper 200 status code is returned.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id); // Find the record or throw a 404 error
        $supplier->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
