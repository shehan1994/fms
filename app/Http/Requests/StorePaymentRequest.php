<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
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
            'method' => 'nullable|string|max:255',
            'amount' => 'nullable|numeric|min:0',
            'job_card_id' => 'required|exists:job_cards,id',
            'status' => 'nullable|string|max:255',
            'remark' => 'nullable|string|max:255',
        ];
    }
}
