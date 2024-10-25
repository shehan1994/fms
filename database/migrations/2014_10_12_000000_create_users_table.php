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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('level'); 
            $table->string('contact_no')->nullable(); 
            $table->date('terminate_date')->nullable(); 
            $table->string('designation')->nullable();
            $table->string('email')->unique(); 
            $table->string('nic',255);
            $table->integer('status')->nullable();
            $table->string('user_code')->unique(); 
            $table->date('join_date')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
