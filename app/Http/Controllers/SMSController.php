<?php

namespace App\Http\Controllers;

use App\Models\SMS;
use Http;
use Illuminate\Http\Request;

class SMSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function show(SMS $sMS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function edit(SMS $sMS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SMS $sMS)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SMS  $sMS
     * @return \Illuminate\Http\Response
     */
    public function destroy(SMS $sMS)
    {
        //
    }

    public function sendSMS(Request $request)
    {
        $request->validate([
            'phoneNumber' => 'required',
            'message' => 'required|string'
        ]);

        $apiKey = '94718905314';
        $password = '1530';
        // $apiKey = '94771397086';
        // $password = '1476';
        $phoneNumber = $request->query('phoneNumber'); // Corrected format with country code
        $message = $request->query('message'); // Your message
        $encodedMessage = urlencode($message);
        $url = "https://www.textit.biz/sendmsg?id={$apiKey}&pw={$password}&to={$phoneNumber}&text={$encodedMessage}";

        \Log::info('SMS URL:', ['url' => $url]); // Log the complete URL

        $response = Http::get($url);
        \Log::info('SMS Response:', ['response' => $response->json()]); // Log response as JSON

        return response()->json($response->json());
    }
}
