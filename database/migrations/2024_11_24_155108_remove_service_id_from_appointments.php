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
        // Drop the foreign key constraint before dropping the column
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['service_id']); // Drop the foreign key constraint
            $table->dropColumn('service_id');    // Drop the service_id column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add the service_id column back if needed in the down migration
        Schema::table('appointments', function (Blueprint $table) {
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
        });
    }
};
