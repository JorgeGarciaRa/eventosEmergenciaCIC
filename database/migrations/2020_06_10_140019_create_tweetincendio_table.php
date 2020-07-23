<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTweetincendioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tweetincendio', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('fecha');
            $table->string('texto', 2000);
            $table->string('ubicacion', 200);
            $table->string('cuenta_verificada', 200);
            $table->string('coordenadas', 250);
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
        Schema::dropIfExists('tweetincendio');
    }
}
