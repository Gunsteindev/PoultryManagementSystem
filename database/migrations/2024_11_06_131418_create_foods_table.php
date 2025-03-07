   <?php

use App\Models\Client;
use App\Models\Supplier;
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
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string("food_code")->nullable();
            $table->string("food_name")->nullable();
            $table->foreignIdFor(Supplier::class)->constrained()->onDelete('cascade'); 
            $table->string("food_supplier_name")->nullable();
            $table->string("food_price_per_bag")->nullable();
            $table->string("food_discount")->nullable();
            $table->string("food_quantity")->nullable();
            $table->string("food_purchase_date")->nullable();
            $table->string("food_total_cost")->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
};
