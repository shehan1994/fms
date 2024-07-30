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

        // Total Number of Surveys
        /*$total = Survey::query()->where('user_id', $user->id)->count();*/

        // Total Number of Customer
        $customer_total = Customer::query()->count();

        // Total Number of Apartment
        $apartment_total = Apartment::query()->count();

        // Latest Survey
        /*$latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();*/

        // Total Number of answers
        /*$totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();*/

        // Latest 5 answer
        /*$latestAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answers.*');*/

        return [
            'totalCustomer' => $customer_total,
            'totalApartment' => $apartment_total,
            'latestJobCard' => null,
            'totalAnswers' => [],
            'latestAnswers' => []
        ];
    }
}
