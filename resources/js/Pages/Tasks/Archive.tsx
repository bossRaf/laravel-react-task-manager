import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Archive, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

interface User {
    id: number;
    name: string;
}

interface Task {
    id: number;
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
    due_date: string | null;
    deleted_at: string;
    assignee: User | null;
    creator: User | null;
}

interface Props {
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
};

const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
};

const priorityLabels: Record<string, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
};

export default function TasksArchive({ tasks }: Props) {
    const [restoreModal, setRestoreModal] = useState<{
        open: boolean;
        task: Task | null;
    }>({
        open: false,
        task: null,
    });
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        task: Task | null;
    }>({
        open: false,
        task: null,
    });
    const [processing, setProcessing] = useState(false);

    const openRestoreModal = (task: Task) =>
        setRestoreModal({ open: true, task });
    const closeRestoreModal = () =>
        setRestoreModal({ open: false, task: null });

    const openDeleteModal = (task: Task) =>
        setDeleteModal({ open: true, task });
    const closeDeleteModal = () => setDeleteModal({ open: false, task: null });

    const handleRestore = () => {
        if (!restoreModal.task) return;
        setProcessing(true);
        router.patch(
            route("tasks.restore", restoreModal.task.id),
            {},
            {
                onFinish: () => {
                    setProcessing(false);
                    closeRestoreModal();
                },
            },
        );
    };

    const handleForceDelete = () => {
        if (!deleteModal.task) return;
        setProcessing(true);
        router.delete(route("tasks.force-delete", deleteModal.task.id), {
            onFinish: () => {
                setProcessing(false);
                closeDeleteModal();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Archive" />

            {/* Restore Modal */}
            <ConfirmModal
                open={restoreModal.open}
                onClose={closeRestoreModal}
                onConfirm={handleRestore}
                title="Restore Task"
                message="Are you sure you want to restore this task? It will be moved back to active tasks."
                taskTitle={restoreModal.task?.title}
                confirmLabel="Restore"
                confirmVariant="default"
                processing={processing}
            />

            {/* Permanent Delete Modal */}
            <ConfirmModal
                open={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={handleForceDelete}
                title="Permanently Delete Task"
                message="Are you sure you want to permanently delete this task? This action cannot be undone."
                taskTitle={deleteModal.task?.title}
                confirmLabel="Delete Forever"
                confirmVariant="destructive"
                processing={processing}
            />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Archive
                    </h1>
                    <p className="text-muted-foreground">
                        Deleted tasks are permanently removed after 30 days
                    </p>
                </div>

                {/* Archive List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {tasks.total} {tasks.total === 1 ? "Task" : "Tasks"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tasks.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Archive className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-medium text-lg">
                                    Archive is empty
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    Deleted tasks will appear here
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3 pr-2">
                                {tasks.data.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-medium truncate">
                                                    {task.title}
                                                </p>
                                                <Badge
                                                    className={
                                                        statusColors[
                                                            task.status
                                                        ]
                                                    }
                                                >
                                                    {statusLabels[task.status]}
                                                </Badge>
                                                <Badge
                                                    className={
                                                        priorityColors[
                                                            task.priority
                                                        ]
                                                    }
                                                >
                                                    {
                                                        priorityLabels[
                                                            task.priority
                                                        ]
                                                    }
                                                </Badge>
                                            </div>
                                            {task.description && (
                                                <p className="text-sm text-muted-foreground mt-1 truncate">
                                                    {task.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-4 mt-1">
                                                {task.assignee && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Was assigned to:{" "}
                                                        <span className="font-medium text-foreground">
                                                            {task.assignee.name}
                                                        </span>
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    Deleted:{" "}
                                                    {new Date(
                                                        task.deleted_at,
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    openRestoreModal(task)
                                                }
                                            >
                                                <RotateCcw className="h-4 w-4 mr-1" />
                                                Restore
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() =>
                                                    openDeleteModal(task)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {tasks.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {tasks.links.map((link, i) => (
                                    <Button
                                        key={i}
                                        variant={
                                            link.active ? "default" : "outline"
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.get(link.url)
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
