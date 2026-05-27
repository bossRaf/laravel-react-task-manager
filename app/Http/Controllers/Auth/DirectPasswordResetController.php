<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class DirectPasswordResetController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email'    => 'required|email|exists:users,email',
            'password' => 'required|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('status', 'Password updated successfully!');
    }
}