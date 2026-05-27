import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications: Notification[];
}

const typeColors: Record<string, string> = {
    task_assigned: "bg-blue-100 text-blue-800",
    task_deleted: "bg-red-100 text-red-800",
    task_reassigned: "bg-orange-100 text-orange-800",
    status_updated: "bg-green-100 text-green-800",
};

const typeLabels: Record<string, string> = {
    task_assigned: "Assigned",
    task_deleted: "Deleted",
    task_reassigned: "Reassigned",
    status_updated: "Status Update",
};

export default function NotificationsIndex({ notifications }: Props) {
    const handleMarkAsRead = (id: number) => {
        router.patch(route("notifications.read", id));
    };

    const handleMarkAllAsRead = () => {
        router.patch(route("notifications.read-all"));
    };

    const unread = notifications.filter((n) => !n.read_at);

    return (
        <AuthenticatedLayout>
            <Head title="Notifications" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Notifications
                        </h1>
                        <p className="text-muted-foreground">
                            You have {unread.length} unread notification
                            {unread.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    {unread.length > 0 && (
                        <Button variant="outline" onClick={handleMarkAllAsRead}>
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Notifications List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {notifications.length}{" "}
                            {notifications.length === 1
                                ? "Notification"
                                : "Notifications"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-medium text-lg">
                                    No notifications
                                </h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    You're all caught up!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex items-start justify-between p-4 rounded-lg border transition-colors ${
                                            !notification.read_at
                                                ? "bg-primary/5 border-primary/20"
                                                : "bg-card"
                                        }`}
                                    >
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-medium text-sm">
                                                    {notification.title}
                                                </p>
                                                <Badge
                                                    className={
                                                        typeColors[
                                                            notification.type
                                                        ]
                                                    }
                                                >
                                                    {
                                                        typeLabels[
                                                            notification.type
                                                        ]
                                                    }
                                                </Badge>
                                                {!notification.read_at && (
                                                    <span className="h-2 w-2 rounded-full bg-primary" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(
                                                    notification.created_at,
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleMarkAsRead(
                                                        notification.id,
                                                    )
                                                }
                                                className="ml-2 shrink-0"
                                            >
                                                Mark read
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
