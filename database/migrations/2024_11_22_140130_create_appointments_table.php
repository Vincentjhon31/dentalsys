<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade'); // Foreign key linking to the 'patients' table
            $table->date('date');
            $table->time('start_time');  // Start time for the appointment
            $table->time('end_time');    // End time for the appointment
            $table->string('appointment_type');  // Type of the appointment
            $table->string('status');    // Status of the appointment
            $table->timestamps();  // Created at and updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
