<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'level',
        'contact_no',
        'password',
        'terminate_date',
        'designation',
        'email',
        'status',
        'age',
        'dob',
        'emp_code',
        'join_date',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'terminate_date' => 'date',
        'dob' => 'date',
        'join_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($employee) {
            // Generate a unique employee code
            $latestEmployee = self::orderBy('emp_code', 'desc')->first();
            $nextCode = 1;

            if ($latestEmployee) {
                // Extract the numeric part of the last employee code and increment
                $latestCode = (int)substr($latestEmployee->emp_code, 4); // Skip 'EMP-'
                $nextCode = $latestCode + 1;
            }

            $employee->emp_code = 'EMP-' . str_pad($nextCode, 2, '0', STR_PAD_LEFT); // Pad with zeros
        });
    }
}
