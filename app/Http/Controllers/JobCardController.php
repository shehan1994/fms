<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobCardRequest;
use App\Http\Resources\JobCardResource;
use App\Models\Job_card;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Log;

class JobCardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->level == 1 || $user->level == 2) {
            // Level 1 and 2 users can see all job cards
            $result = Job_card::with([
                'customer:id,first_name,last_name',
                'user:id,first_name,last_name,designation',
                'apartment:id,apt_no',
                'team:id,team_members', // Ensuring that team_members is loaded
            ])
                ->select('job_cards.*')
                ->leftJoin('teams', 'teams.id', '=', 'job_cards.team_id') // Join the teams table
                ->orderBy('job_cards.created_at', 'desc')
                ->paginate(10);

            foreach ($result as $jobCard) {
                // Initialize team members array
                $teamMembers = [];

                // Check if team_members exists and is an array
                if (isset($jobCard->team) && !empty($jobCard->team->team_members)) {
                    foreach ($jobCard->team->team_members as $memberId) {
                        // Fetch user by member ID
                        $teamMember = User::find($memberId);

                        // Check if user exists and add their details
                        if ($teamMember) {
                            $teamMembers[] = [
                                'id' => $teamMember->id,
                                'first_name' => $teamMember->first_name,
                                'last_name' => $teamMember->last_name,
                                'designation' => $teamMember->designation,
                                'contact_no' => $teamMember->contact_no,
                            ];
                        }
                    }
                }
                $jobCard->team_members = $teamMembers;
            }
        } else {
            $result = Job_card::with([
                'customer:id,first_name,last_name',
                'user:id,first_name,last_name,designation',
                'apartment:id,apt_no',
                'team:id,team_members', 
            ])
                ->select('job_cards.*')
                ->leftJoin('teams', 'teams.id', '=', 'job_cards.team_id') 
                ->where('job_cards.user_id', $user->id)
                ->orderBy('job_cards.created_at', 'desc')
                ->paginate(10);
            foreach ($result as $jobCard) {
                $teamMembers = [];
                if (isset($jobCard->team) && !empty($jobCard->team->team_members)) {
                    foreach ($jobCard->team->team_members as $memberId) {
                        $teamMember = User::find($memberId);
                        if ($teamMember) {
                            $teamMembers[] = [
                                'id' => $teamMember->id,
                                'first_name' => $teamMember->first_name,
                                'last_name' => $teamMember->last_name,
                                'designation' => $teamMember->designation,
                                'contact_no' => $teamMember->contact_no,
                            ];
                        }
                    }
                }
                $jobCard->team_members = $teamMembers;
            }
        }

        return JobCardResource::collection($result);
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
        $data = $request->validated();
        Log::info($data);
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
        $job_card->load('user', 'customer', 'apartment');
        return new JobCardResource($job_card);
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
        $validatedData = $request->validate([
            'assign_date' => 'required|date',
            'task' => 'required|string',
            'customer_contact_no' => 'required|string',
            'user_id' => 'required|integer',
            'customer_id' => 'required|integer',
            'apartment_id' => 'required|integer',
        ]);
        $job_card->update($validatedData);
        return new JobCardResource($job_card);
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
