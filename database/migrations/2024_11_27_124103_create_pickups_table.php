<?php


use App\Models\Batiment;
use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pickups', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Batiment::class)->constrained()->onDelete('cascade'); 
            $table->string("pickup_batiment")->nullable();
            $table->string("pickup_code")->nullable();
            $table->string("pickup_crate_quantity")->nullable();
            $table->string("pickup_quantity_remain")->nullable();
            $table->string("pickup_quantity_loss")->nullable();
            $table->string("pickup_total_quantity")->nullable();
            $table->string("pickup_date")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pickups');
    }
};
