import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";
import { FormEventHandler } from "react";

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
}

interface Props {
    task: Task;
    users: User[];
    isAdmin: boolean;
}

export default function TasksEdit({ task, users, isAdmin }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        title: task.title,
        description: task.description ?? "",
        status: task.status,
        priority: task.priority,
        due_date: task.due_date ?? "",
        assigned_to: task.assigned_to ? String(task.assigned_to) : "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("tasks.update", task.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Task" />

            <div className="space-y-6 max-w-xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route("tasks.index")}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Edit Task
                        </h1>
                        <p className="text-muted-foreground">
                            {isAdmin
                                ? "Update task details"
                                : "Update task status"}
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Task Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Status — visible to everyone */}
                            <div className="space-y-1.5">
                                <Label>Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(val) =>
                                        setData(
                                            "status",
                                            val as
                                                | "pending"
                                                | "in_progress"
                                                | "completed",
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                {errors.status && (
                                    <p className="text-xs text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Admin only fields */}
                            {isAdmin && (
                                <>
                                    {/* Title */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            placeholder="Task title"
                                        />
                                        {errors.title && (
                                            <p className="text-xs text-red-500">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Task description (optional)"
                                            rows={3}
                                        />
                                        {errors.description && (
                                            <p className="text-xs text-red-500">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Priority */}
                                    <div className="space-y-1.5">
                                        <Label>Priority</Label>
                                        <Select
                                            value={data.priority}
                                            onValueChange={(val) =>
                                                setData(
                                                    "priority",
                                                    val as
                                                        | "low"
                                                        | "medium"
                                                        | "high",
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">
                                                    Low
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    High
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.priority && (
                                            <p className="text-xs text-red-500">
                                                {errors.priority}
                                            </p>
                                        )}
                                    </div>

                                    {/* Due Date */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="due_date">
                                            Due Date
                                        </Label>
                                        <Input
                                            id="due_date"
                                            type="date"
                                            value={data.due_date}
                                            onChange={(e) =>
                                                setData(
                                                    "due_date",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.due_date && (
                                            <p className="text-xs text-red-500">
                                                {errors.due_date}
                                            </p>
                                        )}
                                    </div>

                                    {/* Assign To */}
                                    <div className="space-y-1.5">
                                        <Label>Assign To</Label>
                                        <Select
                                            value={data.assigned_to}
                                            onValueChange={(val) =>
                                                setData("assigned_to", val)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a user" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={String(user.id)}
                                                    >
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.assigned_to && (
                                            <p className="text-xs text-red-500">
                                                {errors.assigned_to}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save Changes
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route("tasks.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
