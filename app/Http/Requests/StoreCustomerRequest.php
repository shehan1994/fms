<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
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
            'user_id'=>'exists:users,id',
            'passport_no'=>'nullable|string|max:100',
            'nic'=>'required|string',
            'first_name'=>'required|string',
            'last_name'=>'nullable|string',
            'email'=>'nullable|string',
            'dob'=>'nullable|string|before:today',
        ];
    }
}
