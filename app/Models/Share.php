<?php

namespace App\Models;

use App\Events\ShareCreated;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Share extends Model
{
    //mass assignentptotection
    protected $fillable = [
        'message',
    ];

    protected $dispatchesEvents = [
        'created' => ShareCreated::class,
    ];
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
