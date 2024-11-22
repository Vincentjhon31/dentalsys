<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    // Define the fillable attributes to allow mass assignment
    protected $fillable = [
        'patient_id',
        'date',
        'start_time',
        'end_time',
        'appointment_type',
        'status',
    ];

    // Define the relationship with the Patient model
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
}
