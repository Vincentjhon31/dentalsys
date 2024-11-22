<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_date',
        'end_date',
        'description',
        'location',
        'user_id', // Assuming a user is creating events
    ];

    // Relationship with User (if needed)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
