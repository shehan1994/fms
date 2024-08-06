<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user= $request->user();
        return CustomerResource::collection(Customer::where('user_id',$user->id)
            ->orderBy('created_at','desc')
            ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCustomerRequest $request)
    {
        $data=$request->validated();
        $customer = Customer::create($data);
        return new CustomerResource($customer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer,Request $request)
    {
        $user = $request->user();
        if($user->id !== $customer->user_id){
            return abort(403,"Unauthorized action");
        }
        return new CustomerResource($customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCustomerRequest  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $data = $request->validated();
        $customer->update($data);
        return new CustomerResource($customer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer,Request $request)
    {
        $user = $request->user();
        if($user->id !== $customer->user_id){
            return abort(403,"Unauthorized action");
        }
        $customer->delete();
        return response('',204);
    }

    public function search(Request $request)
    {
        // Validate the request input
        $request->validate([
            'search' => 'required|string|min:1'
        ]);

        // Get the search query from the request
        $search = $request->query('search');

        // Fetch customers based on the search query
        $customers = Customer::where('first_name', 'like', '%' . $search . '%')
            ->select('id', 'first_name') // select only necessary fields
            ->get();

        // Return the results as JSON
        return response()->json($customers);
    }
}
