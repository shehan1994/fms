<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobCardRequest;
use App\Http\Resources\JobCardResource;
use App\Models\Job_card;
use Illuminate\Http\Request;

class JobCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreJobCardRequest $request)
    {
        $data=$request->validated();
        $jobCard = Job_card::create($data);
        return new JobCardResource($jobCard);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Job_card  $job_card
     * @return \Illuminate\Http\Response
     */
    public function show(Job_card $job_card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Job_card  $job_card
     * @return \Illuminate\Http\Response
     */
    public function edit(Job_card $job_card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Job_card  $job_card
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job_card $job_card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Job_card  $job_card
     * @return \Illuminate\Http\Response
     */
    public function destroy(Job_card $job_card)
    {
        //
    }
}
