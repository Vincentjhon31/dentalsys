<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    //
    use HasFactory;

    protected $fillable = ['patient_id', 'full_name', 'email', 'contact_number', 'address', 'date', 'time', 'service'];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function appointments()
{
    return $this->hasMany(Appointment::class);
}
}
