<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApartmentRequest extends FormRequest
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

    protected  function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
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
            'address_01'=>'required|string',
            'address_02'=>'nullable|string',
            'city'=>'nullable|string',
            'district'=>'nullable|string',
            'province'=>'nullable|string',
            'status'=>'nullable|integer',

        ];
    }
}
