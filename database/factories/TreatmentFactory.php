<?php

namespace Database\Factories;

use App\Models\Batiment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Treatment>
 */
class TreatmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    //  private static $batimentCodes = [
    //     'BAT001', 'BAT002', 'BAT003', 'BAT004', 'BAT005',
    //     'BAT006', 'BAT007', 'BAT008', 'BAT009', 'BAT010',
    // ];

    public function definition(): array
    {
        // $treatmentBatimentCode = $this->faker->unique()->randomElement(self::$batimentCodes);
        // $batiment = Batiment::where('batiment_code', $treatmentBatimentCode)->first();

        return [
            // 'treatment_batiment_code' => $treatmentBatimentCode, // Selected batiment code
            // 'treatment_veto_name' => $this->faker->name, // Random veterinarian name
            // 'treatment_name' => $this->faker->randomElement(['Vaccination', 'Deworming', 'General Check-up', 'Parasite Control', 'Surgery']),
            // 'treatment_comment' => $this->faker->sentence, // Random comment
            // 'user_id' => $this->faker->numberBetween(1, 3), // user_id between 1 and 3
            // 'batiment_id' => $batiment ? $batiment->id : null, // Match batiment ID based on code
        ];
    }
}
