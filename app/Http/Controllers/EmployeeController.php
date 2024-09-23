<?php

namespace App\Http\Controllers;


use App\Http\Resources\EmployeeResource;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;

use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return EmployeeResource::collection(Employee::orderBy('created_at','desc')
            ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEmployeeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEmployeeRequest $request)
    {
        $data=$request->validated();
        $employee = Employee::create($data);
        return new EmployeeResource($employee);
    }

    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show(Employee $employee,Request $request)
    {
        return new EmployeeResource($employee);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEmployeeRequest  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmployeeRequest $request, Employee  $employee)
    {
        $data = $request->validated();
        $employee->update($data);
        return new EmployeeResource($employee);
    }

    public function search(Request $request)
    {
        $request->validate([
            'search' => 'required|string|min:1'
        ]);
        $search = $request->query('search');
        $customers = Employee::where('first_name', 'like', '%' . $search . '%')
            ->select('id', 'first_name', 'last_name', 'designation') 
            ->get();
        return response()->json($customers);
    }

}
