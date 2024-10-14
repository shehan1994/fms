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
        'employee_id',
        'user_id',
        'customer_id',
        'apartment_id',
        'payment_id',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }


}
