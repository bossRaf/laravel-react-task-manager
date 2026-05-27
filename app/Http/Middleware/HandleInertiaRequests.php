<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            // 'auth' => [
            //     'user' => $request->user() ? [
            //         'id'    => $request->user()->id,
            //         'name'  => $request->user()->name,
            //         'email' => $request->user()->email,
            //         'role'  => $request->user()->role,
            //     ] : null,
            //     'unreadCount' => $request->user()
            //         ? $request->user()->notifications()->whereNull('read_at')->count()
            //         : 0,
            // ],
            'auth' => [
                'user' => $request->user() ? [
                    'id'     => $request->user()->id,
                    'name'   => $request->user()->name,
                    'email'  => $request->user()->email,
                    'role'   => $request->user()->role,
                    'avatar' => $request->user()->avatar
                        ? asset('storage/' . $request->user()->avatar)
                        : null,
                ] : null,
                'unreadCount' => $request->user()
                    ? $request->user()->notifications()->whereNull('read_at')->count()
                    : 0,
            ],
        ];
    }
}