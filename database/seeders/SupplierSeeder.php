<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'supplier_name' => 'John Doe',
                'supplier_role' => 'Distributor',
                'supplier_company' => 'Agro Supplies Ltd.',
                'supplier_telephone' => '+1234567890',
                'supplier_position' => 'Manager',
                'supplier_address' => '123 Green Street, Springfield',
                'user_id' => 1,
            ],
            [
                'supplier_name' => 'Jane Smith',
                'supplier_role' => 'Manufacturer',
                'supplier_company' => 'FarmTech Co.',
                'supplier_telephone' => '+9876543210',
                'supplier_position' => 'Director',
                'supplier_address' => '45 Harvest Lane, Greenville',
                'user_id' => 2,
            ],
            [
                'supplier_name' => 'Michael Brown',
                'supplier_role' => 'Wholesaler',
                'supplier_company' => 'CropKing Distributors',
                'supplier_telephone' => '+1122334455',
                'supplier_position' => 'Sales Head',
                'supplier_address' => '67 Field Avenue, Sunnytown',
                'user_id' => 2,
            ],
            [
                'supplier_name' => 'Emily Davis',
                'supplier_role' => 'Retailer',
                'supplier_company' => 'Harvest Depot',
                'supplier_telephone' => '+2211445566',
                'supplier_position' => 'Owner',
                'supplier_address' => '89 Market Road, AgriCity',
                'user_id' => 2,
            ],
            [
                'supplier_name' => 'Chris Wilson',
                'supplier_role' => 'Exporter',
                'supplier_company' => 'AgroWorld Exports',
                'supplier_telephone' => '+3344556677',
                'supplier_position' => 'Export Manager',
                'supplier_address' => '23 Trade Zone, Portville',
                'user_id' => 2,
            ],
            [
                'supplier_name' => 'Sophia Johnson',
                'supplier_role' => 'Importer',
                'supplier_company' => 'Global Agro Imports',
                'supplier_telephone' => '+9988776655',
                'supplier_position' => 'Procurement Head',
                'supplier_address' => '77 Crossway Street, Harbor City',
                'user_id' => 1,
            ],
            [
                'supplier_name' => 'Daniel White',
                'supplier_role' => 'Consultant',
                'supplier_company' => 'Farm Solutions Inc.',
                'supplier_telephone' => '+5566778899',
                'supplier_position' => 'Consultant',
                'supplier_address' => '10 Pioneer Road, AgriTech City',
                'user_id' => 1,
            ],
            [
                'supplier_name' => 'Olivia Martinez',
                'supplier_role' => 'Supplier',
                'supplier_company' => 'Fresh Agri Supplies',
                'supplier_telephone' => '+6677889900',
                'supplier_position' => 'Logistics Manager',
                'supplier_address' => '32 Greenhouse Blvd, Farmland',
                'user_id' => 2,
            ],
            [
                'supplier_name' => 'Ethan Clark',
                'supplier_role' => 'Trader',
                'supplier_company' => 'FarmTrade Solutions',
                'supplier_telephone' => '+4455667788',
                'supplier_position' => 'Trade Manager',
                'supplier_address' => '59 Growers Street, MarketVille',
                'user_id' => 1,
            ],
            [
                'supplier_name' => 'Mia Lewis',
                'supplier_role' => 'Producer',
                'supplier_company' => 'Organic Farm Ltd.',
                'supplier_telephone' => '+8899776655',
                'supplier_position' => 'Production Manager',
                'supplier_address' => '12 Rural Drive, Countryside',
                'user_id' => 1,
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
