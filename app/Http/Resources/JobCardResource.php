<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JobCardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        /*return [
            'id'=>$this->id
        ]*/
        return [
            'id' => $this->id,
            'finished_user' => $this->finished_user,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'assign_date' => $this->assign_date,
            'task' => $this->task,
            'status' => $this->status,
            'total_amount' => $this->total_amount,
            'remark' => $this->remark,
            'customer_contact_no' => $this->customer_contact_no,
            'team_id' => $this->team_id,
            'team_members' => $this->team_members, 
            'user' => new UserResource($this->whenLoaded('user')),
            'customer' => new CustomerResource($this->whenLoaded('customer')), 
            'apartment' => new ApartmentResource($this->whenLoaded('apartment')), 
            'payment_id' => $this->payment_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
        // return parent::toArray($request);
    }
}
