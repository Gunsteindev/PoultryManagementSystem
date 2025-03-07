<?php

use App\Models\Batiment;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bird_sales', function (Blueprint $table) {
            $table->id();
            $table->string("bird_sale_code")->nullable();
            $table->foreignIdFor(Batiment::class);
            $table->string("bird_sale_batiment_code")->nullable();
            $table->string("bird_sale_description")->nullable();
            $table->string("bird_sale_quantity")->nullable();  
            $table->string("bird_sale_unit_price")->nullable();
            $table->string("bird_sale_reduction")->nullable();
            $table->string("bird_sale_total_cost")->nullable();
            $table->string("bird_sale_date")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bird_sales');
    }
};
