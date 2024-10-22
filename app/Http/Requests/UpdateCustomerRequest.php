<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $customer=$this->route('customer');
        if($this->user()->id !== $customer->user_id){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id'=>'exists:users,id',
            'passport_no'=>'nullable|string|max:20',
            'nic'=>'required|string|max:12',
            'first_name'=>'required|string',
            'last_name'=>'nullable|string',
            'email'=>'nullable|string',
            'dob'=>'nullable|string|before:today',
        ];
    }
}
