<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'level' => 'required|string|max:100',
            'contact_no' => 'required|string|max:10',
            'designation' => 'required|string|max:100',
            'nic'=>'required|string|max:12',
            'status' => 'required|integer',
            'join_date' => 'required|date|before_or_equal:today',
        ];
    }
}
