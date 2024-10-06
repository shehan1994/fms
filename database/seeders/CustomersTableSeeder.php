<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CustomersTableSeeder extends Seeder
{
    public function run()
    {
        $customers = [
            [
                'user_id' => 1, // Assuming a user with ID 1 exists
                'first_name' => 'John',
                'last_name' => 'Doe',
                'passport_no' => 'P1234567',
                'nic' => '123456789V',
                'email' => 'john.doe@example.com',
                'dob' => '1985-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'first_name' => 'Jane',
                'last_name' => 'Doe',
                'passport_no' => 'P7654321',
                'nic' => '987654321V',
                'email' => 'jane.doe@example.com',
                'dob' => '1990-02-02',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'first_name' => 'Alice',
                'last_name' => 'Smith',
                'passport_no' => 'P1234568',
                'nic' => '123456780V',
                'email' => 'alice.smith@example.com',
                'dob' => '1988-03-03',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 4,
                'first_name' => 'Bob',
                'last_name' => 'Johnson',
                'passport_no' => 'P8765432',
                'nic' => '123456781V',
                'email' => 'bob.johnson@example.com',
                'dob' => '1975-04-04',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 5,
                'first_name' => 'Charlie',
                'last_name' => 'Brown',
                'passport_no' => 'P2345678',
                'nic' => '123456782V',
                'email' => 'charlie.brown@example.com',
                'dob' => '1982-05-05',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('customers')->insert($customers);
    }
}
