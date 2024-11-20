<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    use HasFactory;

    // Specify the table name explicitly
    protected $table = 'classes';

    // Add fillable properties if needed
    protected $fillable = [
        'name', 'description', 'duration', 'cost', 'location', 'category', 'image',
    ];
}
