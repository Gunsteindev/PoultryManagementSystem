<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create roles
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        $supervisorRole = Role::create(['name' => RolesEnum::Supervisor->value]);
        $productionRole = Role::create(['name' => RolesEnum::Production->value]);
        $commercialRole = Role::create(['name' => RolesEnum::Commercial->value]);

        // Create permissions
        $permissions = [
            PermissionsEnum::ManagePickupCreateView->value,
            PermissionsEnum::ManagePickupEditDelete->value,
            PermissionsEnum::ManageConsomationCreateView->value,
            PermissionsEnum::ManageConsomationEditDelete->value,
            PermissionsEnum::ManageTreatmentCreateView->value,
            PermissionsEnum::ManageTreatmentEditDelete->value,
            PermissionsEnum::ManagePurchaseCreateView->value,
            PermissionsEnum::ManagePurchaseEditDelete->value,
            PermissionsEnum::ManageSaleCreateView->value,
            PermissionsEnum::ManageSaleEditDelete->value,
            PermissionsEnum::ManageTransferAll->value,
            PermissionsEnum::ManageBatimentAll->value,
            PermissionsEnum::ManageUsers->value,
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign permissions to roles
        $productionRole->syncPermissions([
            PermissionsEnum::ManagePickupCreateView->value,
            PermissionsEnum::ManageConsomationCreateView->value,
            PermissionsEnum::ManageTreatmentCreateView->value,
        ]);

        $commercialRole->syncPermissions([
            PermissionsEnum::ManagePurchaseCreateView->value,
            PermissionsEnum::ManageSaleCreateView->value,
        ]);

        $supervisorRole->syncPermissions([
            PermissionsEnum::ManagePickupCreateView->value,
            PermissionsEnum::ManageConsomationCreateView->value,
            PermissionsEnum::ManageTreatmentCreateView->value,
            PermissionsEnum::ManagePurchaseCreateView->value,
            PermissionsEnum::ManageSaleCreateView->value,
            PermissionsEnum::ManageTransferAll->value,
            PermissionsEnum::ManageBatimentAll->value,
        ]);

        $adminRole->syncPermissions($permissions);
    }
}
