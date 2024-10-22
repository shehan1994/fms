<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
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
            'contact_no' => 'required|string|max:15',
            'terminate_date' => 'nullable|date',
            'designation' => 'required|string|max:100',
            'email' => 'nullable|email|unique:employees,email,' . $this->route('employee')->id,
            'status' => 'required|integer',
            'age' => 'required|integer|min:18|max:65', // Adjust age limits as needed
            'dob' => 'required|date',
            'join_date' => 'required|date',
        ];
    }
}
