<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class ClientController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $client = Client::latest()->paginate();
        
        if ($client->isEmpty()) {
            return response()->json(['message' => 'No records available'], 200);
        }

        return ClientResource::collection($client);
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
            'client_name' => 'required|string|max:255',
            'client_company' => 'required|string|max:255',
            'client_telephone' => 'required|numeric',
            'client_email' => 'required|string|max:255',
            'client_position' => 'required|string|max:255',
            'client_location' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',

        ]);

        if ($validator->fails()) {
            return redirect()->route('dashboard.ponte') // Redirect back to the index page
                ->withErrors($validator) // Pass errors to the session
                ->withInput(); // Preserve input values
        }

        // Create a Client record
        $client = Client::create($request->all());

        // return redirect()->route('dashboard.ponte')->with('success', 'Data stored successfully'); // Redirect to the index page
        return response()->json([
            'message' => 'Client created successfully.',
            'data' => $client,
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
    public function edit(Client $client)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'client_name' => 'required|string|max:255',
            'client_company' => 'required|string|max:255',
            'client_telephone' => 'required|numeric',
            'client_email' => 'required|string|max:255',
            'client_position' => 'required|string|max:255',
            'client_location' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the record or return a 404 error
        $client = Client::findOrFail($id);

        $client->update($request->all());

        return response()->json([
            'message' => 'Client updated successfully.',
            'data' => $client,
        ], 200); // Ensure a proper 200 status code is returned. 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::findOrFail($id); // Find the record or throw a 404 error
        $client->delete(); // Delete the found record
    
        return response()->json([
            'message' => 'Data deleted successfully',
        ], 200);

    }
}
