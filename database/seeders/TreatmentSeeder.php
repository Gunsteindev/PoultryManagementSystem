<?php

namespace Database\Seeders;

use App\Models\Treatment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TreatmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Use factory to generate 10 treatment records
        //  Treatment::factory()->count(10)->create();

        // $data = [
        //     [
        //         'treatment_batiment_code' => 'BAT001',
        //         'treatment_veto_name' => 'Dr. Smith',
        //         'treatment_name' => 'Vaccination',
        //         'treatment_comment' => 'Administered successfully',
        //         'user_id' => 1,
        //     ],
        //     [
        //         'treatment_batiment_code' => 'BAT002',
        //         'treatment_veto_name' => 'Dr. Brown',
        //         'treatment_name' => 'Deworming',
        //         'treatment_comment' => 'No complications observed',
        //         'user_id' => 2,
        //     ],
        //     // Add other data objects here...
        // ];

        // foreach ($data as $treatment) {
        //     Treatment::create($treatment);
        // }
    }
}
