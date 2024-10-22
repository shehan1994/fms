<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'level' => 'required|string|max:100',
            'contact_no' => 'required|string|max:10',
            'terminate_date' => 'nullable|date',
            'designation' => 'required|string|max:100',
            'email' => 'nullable|email|unique:employees,email',
            'nic'=>'required|string|max:12',
            'status' => 'required|integer',
            'age' => 'required|integer|min:18|max:65', // Adjust age limits as needed
            'dob' => 'required|date|before_or_equal:' . now()->subYears(18)->toDateString(),
            'join_date' => 'required|date|before_or_equal:today',
        ];
    }
}
