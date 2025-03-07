<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'supplier_name' => $this->faker->name,
            'supplier_role' => $this->faker->randomElement([
                'Distributor', 'Manufacturer', 'Wholesaler', 'Retailer', 'Exporter', 'Importer', 'Consultant', 'Supplier', 'Trader', 'Producer'
            ]),
            'supplier_company' => $this->faker->company,
            'supplier_telephone' => $this->faker->phoneNumber,
            'supplier_position' => $this->faker->jobTitle,
            'supplier_address' => $this->faker->address,
            'user_id' => $this->faker->numberBetween(1, 3), // Adjust user_id range as needed
        ];
    }
}
