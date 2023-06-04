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
        Schema::create('commands', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('customer_id');
            $table->unsignedInteger('partner_id');
            $table->unsignedInteger('product_id');
            $table->integer('quantity');
            $table->string('image')->nullable();
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['pending', 'completed', 'canceled'])->default('pending');
            $table->timestamps();

            $table->foreign('customer_id')->references('customer_id')->on('customers');
            $table->foreign('partner_id')->references('partner_id')->on('partners');
            $table->foreign('product_id')->references('product_id')->on('partners_products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commands');
    }
};
