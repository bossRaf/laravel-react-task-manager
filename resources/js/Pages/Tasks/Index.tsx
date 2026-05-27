import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    CheckSquare,
} from "lucide-react";
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
    assigned_to: number | null;
    assignee: User | null;
    created_at: string;
}

interface TasksIndexProps {
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search?: string;
        status?: string;
        priority?: string;
    };
    isAdmin: boolean;
    users: User[];
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

export default function TasksIndex({
    tasks,
    filters,
    isAdmin,
    users,
}: TasksIndexProps) {
    const [search, setSearch] = useState(filters.search || "");
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        task: Task | null;
    }>({
        open: false,
        task: null,
    });
    const [processing, setProcessing] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("tasks.index"),
            { search, status: filters.status, priority: filters.priority },
            { preserveState: true },
        );
    };

    const handleFilter = (key: string, value: string) => {
        router.get(
            route("tasks.index"),
            { ...filters, [key]: value === "all" ? "" : value },
            { preserveState: true },
        );
    };

    const openDeleteModal = (task: Task) => {
        setDeleteModal({ open: true, task });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, task: null });
    };

    const handleDelete = () => {
        if (!deleteModal.task) return;
        setProcessing(true);
        router.delete(route("tasks.destroy", deleteModal.task.id), {
            onFinish: () => {
                setProcessing(false);
                closeDeleteModal();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={isAdmin ? "Tasks" : "My Tasks"} />

            {/* Delete Modal */}
            <ConfirmModal
                open={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Delete Task"
                message="Are you sure you want to delete this task? It will be moved to the archive."
                taskTitle={deleteModal.task?.title}
                confirmLabel="Delete"
                confirmVariant="destructive"
                processing={processing}
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isAdmin ? "Tasks" : "My Tasks"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isAdmin
                                ? "Manage and assign tasks"
                                : "Tasks assigned to you"}
                        </p>
                    </div>
                    {isAdmin && (
                        <Button asChild>
                            <Link href={route("tasks.create")}>
                                <Plus className="h-4 w-4 mr-2" />
                                New Task
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-3">
                            <form
                                onSubmit={handleSearch}
                                className="flex gap-2 flex-1"
                            >
                                <Input
                                    placeholder="Search tasks..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="max-w-sm"
                                />
                                <Button
                                    type="submit"
                                    variant="outline"
                                    size="icon"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </form>

                            <Select
                                value={filters.status || "all"}
                                onValueChange={(val) =>
                                    handleFilter("status", val)
                                }
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Status
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Pending
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.priority || "all"}
                                onValueChange={(val) =>
                                    handleFilter("priority", val)
                                }
                            >
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        All Priority
                                    </SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Tasks List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {tasks.total} {tasks.total === 1 ? "Task" : "Tasks"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tasks.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-medium text-lg">
                                    No tasks found
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    {isAdmin
                                        ? "Get started by creating your first task"
                                        : "You have no tasks assigned to you"}
                                </p>
                                {isAdmin && (
                                    <Button asChild className="mt-4">
                                        <Link href={route("tasks.create")}>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Task
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3 pr-2">
                                {tasks.data.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
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
                                                {task.due_date && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Due:{" "}
                                                        {new Date(
                                                            task.due_date,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                )}
                                                {isAdmin && task.assignee && (
                                                    <p className="text-xs text-muted-foreground">
                                                        Assigned to:{" "}
                                                        <span className="font-medium text-foreground">
                                                            {task.assignee.name}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="relative ml-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    sideOffset={5}
                                                    collisionPadding={8}
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={route(
                                                                "tasks.edit",
                                                                task.id,
                                                            )}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                            {isAdmin
                                                                ? "Edit"
                                                                : "Update Status"}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {isAdmin && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                                                                onClick={() =>
                                                                    openDeleteModal(
                                                                        task,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
