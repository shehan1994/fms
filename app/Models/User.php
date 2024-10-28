<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'level',
        'contact_no',
        'password',
        'terminate_date',
        'designation',
        'email',
        'nic',
        'status',
        'user_code',
        'join_date',
    ];

    public function teams()
{
    return $this->hasMany(Team::class, 'engineer_id');
}

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            // Generate a unique user code
            $latestUser = self::orderBy('user_code', 'desc')->first();
            $nextCode = 1;

            if ($latestUser) {
                // Extract the numeric part of the last employee code and increment
                $latestCode = (int)substr($latestUser->user_code, 4); // Skip 'EMP-'
                $nextCode = $latestCode + 1;
            }

            $user->user_code = 'EMP-' . str_pad($nextCode, 2, '0', STR_PAD_LEFT); // Pad with zeros
        });
    }
}
