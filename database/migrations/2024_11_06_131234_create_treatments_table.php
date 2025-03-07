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
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Batiment::class)->constrained()->cascadeOnDelete();
            $table->string("treatment_batiment_code")->nullable();
            $table->string("treatment_veto_name")->nullable();
            $table->string("treatment_name")->nullable();
            $table->string("treatment_comment")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
