<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Customer;
use App\Models\Job_card;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();

        // Total Number of Customer
        $customer_total = Customer::query()->count();

        // Total Number of Employee
        $employee_total = User::query()->count();

        // Total Number of Employee with levels
        $levelCounts = User::query()
            ->select('level', \DB::raw('count(*) as count'))
            ->groupBy('level')
            ->get();

        // Total Number of Apartment
        $apartment_total = Apartment::query()->count();

        // Total Number of Job Cards
        $job_total = Job_card::query()->count();

        $jobFinishedCount = Job_card::query()->where('status', 4)->count();

        $jobCounts = Job_card::query()
            ->select('status', \DB::raw('count(*) as count'))
            ->whereIn('status', [1, 2, 3, 4])
            ->groupBy('status')
            ->get()
            ->toArray();

        $jobsPendingCount = Job_card::query()
            ->whereIn('status', [1, 2, 3])
            ->count();

            $totalAmountSum = Job_card::query()->sum('total_amount');

        $latestJobCard = Job_card::query()
        ->latest('created_at') // Order by the most recent creation date
        ->take(2) // Limit to the latest 5 records
        ->get();

        $currentYear = Carbon::now()->year;
        $lastYear = $currentYear - 1;
        $monthlyCountsCurrentYear = array_fill(0, 12, 0); // Default to 0 for each month
        $monthlyCountsLastYear = array_fill(0, 12, 0);
        $jobsCurrentYear = Job_card::query()
            ->whereYear('created_at', $currentYear)
            ->selectRaw('MONTH(created_at) as month, count(*) as count')
            ->groupBy('month')
            ->pluck('count', 'month')
            ->toArray();
        $jobsLastYear = Job_card::query()
            ->whereYear('created_at', $lastYear)
            ->selectRaw('MONTH(created_at) as month, count(*) as count')
            ->groupBy('month')
            ->pluck('count', 'month')
            ->toArray();
        foreach ($jobsCurrentYear as $month => $count) {
            // Subtract 1 to match array index (months start from 1, but arrays are 0-based)
            $monthlyCountsCurrentYear[$month - 1] = $count;
        }

        // Fill the monthly data for the last year
        foreach ($jobsLastYear as $month => $count) {
            // Subtract 1 to match array index
            $monthlyCountsLastYear[$month - 1] = $count;
        }

        return [
            'totalCustomer' => $customer_total,
            'totalApartment' => $apartment_total,
            'employee_total' => $employee_total,
            'jobFinishedCount' => $jobFinishedCount,
            'jobCounts' => $jobCounts,
            'job_total' => $job_total,
            'jobsPendingCount' => $jobsPendingCount,
            'monthlyCountsCurrentYear' => $monthlyCountsCurrentYear,
            'monthlyCountsLastYear' => $monthlyCountsLastYear,
            'levelCounts' => $levelCounts,
            'latestJobCard' => $latestJobCard,
            'totalAmountSum' => $totalAmountSum,
        ];
    }
}
