<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Customer;
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

        return [
            'totalCustomer' => $customer_total,
            'totalApartment' => $apartment_total,
            'latestJobCard' => null,
            'totalAnswers' => [],
            'latestAnswers' => []
        ];
    }
}
