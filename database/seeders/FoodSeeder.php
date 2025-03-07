<?php

namespace Database\Seeders;
use App\Models\Food;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $foods = [
            [
                'food_code' => 'FC001',
                'food_name' => 'Layer Feed',
                'food_price_per_bag' => 25.50,
                'food_discount' => 2.00,
                'food_quantity' => 100,
                'food_total_cost' => 2350.00,
                'food_purchase_date' => '2024-12-01',
                'user_id' => 1,
            ],
            [
                'food_code' => 'FC002',
                'food_name' => 'Broiler Starter',
                'food_price_per_bag' => 30.00,
                'food_discount' => 3.00,
                'food_quantity' => 80,
                'food_total_cost' => 2160.00,
                'food_purchase_date' => '2024-11-30',
                'user_id' => 1,
            ],
            [
                'food_code' => 'FC003',
                'food_name' => 'Grower Feed',
                'food_price_per_bag' => 28.75,
                'food_discount' => 2.50,
                'food_quantity' => 60,
                'food_total_cost' => 1575.00,
                'food_purchase_date' => '2024-11-28',
                'user_id' => 1,
            ],
            [
                'food_code' => 'FC004',
                'food_name' => 'Finisher Feed',
                'food_price_per_bag' => 32.00,
                'food_discount' => 3.20,
                'food_quantity' => 50,
                'food_total_cost' => 1440.00,
                'food_purchase_date' => '2024-11-25',
                'user_id' => 2,
            ],
            [
                'food_code' => 'FC005',
                'food_name' => 'Duck Feed',
                'food_price_per_bag' => 27.00,
                'food_discount' => 1.50,
                'food_quantity' => 70,
                'food_total_cost' => 1785.00,
                'food_purchase_date' => '2024-12-02',
                'user_id' => 2,
            ],
            [
                'food_code' => 'FC006',
                'food_name' => 'Turkey Feed',
                'food_price_per_bag' => 35.00,
                'food_discount' => 2.00,
                'food_quantity' => 40,
                'food_total_cost' => 1320.00,
                'food_purchase_date' => '2024-11-29',
                'user_id' => 2,
            ],
            [
                'food_code' => 'FC007',
                'food_name' => 'Quail Feed',
                'food_price_per_bag' => 24.50,
                'food_discount' => 1.00,
                'food_quantity' => 90,
                'food_total_cost' => 2140.50,
                'food_purchase_date' => '2024-11-27',
                'user_id' => 1,
            ],
            [
                'food_code' => 'FC008',
                'food_name' => 'Organic Feed',
                'food_price_per_bag' => 40.00,
                'food_discount' => 4.00,
                'food_quantity' => 30,
                'food_total_cost' => 1080.00,
                'food_purchase_date' => '2024-12-03',
                'user_id' => 1,
            ],
            [
                'food_code' => 'FC009',
                'food_name' => 'Fish Feed',
                'food_price_per_bag' => 33.50,
                'food_discount' => 3.50,
                'food_quantity' => 55,
                'food_total_cost' => 1653.75,
                'food_purchase_date' => '2024-11-26',
                'user_id' => 1,
            ],
            [
                'food_code' => 'FC010',
                'food_name' => 'Cattle Feed',
                'food_price_per_bag' => 45.00,
                'food_discount' => 5.00,
                'food_quantity' => 25,
                'food_total_cost' => 1000.00,
                'food_purchase_date' => '2024-12-04',
                'user_id' => 1,
            ],
        ];

        foreach ($foods as $food) {
            Food::create($food);
        }
    }
}
