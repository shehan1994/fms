<?php

namespace App\Http\Controllers;

use App\Http\Resources\ApartmentResource;
use App\Models\Apartment;
use App\Http\Requests\StoreApartmentRequest;
use App\Http\Requests\UpdateApartmentRequest;
use Illuminate\Http\Request;

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
        $user = $request->user();
        if($user->id !== $apartment->user_id){
            return abort(403,"Unauthorized action");
        }
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
}
