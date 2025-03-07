<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
 
        $clients = [
            [
                'client_name' => 'Alice Johnson',
                'client_company' => 'Tech Solutions Inc.',
                'client_telephone' => 1234567890,
                'client_email' => 'alice.johnson@example.com',
                'client_position' => 'IT Manager',
                'client_location' => '123 Innovation Drive, Tech City',
                'user_id' => 1,
            ],
            [
                'client_name' => 'Bob Smith',
                'client_company' => 'GreenWorld Corp.',
                'client_telephone' => 9876543210,
                'client_email' => 'bob.smith@example.com',
                'client_position' => 'CEO',
                'client_location' => '45 Nature Lane, EcoTown',
                'user_id' => 1,
            ],
            [
                'client_name' => 'Catherine Lee',
                'client_company' => 'Global Ventures Ltd.',
                'client_telephone' => 1122334455,
                'client_email' => 'catherine.lee@example.com',
                'client_position' => 'Business Analyst',
                'client_location' => '78 Enterprise Road, BizHub',
                'user_id' => 1,
            ],
            [
                'client_name' => 'David Brown',
                'client_company' => 'Future Builders Co.',
                'client_telephone' => 2211445566,
                'client_email' => 'david.brown@example.com',
                'client_position' => 'Project Manager',
                'client_location' => '90 Development Street, BuildVille',
                'user_id' => 2,
            ],
            [
                'client_name' => 'Emma Wilson',
                'client_company' => 'Bright Ideas LLC',
                'client_telephone' => 3344556677,
                'client_email' => 'emma.wilson@example.com',
                'client_position' => 'Marketing Director',
                'client_location' => '56 Creative Way, MarketingCity',
                'user_id' => 2,
            ],
            [
                'client_name' => 'Frank Martinez',
                'client_company' => 'FarmTech Solutions',
                'client_telephone' => 9988776655,
                'client_email' => 'frank.martinez@example.com',
                'client_position' => 'Agriculture Consultant',
                'client_location' => '22 Harvest Road, AgriTown',
                'user_id' => 1,
            ],
            [
                'client_name' => 'Grace White',
                'client_company' => 'EduLearn Systems',
                'client_telephone' => 5566778899,
                'client_email' => 'grace.white@example.com',
                'client_position' => 'Education Specialist',
                'client_location' => '14 Knowledge Blvd, LearningCity',
                'user_id' => 2,
            ],
            [
                'client_name' => 'Henry Lewis',
                'client_company' => 'SafeHome Ltd.',
                'client_telephone' => 6677889900,
                'client_email' => 'henry.lewis@example.com',
                'client_position' => 'Security Advisor',
                'client_location' => '32 Safety Avenue, SecureTown',
                'user_id' => 2,
            ],
            [
                'client_name' => 'Ivy Clark',
                'client_company' => 'HealthFirst Co.',
                'client_telephone' => 4455667788,
                'client_email' => 'ivy.clark@example.com',
                'client_position' => 'Health Consultant',
                'client_location' => '9 Wellness Road, HealthCity',
                'user_id' => 2,
            ],
            [
                'client_name' => 'Jack Davis',
                'client_company' => 'TravelWays Agency',
                'client_telephone' => 8899776655,
                'client_email' => 'jack.davis@example.com',
                'client_position' => 'Tour Manager',
                'client_location' => '67 Adventure Blvd, ExploreTown',
                'user_id' => 1,
            ],
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }

    }
}
