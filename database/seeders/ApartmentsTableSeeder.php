<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApartmentsTableSeeder extends Seeder
{
    public function run()
    {
        $apartments = [
            [
                'customer_id' => 1, // Assuming a customer with ID 1 exists
                'user_id' => 1, // Assuming a user with ID 1 exists
                'apt_no' => 'A101',
                'address_01' => '123 Main St',
                'address_02' => 'Apt 4B',
                'city' => 'Metropolis',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => 2,
                'user_id' => 1,
                'apt_no' => 'B202',
                'address_01' => '456 Elm St',
                'address_02' => 'Unit 2A',
                'city' => 'Gotham',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => 3,
                'user_id' => 2,
                'apt_no' => 'C303',
                'address_01' => '789 Oak St',
                'address_02' => null,
                'city' => 'Star City',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => 4,
                'user_id' => 2,
                'apt_no' => 'D404',
                'address_01' => '101 Pine St',
                'address_02' => 'Suite 100',
                'city' => 'Central City',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => 5,
                'user_id' => 3,
                'apt_no' => 'E505',
                'address_01' => '202 Maple St',
                'address_02' => null,
                'city' => 'Coast City',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('apartments')->insert($apartments);
    }
}
