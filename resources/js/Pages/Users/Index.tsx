import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/Components/ConfirmModal";

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
}

const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-800",
    user: "bg-blue-100 text-blue-800",
};

export default function UsersIndex({ users }: Props) {
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        user: User | null;
    }>({
        open: false,
        user: null,
    });
    const [processing, setProcessing] = useState(false);

    const openDeleteModal = (user: User) =>
        setDeleteModal({ open: true, user });
    const closeDeleteModal = () => setDeleteModal({ open: false, user: null });

    const handleDelete = () => {
        if (!deleteModal.user) return;
        setProcessing(true);
        router.delete(route("users.destroy", deleteModal.user.id), {
            onFinish: () => {
                setProcessing(false);
                closeDeleteModal();
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="User Management" />

            <ConfirmModal
                open={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Delete User"
                message="Are you sure you want to delete this user?"
                taskTitle={deleteModal.user?.name}
                confirmLabel="Delete"
                confirmVariant="destructive"
                processing={processing}
            />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            User Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage all users and their roles
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("users.create")}>
                            <Plus className="h-4 w-4 mr-2" />
                            New User
                        </Link>
                    </Button>
                </div>

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {users.total} {users.total === 1 ? "User" : "Users"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {users.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="font-medium text-lg">
                                    No users found
                                </h3>
                                <Button asChild className="mt-4">
                                    <Link href={route("users.create")}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create User
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {users.data.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-medium">
                                                    {user.name}
                                                </p>
                                                <Badge
                                                    className={
                                                        roleColors[user.role]
                                                    }
                                                >
                                                    {user.role}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {user.email}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Joined:{" "}
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 ml-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "users.edit",
                                                        user.id,
                                                    )}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() =>
                                                    openDeleteModal(user)
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
                        {users.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {users.links.map((link, i) => (
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

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, router } from "@inertiajs/react";
// import { Button } from "@/Components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
// import { Badge } from "@/Components/ui/badge";
// import { Plus, Pencil, Trash2, Users } from "lucide-react";

// interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: "admin" | "user";
//     created_at: string;
// }

// interface Props {
//     users: {
//         data: User[];
//         current_page: number;
//         last_page: number;
//         total: number;
//         links: { url: string | null; label: string; active: boolean }[];
//     };
// }

// const roleColors: Record<string, string> = {
//     admin: "bg-purple-100 text-purple-800",
//     user: "bg-blue-100 text-blue-800",
// };

// export default function UsersIndex({ users }: Props) {
//     const handleDelete = (id: number) => {
//         if (confirm("Are you sure you want to delete this user?")) {
//             router.delete(route("users.destroy", id));
//         }
//     };

//     return (
//         <AuthenticatedLayout>
//             <Head title="User Management" />

//             <div className="space-y-6">
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h1 className="text-2xl font-bold tracking-tight">
//                             User Management
//                         </h1>
//                         <p className="text-muted-foreground">
//                             Manage all users and their roles
//                         </p>
//                     </div>
//                     <Button asChild>
//                         <Link href={route("users.create")}>
//                             <Plus className="h-4 w-4 mr-2" />
//                             New User
//                         </Link>
//                     </Button>
//                 </div>

//                 {/* Users List */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="text-base">
//                             {users.total} {users.total === 1 ? "User" : "Users"}
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         {users.data.length === 0 ? (
//                             <div className="flex flex-col items-center justify-center py-12 text-center">
//                                 <Users className="h-12 w-12 text-muted-foreground mb-4" />
//                                 <h3 className="font-medium text-lg">
//                                     No users found
//                                 </h3>
//                                 <Button asChild className="mt-4">
//                                     <Link href={route("users.create")}>
//                                         <Plus className="h-4 w-4 mr-2" />
//                                         Create User
//                                     </Link>
//                                 </Button>
//                             </div>
//                         ) : (
//                             <div className="space-y-3">
//                                 {users.data.map((user) => (
//                                     <div
//                                         key={user.id}
//                                         className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
//                                     >
//                                         <div className="flex-1 min-w-0">
//                                             <div className="flex items-center gap-2 flex-wrap">
//                                                 <p className="font-medium">
//                                                     {user.name}
//                                                 </p>
//                                                 <Badge
//                                                     className={
//                                                         roleColors[user.role]
//                                                     }
//                                                 >
//                                                     {user.role}
//                                                 </Badge>
//                                             </div>
//                                             <p className="text-sm text-muted-foreground mt-1">
//                                                 {user.email}
//                                             </p>
//                                             <p className="text-xs text-muted-foreground mt-1">
//                                                 Joined:{" "}
//                                                 {new Date(
//                                                     user.created_at,
//                                                 ).toLocaleDateString()}
//                                             </p>
//                                         </div>

//                                         <div className="flex items-center gap-2 ml-2">
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 asChild
//                                             >
//                                                 <Link
//                                                     href={route(
//                                                         "users.edit",
//                                                         user.id,
//                                                     )}
//                                                 >
//                                                     <Pencil className="h-4 w-4" />
//                                                 </Link>
//                                             </Button>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                                                 onClick={() =>
//                                                     handleDelete(user.id)
//                                                 }
//                                             >
//                                                 <Trash2 className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Pagination */}
//                         {users.last_page > 1 && (
//                             <div className="flex justify-center gap-2 mt-6">
//                                 {users.links.map((link, i) => (
//                                     <Button
//                                         key={i}
//                                         variant={
//                                             link.active ? "default" : "outline"
//                                         }
//                                         size="sm"
//                                         disabled={!link.url}
//                                         onClick={() =>
//                                             link.url && router.get(link.url)
//                                         }
//                                         dangerouslySetInnerHTML={{
//                                             __html: link.label,
//                                         }}
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
