<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    // Define the fillable fields if necessary
    protected $fillable = ['patient_name', 'date', 'time', 'status'];
}
