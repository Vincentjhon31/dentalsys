<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    use HasFactory;

      protected $table = 'appointments';
    protected $primaryKey = 'id';

protected $fillable = [ 'full_name', 'date', 'start_time', 'end_time', 'service'];

    // Define the relationship with Service
    public function service()
    {
        return $this->belongsTo(Services::class);
    }

    // Define the relationship with Patient
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }




}
