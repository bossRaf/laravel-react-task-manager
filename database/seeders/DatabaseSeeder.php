<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name'              => 'Admin',
                'password'          => Hash::make('password'),
                'role'              => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // User account
        User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name'              => 'User',
                'password'          => Hash::make('password'),
                'role'              => 'user',
                'email_verified_at' => now(),
            ]
        );
    }
}