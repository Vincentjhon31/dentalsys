<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::table('appointments', function (Blueprint $table) {
            // Dropping the appointment_time column
            $table->dropColumn('time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::table('appointments', function (Blueprint $table) {
            // If we want to revert the migration, we can add the column back
            $table->time('time')->nullable();
        });
    }
};
