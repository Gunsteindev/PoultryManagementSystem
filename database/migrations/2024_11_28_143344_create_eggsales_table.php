<?php

use App\Models\Client;
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
        Schema::create('eggsales', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Client::class)->constrained()->onDelete('cascade'); 
            $table->string("eggsale_client_name")->nullable();
            $table->string("eggsale_code")->nullable();
            $table->string("eggsale_description")->nullable();
            $table->string("eggsale_unit_price")->nullable();
            $table->string("eggsale_quantity")->nullable();
            $table->string("eggsale_reduction")->nullable();
            $table->string("eggsale_total_cost")->nullable();
            $table->string("eggsale_date")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eggsales');
    }
};
