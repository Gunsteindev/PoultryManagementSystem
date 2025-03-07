<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Batiment;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bird_losses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Batiment::class)->constrained()->onDelete('cascade'); 
            $table->string("bird_loss_batiment")->nullable();
            $table->string("bird_loss_category")->nullable();
            $table->string("bird_loss_quantity")->nullable();
            $table->string("bird_loss_date")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bird_losses');
    }
};
