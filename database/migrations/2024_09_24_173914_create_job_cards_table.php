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
        Schema::create('job_cards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('finished_user')->nullable(); 
            $table->date('start_date')->nullable(); 
            $table->date('end_date')->nullable(); 
            $table->date('assign_date')->nullable();
            $table->string('task')->nullable();
            $table->string('status')->nullable();
            $table->decimal('total_amount', 10, 2)->nullable();
            $table->text('remark')->nullable(); 
            $table->string('customer_contact_no'); 
            $table->unsignedBigInteger('employee_id'); 
            $table->unsignedBigInteger('user_id'); 
            $table->unsignedBigInteger('customer_id'); 
            $table->unsignedBigInteger('apartment_id'); 
            $table->unsignedBigInteger('payment_id')->nullable(); 
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
        Schema::dropIfExists('job_cards');
    }
};
