import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { CheckSquare, Clock, Loader, ListTodo } from "lucide-react";

interface Stats {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
}

interface Props {
    stats: Stats;
    isAdmin: boolean;
}

export default function Dashboard({ stats, isAdmin }: Props) {
    const cards = [
        {
            label: "Total Tasks",
            value: stats.total,
            icon: ListTodo,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-950",
        },
        {
            label: "Pending",
            value: stats.pending,
            icon: Clock,
            color: "text-yellow-500",
            bg: "bg-yellow-50 dark:bg-yellow-950",
        },
        {
            label: "In Progress",
            value: stats.in_progress,
            icon: Loader,
            color: "text-indigo-500",
            bg: "bg-indigo-50 dark:bg-indigo-950",
        },
        {
            label: "Completed",
            value: stats.completed,
            icon: CheckSquare,
            color: "text-green-500",
            bg: "bg-green-50 dark:bg-green-950",
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        {isAdmin
                            ? "Overview of all tasks across all users"
                            : "Overview of your assigned tasks"}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Card key={card.label}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {card.label}
                                    </CardTitle>
                                    <div
                                        className={`p-2 rounded-lg ${card.bg}`}
                                    >
                                        <Icon
                                            className={`h-4 w-4 ${card.color}`}
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">
                                        {card.value}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {/* Progress Bar */}
                            {stats.total > 0 ? (
                                <>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Overall Progress
                                        </span>
                                        <span className="font-medium">
                                            {Math.round(
                                                (stats.completed /
                                                    stats.total) *
                                                    100,
                                            )}
                                            % completed
                                        </span>
                                    </div>
                                    <div className="w-full bg-muted rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full transition-all"
                                            style={{
                                                width: `${Math.round((stats.completed / stats.total) * 100)}%`,
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                                        <span className="flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-yellow-500 inline-block" />
                                            {stats.pending} Pending
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-indigo-500 inline-block" />
                                            {stats.in_progress} In Progress
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                                            {stats.completed} Completed
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No tasks yet.
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
