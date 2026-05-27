<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'view tasks',
            'create tasks',
            'edit tasks',
            'delete tasks',
            'manage users',
            'manage roles',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole  = Role::firstOrCreate(['name' => 'user']);

        // Assign all permissions to admin
        $adminRole->givePermissionTo(Permission::all());

        // Assign limited permissions to user
        $userRole->givePermissionTo([
            'view tasks',
            'create tasks',
            'edit tasks',
            'delete tasks',
        ]);

        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'              => 'Admin User',
                'password'          => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');

        // Create Regular Test User
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name'              => 'Test User',
                'password'          => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $user->assignRole('user');
    }
}