<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $casts = [
        'team_members' => 'array',
    ];

    protected $fillable = [
        'team_members',
        'expected_start_date',
        'expected_end_date',
        'job_card_id',
        'engineer_id',
        'description',
    ];



}
