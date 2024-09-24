<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Job_card;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        // Total Number of Customer
        $customer_total = Customer::query()->count();

        // Total Number of Apartment
        $apartment_total = Apartment::query()->count();

        // Total Number of Employee
        $employee_total = Employee::query()->count();

        // Total Number of Job Cards
        $job_total = Job_card::query()->count();

        return [
            'totalCustomer' => $customer_total,
            'totalApartment' => $apartment_total,
            'employee_total' => $employee_total,
            'job_total' => $job_total,
            'latestJobCard' => null,
            'totalAnswers' => [],
            'latestAnswers' => []
        ];
    }
}
