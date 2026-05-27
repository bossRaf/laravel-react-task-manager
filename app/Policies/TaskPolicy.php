<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    // Admins can do everything
    public function before(User $user, string $ability): bool|null
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return null;
    }

    // Any authenticated user can view tasks
    public function viewAny(User $user): bool
    {
        return true;
    }

    // Users can only view their own tasks
    public function view(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    // Any authenticated user can create tasks
    public function create(User $user): bool
    {
        return true;
    }

    // Users can only edit their own tasks
    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    // Users can only delete their own tasks
    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }
}