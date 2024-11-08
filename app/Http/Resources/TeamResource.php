<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'team_members' => $this->team_members,
            'expected_start_date' => $this->expected_start_date,
            'expected_end_date' => $this->expected_end_date,
            'job_card_id' => $this->job_card_id,
            'engineer_id' => $this->engineer_id,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
