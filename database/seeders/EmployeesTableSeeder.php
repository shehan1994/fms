<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeesTableSeeder extends Seeder
{
    public function run()
    {
        $employees = [
            [
                'first_name' => 'Alice',
                'last_name' => 'Wonderland',
                'level' => 1,
                'contact_no' => '1234567890',
                'password' => bcrypt('password'),
                'terminate_date' => null,
                'designation' => 'Electrician',
                'email' => 'alice.wonderland@example.com',
                'status' => 1,
                'age' => 30,
                'dob' => '1992-06-06',
                'emp_code' => 'EMP001',
                'join_date' => '2021-01-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Bob',
                'last_name' => 'Builder',
                'level' => 3,
                'contact_no' => '0987654321',
                'password' => bcrypt('password'),
                'terminate_date' => null,
                'designation' => 'Helper',
                'email' => 'bob.builder@example.com',
                'status' => 1,
                'age' => 35,
                'dob' => '1988-07-07',
                'emp_code' => 'EMP002',
                'join_date' => '2020-02-20',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Charlie',
                'last_name' => 'Brown',
                'level' => 5,
                'contact_no' => '1234567899',
                'password' => bcrypt('password'),
                'terminate_date' => null,
                'designation' => 'Capenter',
                'email' => 'charlie.brown@example.com',
                'status' => 1,
                'age' => 22,
                'dob' => '2001-08-08',
                'emp_code' => 'EMP003',
                'join_date' => '2023-03-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Eve',
                'last_name' => 'Adams',
                'level' => 3,
                'contact_no' => '5555555555',
                'password' => bcrypt('password'),
                'terminate_date' => null,
                'designation' => 'Supervisor',
                'email' => 'eve.adams@example.com',
                'status' => 1,
                'age' => 28,
                'dob' => '1995-09-09',
                'emp_code' => 'EMP004',
                'join_date' => '2021-06-12',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'David',
                'last_name' => 'Smith',
                'level' => 2,
                'contact_no' => '6666666666',
                'password' => bcrypt('password'),
                'terminate_date' => null,
                'designation' => 'Plumber',
                'email' => 'david.smith@example.com',
                'status' => 1,
                'age' => 29,
                'dob' => '1994-10-10',
                'emp_code' => 'EMP005',
                'join_date' => '2022-07-07',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('employees')->insert($employees);
    }
}
