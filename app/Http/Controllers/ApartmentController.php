<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApartmentResource;
use App\Models\Apartment;
use App\Http\Requests\StoreApartmentRequest;
use App\Http\Requests\UpdateApartmentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

    $result = Apartment::with(['customer:id,first_name,last_name'])  // Load customer relationship
        ->orderBy('created_at', 'desc')
        ->paginate(10);

    return ApartmentResource::collection($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreApartmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreApartmentRequest $request)
    {
        $data=$request->validated();
        $apartment = Apartment::create($data);
        return new ApartmentResource($apartment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function show(Apartment $apartment, Request $request)
    {
        // $user = $request->user();
        // if($user->id !== $apartment->user_id){
        //     return abort(403,"Unauthorized action");
        // }
        return new ApartmentResource($apartment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateApartmentRequest  $request
     * @param  \App\Models\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateApartmentRequest $request, Apartment $apartment)
    {
        $data = $request->validated();
        $apartment->update($data);
        return new ApartmentResource($apartment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Apartment  $apartment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Apartment $apartment,Request $request)
    {
        $user = $request->user();
        if($user->id !== $apartment->user_id){
            return abort(403,"Unauthorized action");
        }
        $apartment->delete();
        return response('',204);
    }

    public function search(Request $request)
    {
        // Validate the request input
        $request->validate([
            'search' => 'required|string|min:1',
            'customer' => 'required|integer'
        ]);

        // Get the search query from the request
        $search = $request->query('search');
        $customerId = $request->query('customer');

        // Fetch apartment based on the search query
        $apartments = DB::table('apartments')
        ->select('id', 'apt_no', 'address_01')
        ->where('customer_id', $customerId)
        ->where(function($query) use ($search) {
            $query->where('apt_no', 'like', '%' . $search . '%')
                  ->orWhere('address_01', 'like', '%' . $search . '%');
        })
        ->get();
        return response()->json($apartments);
    }
}
