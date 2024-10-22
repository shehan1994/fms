<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = [
        'apt_no',
        'customer_id',
        'user_id',
        'address_01',
        'address_02',
        'city',
        'status',
        'created_at',
        'updated_at'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($apartment) {
            // Generate a unique Apartment code
            $latestApartment = self::orderBy('apt_no', 'desc')->first();
            $nextCode = 1;

            if ($latestApartment) {
                // Extract the numeric part of the last Apartment code and increment
                $latestCode = (int)substr($latestApartment->apt_no, 4); // Skip 'EMP-'
                $nextCode = $latestCode + 1;
            }

            $apartment->apt_no = 'APT-' . str_pad($nextCode, 2, '0', STR_PAD_LEFT); // Pad with zeros
        });
    }
}
