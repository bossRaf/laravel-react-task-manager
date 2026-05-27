<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role'     => 'required|in:admin,user',
        ]);

        User::create([
            'name'              => $validated['name'],
            'email'             => $validated['email'],
            'password'          => Hash::make($validated['password']),
            'role'              => $validated['role'],
            'email_verified_at' => now(),
        ]);

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role'  => 'required|in:admin,user',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->update([
            'name'  => $validated['name'],
            'email' => $validated['email'],
            'role'  => $validated['role'],
            ...($validated['password']
                ? ['password' => Hash::make($validated['password'])]
                : []),
        ]);

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        // Prevent admin from deleting themselves
        if ($user->id === auth()->id()) {
            abort(403, 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.index');
    }
}