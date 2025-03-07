<?php

use App\Models\Bande;
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
        Schema::create('batiments', function (Blueprint $table) {
            $table->id();
            $table->string("batiment_code")->nullable();
            $table->string("batiment_description")->nullable();
            $table->string("batiment_capacity")->nullable();
            $table->string("batiment_category")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batiments');
    }
};
