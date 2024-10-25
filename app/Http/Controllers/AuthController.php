<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function index(Request $request)
    {
        return UserResource::collection(User::orderBy('created_at','desc')
            ->paginate(10)
        );
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'level' => $data['level'],
            'contact_no' => $data['contact_no'],
            'designation' => $data['designation'],
            'nic' => $data['nic'],
            'status' => $data['status'],
            'join_date' => $data['join_date'],
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function show(User $user,Request $request)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User  $user)
    {
        $data = $request->validated();
        $user->update($data);
        return new UserResource($user);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'message' => 'Successfully logged out',
            'success' => true
        ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
