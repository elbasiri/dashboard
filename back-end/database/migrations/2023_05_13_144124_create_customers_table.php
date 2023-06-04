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
    Schema::create('customers', function (Blueprint $table) {
        $table->increments('customer_id');
        $table->string('username');
        $table->string('image')->nullable();
        $table->string('password');
        $table->string('email');
        $table->string('shipping_address')->nullable();
        $table->string('billing_address')->nullable();
        $table->boolean('suspended')->default(false);
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
        Schema::dropIfExists('customers');
    }
};
