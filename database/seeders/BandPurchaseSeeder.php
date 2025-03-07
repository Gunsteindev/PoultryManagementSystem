<?php

namespace Database\Seeders;

use App\Models\BandPurchase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BandPurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bandePurchases = [
            [
                'band_purchase_code' => 'BPC001',
                'band_purchase_band_code' => 'B001',
                'band_purchase_description' => 'Feed Band for Poultry',
                'band_purchase_unit_price' => 15.50,
                'band_purchase_reduction' => 2.00,
                'band_purchase_quantity' => 50,
                'band_purchase_total_cost' => 650.00,
                'band_purchase_date' => '2024-12-01',
                'user_id' => 2
            ],
            [
                'band_purchase_code' => 'BPC002',
                'band_purchase_band_code' => 'B002',
                'band_purchase_description' => 'Water Band for Livestock',
                'band_purchase_unit_price' => 12.00,
                'band_purchase_reduction' => 1.50,
                'band_purchase_quantity' => 30,
                'band_purchase_total_cost' => 315.00,
                'band_purchase_date' => '2024-12-02',
                'user_id' => 2
            ],
            [
                'band_purchase_code' => 'BPC003',
                'band_purchase_band_code' => 'B003',
                'band_purchase_description' => 'Cage Band for Small Animals',
                'band_purchase_unit_price' => 20.00,
                'band_purchase_reduction' => 3.00,
                'band_purchase_quantity' => 20,
                'band_purchase_total_cost' => 340.00,
                'band_purchase_date' => '2024-12-03',
                'user_id' => 2
            ],
            [
                'band_purchase_code' => 'BPC004',
                'band_purchase_band_code' => 'B004',
                'band_purchase_description' => 'Nutrient Band for Cattle',
                'band_purchase_unit_price' => 18.50,
                'band_purchase_reduction' => 2.50,
                'band_purchase_quantity' => 40,
                'band_purchase_total_cost' => 640.00,
                'band_purchase_date' => '2024-12-04',
                'user_id' => 1
            ],
            [
                'band_purchase_code' => 'BPC005',
                'band_purchase_band_code' => 'B005',
                'band_purchase_description' => 'Protective Band for Poultry',
                'band_purchase_unit_price' => 25.00,
                'band_purchase_reduction' => 5.00,
                'band_purchase_quantity' => 10,
                'band_purchase_total_cost' => 200.00,
                'band_purchase_date' => '2024-12-05',
                'user_id' => 1
            ],
            [
                'band_purchase_code' => 'BPC006',
                'band_purchase_band_code' => 'B006',
                'band_purchase_description' => 'Feeding Band for Poultry',
                'band_purchase_unit_price' => 13.75,
                'band_purchase_reduction' => 1.00,
                'band_purchase_quantity' => 60,
                'band_purchase_total_cost' => 750.00,
                'band_purchase_date' => '2024-12-06',
                'user_id' => 1
            ],
            [
                'band_purchase_code' => 'BPC007',
                'band_purchase_band_code' => 'B007',
                'band_purchase_description' => 'Ventilation Band for Livestock',
                'band_purchase_unit_price' => 22.00,
                'band_purchase_reduction' => 4.00,
                'band_purchase_quantity' => 25,
                'band_purchase_total_cost' => 450.00,
                'band_purchase_date' => '2024-12-07',
                'user_id' => 1
            ],
            [
                'band_purchase_code' => 'BPC008',
                'band_purchase_band_code' => 'B008',
                'band_purchase_description' => 'Band for Egg Storage',
                'band_purchase_unit_price' => 28.50,
                'band_purchase_reduction' => 3.50,
                'band_purchase_quantity' => 15,
                'band_purchase_total_cost' => 375.00,
                'band_purchase_date' => '2024-12-08',
                'user_id' => 1
            ],
            [
                'band_purchase_code' => 'BPC009',
                'band_purchase_band_code' => 'B009',
                'band_purchase_description' => 'Transport Band for Livestock',
                'band_purchase_unit_price' => 19.50,
                'band_purchase_reduction' => 2.00,
                'band_purchase_quantity' => 35,
                'band_purchase_total_cost' => 617.50,
                'band_purchase_date' => '2024-12-09',
                'user_id' => 1
            ],
            [
                'band_purchase_code' => 'BPC010',
                'band_purchase_band_code' => 'B010',
                'band_purchase_description' => 'Climate Control Band',
                'band_purchase_unit_price' => 21.00,
                'band_purchase_reduction' => 3.00,
                'band_purchase_quantity' => 50,
                'band_purchase_total_cost' => 900.00,
                'band_purchase_date' => '2024-12-10',
                'user_id' => 1
            ]
        ];

        foreach ($bandePurchases as $purchase) {
            BandPurchase::create($purchase);
        }
    }
}
