<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addpatient extends Model
{
    use HasFactory;

    
    protected $table = 'addpatients'; 
    
    protected $fillable = [
        'name',
        'age',
        'gender',
        'contact',
        'address',
        'dental_case',
        'status',
    ];

    
}
