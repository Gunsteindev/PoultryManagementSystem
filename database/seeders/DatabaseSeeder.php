<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Serge',
            'email' => 'serge@hakiliferme.com',
            'password' => bcrypt('Serge_12!'),
            'role' => 'Admin'
        ]);
        
        User::factory()->create([
            'name' => 'Japhet',
            'email' => 'japhet@hakiliferme.com',
            'password' => bcrypt('Japhet_12!'),
            'role' => 'Admin'
        ]);
        
        User::factory()->create([
            'name' => 'Angie',
            'email' => 'angie@hakiliferme.com',
            'password' => bcrypt('Angie_12!'),
            'role' => 'Supervisor'
        ]);

        User::factory()->create([
            'name' => 'Kyller',
            'email' => 'kyller@hakiliferme.com',
            'password' => bcrypt('Kyller_12!'),
            'role' => 'Commercial'
        ]);

        User::factory()->create([
            'name' => 'Viviane',
            'email' => 'viviane@hakiliferme.com',
            'password' => bcrypt('Viviane_12!'),
            'role' => 'Production'
        ]);
    }
}
