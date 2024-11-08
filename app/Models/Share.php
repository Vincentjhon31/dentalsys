<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Share extends Model
{
    //mass assignentptotection
    protected $fillable = [
        'message',
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
