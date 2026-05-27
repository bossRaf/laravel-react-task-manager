<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'status' => session('status'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $request->user()->id,
            'password' => 'nullable|string|min:8',
            'avatar'   => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $user = $request->user();

        $data = [
            'name'  => $request->name,
            'email' => $request->email,
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update($data);

        return Redirect::route('profile.edit')->with('status', 'Profile updated successfully!');
    }
}