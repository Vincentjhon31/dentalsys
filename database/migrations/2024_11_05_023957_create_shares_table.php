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
        Schema::create('shares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('message');
            $table->timestamps();
        });

        Schema::create('services', function (Blueprint $table) {
            $table->id('');
            $table->string('name'); // Service name
            $table->text('description')->nullable(); // Service description
            $table->string('image')->nullable(); // Path to the uploaded image
            $table->string('duration'); // Duration of the service
            $table->decimal('cost', 10, 2); // Cost of the service
            $table->string('location'); // Location of the service
            $table->string('category'); // Category of the service
            $table->timestamps(); // Created_at and Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shares');

        Schema::dropIfExists('services');
    }
};
