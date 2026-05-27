<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $query = $user->isAdmin()
            ? Task::with(['assignee'])
            : Task::with(['assignee'])->where('assigned_to', $user->id);

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->status && $request->status !== '') {
            $query->where('status', $request->status);
        }

        if ($request->priority && $request->priority !== '') {
            $query->where('priority', $request->priority);
        }

        $tasks = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Tasks/Index', [
            'tasks'   => $tasks,
            'filters' => $request->only(['search', 'status', 'priority']),
            'isAdmin' => $user->isAdmin(),
            'users'   => $user->isAdmin() ? User::select('id', 'name')->get() : [],
        ]);
    }

    public function create()
    {
        $this->authorizeAdmin();

        return Inertia::render('Tasks/Create', [
            'users' => User::select('id', 'name')->where('role', 'user')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorizeAdmin();

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'      => 'required|in:pending,in_progress,completed',
            'priority'    => 'required|in:low,medium,high',
            'due_date'    => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task = Task::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        // Notify assigned user
        if ($task->assigned_to) {
            Notification::create([
                'user_id' => $task->assigned_to,
                'title'   => 'New Task Assigned',
                'message' => "You have been assigned a new task: {$task->title}",
                'type'    => 'task_assigned',
                'task_id' => $task->id,
            ]);
        }

        return redirect()->route('tasks.index');
    }

    public function edit(Task $task)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->isAdmin() && $task->assigned_to !== $user->id) {
            abort(403);
        }

        return Inertia::render('Tasks/Edit', [
            'task'    => $task,
            'users'   => $user->isAdmin() ? User::select('id', 'name')->where('role', 'user')->get() : [],
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    public function update(Request $request, Task $task)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->isAdmin() && $task->assigned_to !== $user->id) {
            abort(403);
        }

        if ($user->isAdmin()) {
            $validated = $request->validate([
                'title'       => 'required|string|max:255',
                'description' => 'nullable|string',
                'status'      => 'required|in:pending,in_progress,completed',
                'priority'    => 'required|in:low,medium,high',
                'due_date'    => 'nullable|date',
                'assigned_to' => 'nullable|exists:users,id',
            ]);

            $previousAssignee = $task->assigned_to;
            $task->update($validated);

            // Notify if reassigned
            if ($validated['assigned_to'] && $validated['assigned_to'] !== $previousAssignee) {
                $newAssignee = User::find($validated['assigned_to']);

                // Notify previous assignee
                if ($previousAssignee) {
                    Notification::create([
                        'user_id' => $previousAssignee,
                        'title'   => 'Task Reassigned',
                        'message' => "Your task \"{$task->title}\" has been reassigned to {$newAssignee->name}.",
                        'type'    => 'task_reassigned',
                        'task_id' => $task->id,
                    ]);
                }

                // Notify new assignee
                Notification::create([
                    'user_id' => $validated['assigned_to'],
                    'title'   => 'New Task Assigned',
                    'message' => "You have been assigned a new task: {$task->title}",
                    'type'    => 'task_assigned',
                    'task_id' => $task->id,
                ]);
            }
        } else {
            $validated = $request->validate([
                'status' => 'required|in:pending,in_progress,completed',
            ]);

            $task->update($validated);

            // Notify admin
            $admins = User::where('role', 'admin')->get();
            foreach ($admins as $admin) {
                Notification::create([
                    'user_id' => $admin->id,
                    'title'   => 'Task Status Updated',
                    'message' => "{$user->name} updated the status of \"{$task->title}\" to {$validated['status']}.",
                    'type'    => 'status_updated',
                    'task_id' => $task->id,
                ]);
            }
        }

        return redirect()->route('tasks.index');
    }

    public function destroy(Task $task)
    {
        $this->authorizeAdmin();

        // Notify assigned user
        if ($task->assigned_to) {
            Notification::create([
                'user_id' => $task->assigned_to,
                'title'   => 'Task Deleted',
                'message' => "Your task \"{$task->title}\" has been deleted by admin.",
                'type'    => 'task_deleted',
                'task_id' => $task->id,
            ]);
        }

        $task->delete();

        return redirect()->route('tasks.index');
    }

    public function archive()
    {
        $tasks = Task::onlyTrashed()->with(['assignee', 'creator'])->latest('deleted_at')->paginate(10);

        return Inertia::render('Tasks/Archive', [
            'tasks' => $tasks,
        ]);
    }

    public function restore(string  $id)
    {
        $task = Task::onlyTrashed()->findOrFail($id);
        $task->restore();

        return back();
    }

    public function forceDelete(string $id)
    {
        $task = Task::onlyTrashed()->findOrFail($id);
        $task->forceDelete();

        return back();
    }

    private function authorizeAdmin()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if (!$user->isAdmin()) {
            abort(403);
        }
    }
}