<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('level'); 
            $table->string('contact_no')->nullable();
            $table->string('password')->nullable(); 
            $table->date('terminate_date')->nullable(); 
            $table->string('designation');
            $table->string('email')->unique(); 
            $table->integer('status');
            $table->integer('age');
            $table->date('dob'); 
            $table->string('emp_code')->unique(); 
            $table->date('join_date'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
