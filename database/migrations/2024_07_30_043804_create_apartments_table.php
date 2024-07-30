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
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Customer::class,'customer_id');
            $table->foreignIdFor(\App\Models\User::class,'user_id');
            $table->string('apt_no',255);
            $table->string('address_01',255);
            $table->string('address_02',255)->nullable();
            $table->string('city',255);
            $table->string('status',255);
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
        Schema::dropIfExists('apartments');
    }
};
