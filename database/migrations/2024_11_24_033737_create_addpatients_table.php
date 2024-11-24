<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddpatientsTable extends Migration
{
    public function up()
    {
        Schema::create('addpatients', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->integer('age'); 
            $table->string('gender');
            $table->string('contact'); 
            $table->string('address'); 
            $table->string('dental_case'); 
            $table->string('status'); 
            $table->string('email'); // Added email field
            $table->date('dob');     // Added date of birth field
            $table->timestamps();  
        });
    }

    public function down()
    {
        Schema::dropIfExists('addpatients');
    }
}
