<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    // protected function prepareForValidation()
    // {
    //     $this->merge([
    //         'user_id' => $this->user()->id
    //     ]);
    // }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'team_members' => 'array',  
            'expected_start_date' => 'nullable|string|max:255',
            'expected_end_date' => 'required|string|max:10',
            'description'=>'required|string',
            'job_card_id' => 'required|exists:job_cards,id', 
            'engineer_id' => 'required|exists:users,id'
        ];
    }
}
