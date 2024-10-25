<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job_card extends Model
{
    use HasFactory;

    protected $fillable = [
        'finished_user',
        'start_date',
        'end_date',
        'assign_date',
        'task',
        'status',
        'total_amount',
        'remark',
        'customer_contact_no',
        'user_id',
        'customer_id',
        'apartment_id',
        'payment_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }


}
