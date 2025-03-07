<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id' => Auth::id(),
                        'name' => Auth::user()->name,
                        'email' => Auth::user()->email,
                        'permissions' => Auth::user()->getAllPermissions()->pluck('name'), // Returns permissions as an array
                        'roles' => Auth::user()->getRoleNames(), // Returns roles as an array
                        // Add any other user fields you need
                    ] : null,
                ];
            },
        ]);

        // Inertia::share([
        //     'auth' => function () {
        //         $user = Auth::user();
                
        //         return [
        //             'user' => $user ? [
        //                 'id' => $user->id,
        //                 'name' => $user->name,
        //                 'email' => $user->email,
        //                 'roles' => $user->getRoleNames(), // Returns roles as an array
        //                 'permissions' => $user->getAllPermissions()->pluck('name'), // Returns permissions as an array
        //                 // Add any other user fields you need
        //             ] : null,
        //         ];
        //     },
        // ]);
    }
}
