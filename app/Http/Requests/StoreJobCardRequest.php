<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobCardRequest extends FormRequest
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

    protected function prepareForValidation()
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
            'assign_date' => 'nullable|date',
            'user_id'=>'required|exists:users,id',
            'task' => 'nullable|string|max:255',
            'customer_contact_no' => 'required|string|max:10',
            'customer_id' => 'required|exists:customers,id', 
            'apartment_id' => 'required|exists:apartments,id'
        ];
    }
}
