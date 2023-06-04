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
    Schema::create('partners_products', function (Blueprint $table) {
        $table->increments('product_id');
            $table->unsignedInteger('partner_id');
            $table->unsignedInteger('category_id');
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('description');
            $table->decimal('price', 10, 2);
            $table->integer('quantity');
            $table->timestamps();

            $table->foreign('partner_id')->references('partner_id')->on('partners');
            $table->foreign('category_id')->references('category_id')->on('categories');
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('partners_products', function (Blueprint $table) {
            $table->dropForeign(['partner_id']);
            $table->dropColumn('partner_id');
        });
    }
};
