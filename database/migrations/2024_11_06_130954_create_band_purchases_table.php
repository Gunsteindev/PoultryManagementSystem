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
        Schema::create('band_purchases', function (Blueprint $table) {
            $table->id();
            $table->string("band_purchase_code")->nullable();
            $table->string("band_purchase_band_code")->nullable();
            $table->string("band_purchase_description")->nullable();
            $table->string("band_purchase_unit_price")->nullable();
            $table->string("band_purchase_reduction")->nullable();
            $table->string("band_purchase_quantity")->nullable();
            $table->string("band_purchase_total_cost")->nullable();
            $table->string("band_purchase_date")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('band_purchases');
    }
};
