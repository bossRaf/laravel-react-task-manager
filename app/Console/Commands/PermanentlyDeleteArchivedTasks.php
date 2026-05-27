<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class PermanentlyDeleteArchivedTasks extends Command
{
    protected $signature = 'tasks:purge-archived';
    protected $description = 'Permanently delete tasks that have been archived for more than 30 days';

    public function handle(): void
    {
        $count = Task::onlyTrashed()
            ->where('deleted_at', '<=', now()->subDays(30))
            ->forceDelete();

        $this->info("Permanently deleted {$count} archived task(s).");
    }
}