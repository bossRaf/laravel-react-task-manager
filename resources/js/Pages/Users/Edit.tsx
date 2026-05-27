import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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
    email: string;
    role: "admin" | "user";
}

export default function UsersEdit({ user }: { user: User }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit User" />

            <div className="space-y-6 max-w-xl">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={route("users.index")}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Edit User
                        </h1>
                        <p className="text-muted-foreground">
                            Update user details and role
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            User Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Role */}
                            <div className="space-y-1.5">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={data.role}
                                    onValueChange={(val) =>
                                        setData("role", val as "admin" | "user")
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">
                                            User
                                        </SelectItem>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <p className="text-xs text-red-500">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password">
                                    New Password
                                    <span className="text-xs text-muted-foreground ml-1">
                                        (leave blank to keep current)
                                    </span>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Min. 8 characters"
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password_confirmation">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Re-enter new password"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save Changes
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={route("users.index")}>
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
