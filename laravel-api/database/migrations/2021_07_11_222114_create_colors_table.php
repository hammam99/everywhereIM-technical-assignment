<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateColorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('color', 7);
        });

        // Statement to the red color.
        DB::table('colors')->insert(
            array(
                'color' => '#ed220d'
            )
        );

       // Adding the green color. 
        DB::table('colors')->insert(
            array(
                'color' => '#60d937'
            )
        );

        // Adding the yellow color.
        DB::table('colors')->insert(
            array(
                'color' => '#fff056'
            )
        );

        // Adding the blue color.
        DB::table('colors')->insert(
            array(
                'color' => '#00a1ff'
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('colors');
    }
}
