<?php

use App\Models\Batiment;
use App\Models\Food;
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
        Schema::create('consomations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Batiment::class)->constrained()->cascadeOnDelete();
            $table->string("consomation_batiment")->nullable();
            $table->foreignIdFor(Food::class)->constrained()->cascadeOnDelete();
            $table->string("consomation_name")->nullable();
            $table->string("consomation_quantity")->nullable();
            $table->string("consomation_date")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consomations');
    }
};
