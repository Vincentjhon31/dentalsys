<?php

namespace App\Listeners;

use App\Events\ShareCreated;
use App\Models\User;
use App\Notifications\NewShare;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendShareCreatedNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ShareCreated $event): void
    {
        foreach (User::whereNot('id', $event->share->user_id)->cursor() as $user)
        {
            $user->notify(new NewShare($event->share));
        }
    }
}
