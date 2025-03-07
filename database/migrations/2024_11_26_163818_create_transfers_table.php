<?php

use App\Models\Bande;
use App\Models\BandPurchase;
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
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Batiment::class)->constrained()->onDelete('cascade'); 
            $table->foreignIdFor(BandPurchase::class)->constrained()->onDelete('cascade'); 
            $table->string("transfer_batiment_code")->nullable();
            $table->string("transfer_band_code")->nullable();
            $table->string("transfer_quantity")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};
