<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addpatient extends Model
{
    use HasFactory;

    // Specify the name of the table
    protected $table = 'addpatients';

    // Specify the fields that are mass assignable
    protected $fillable = [
        'name', 'age', 'gender', 'contact', 'address', 'dental_case', 'status',
    ];
}
