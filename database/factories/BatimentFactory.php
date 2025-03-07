<?php


namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Batiment>
 */
class BatimentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'batiment_code' => $this->faker->unique()->bothify('BAT###'), // Generates something like BAT001
            // 'batiment_description' => $this->faker->sentence, // Random sentence for description
            // 'batiment_bande' => $this->faker->randomElement(['Layer', 'Storage', 'Broiler', 'Incubator', 'Duck', 'Grain Storage', 'Quail', 'Turkey', 'Tools', 'Livestock']), // Random band type
            // 'batiment_capacity' => $this->faker->numberBetween(100, 1200), // Random capacity between 100 and 1200
            // 'batiment_category' => $this->faker->randomElement(['Poultry', 'Storage', 'Hatchery', 'Livestock']), // Random category
            // 'batiment_quantity' => $this->faker->numberBetween(100, 1000), // Random quantity between 100 and 1000
            // 'user_id' => $this->faker->numberBetween(1, 3),
        ];
    }
}
