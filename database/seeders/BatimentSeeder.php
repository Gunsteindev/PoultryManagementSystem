<?php

namespace Database\Seeders;

use App\Models\Batiment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BatimentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // Batiment::factory()->count(10)->create();

        $batiments = [
            [
                "batiment_code" => "BAT001",
                "batiment_description" => "Main chicken coop",
                "batiment_bande" => "Layer",
                "batiment_capacity" => 500,
                "batiment_category" => "Poultry",
                "batiment_quantity" => 450,
                "user_id" => 1
            ],
            [
                "batiment_code" => "BAT002",
                "batiment_description" => "Feed storage unit",
                "batiment_bande" => "Storage",
                "batiment_capacity" => 1000,
                "batiment_category" => "Storage",
                "batiment_quantity" => 800,
                "user_id" => 2
            ],
            [
                "batiment_code" => "BAT003",
                "batiment_description" => "Broiler chicken coop",
                "batiment_bande" => "Broiler",
                "batiment_capacity" => 700,
                "batiment_category" => "Poultry",
                "batiment_quantity" => 680,
                "user_id" => 2
            ],
            [
                "batiment_code" => "BAT004",
                "batiment_description" => "Hatchery unit",
                "batiment_bande" => "Incubator",
                "batiment_capacity" => 300,
                "batiment_category" => "Hatchery",
                "batiment_quantity" => 250,
                "user_id" => 3
            ],
            [
                "batiment_code" => "BAT005",
                "batiment_description" => "Duck house",
                "batiment_bande" => "Duck",
                "batiment_capacity" => 400,
                "batiment_category" => "Poultry",
                "batiment_quantity" => 350,
                "user_id" => 3
            ],
            [
                "batiment_code" => "BAT006",
                "batiment_description" => "Storage for grains",
                "batiment_bande" => "Grain Storage",
                "batiment_capacity" => 1200,
                "batiment_category" => "Storage",
                "batiment_quantity" => 950,
                "user_id" => 3
            ],
            [
                "batiment_code" => "BAT007",
                "batiment_description" => "Quail house",
                "batiment_bande" => "Quail",
                "batiment_capacity" => 200,
                "batiment_category" => "Poultry",
                "batiment_quantity" => 180,
                "user_id" => 2
            ],
            [
                "batiment_code" => "BAT008",
                "batiment_description" => "Turkey shed",
                "batiment_bande" => "Turkey",
                "batiment_capacity" => 600,
                "batiment_category" => "Poultry",
                "batiment_quantity" => 570,
                "user_id" => 2
            ],
            [
                "batiment_code" => "BAT009",
                "batiment_description" => "General tools storage",
                "batiment_bande" => "Tools",
                "batiment_capacity" => 500,
                "batiment_category" => "Storage",
                "batiment_quantity" => 480,
                "user_id" => 1
            ],
            [
                "batiment_code" => "BAT010",
                "batiment_description" => "Goat pen",
                "batiment_bande" => "Livestock",
                "batiment_capacity" => 300,
                "batiment_category" => "Livestock",
                "batiment_quantity" => 250,
                "user_id" => 1
            ]
        ];

        foreach ($batiments as $batiment) {
            Batiment::create($batiment);
        }
    }
}
