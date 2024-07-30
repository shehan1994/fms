<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $apartment=$this->route('apartment');
        if($this->user()->id !== $apartment->user_id){
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
            'customer_id'=>'exists:customers,id',
            'user_id'=>'exists:users,id',
            'apt_no'=>'required|string|max:100',
            'address_01'=>'required|string',
            'address_02'=>'nullable|string',
            'city'=>'nullable|string',
            'status'=>'nullable|string',
        ];
    }
}
