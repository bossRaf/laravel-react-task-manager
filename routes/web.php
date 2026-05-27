<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

// Authenticated routes
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->isAdmin()) {
            $tasks = \App\Models\Task::query();
        } else {
            $tasks = \App\Models\Task::where('assigned_to', $user->id);
        }

        return Inertia::render('Dashboard', [
            'stats' => [
                'total'       => (clone $tasks)->count(),
                'in_progress' => (clone $tasks)->where('status', 'in_progress')->count(),
                'pending'     => (clone $tasks)->where('status', 'pending')->count(),
                'completed'   => (clone $tasks)->where('status', 'completed')->count(),
            ],
            'isAdmin' => $user->isAdmin(),
        ]);
    })->name('dashboard');

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.read-all');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Tasks — admin full CRUD, user only update status
    Route::resource('tasks', TaskController::class)->except(['show']);

    // Admin only routes
    Route::middleware(['admin'])->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
        Route::get('/archive', [TaskController::class, 'archive'])->name('tasks.archive');
        Route::patch('/archive/{task}/restore', [TaskController::class, 'restore'])->name('tasks.restore');
        Route::delete('/archive/{task}/force-delete', [TaskController::class, 'forceDelete'])->name('tasks.force-delete');
    });

});

require __DIR__.'/auth.php';