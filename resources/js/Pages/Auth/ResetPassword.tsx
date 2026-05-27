import { Head, Link, useForm } from "@inertiajs/react";
import { CheckSquare, Loader2, Sun, Moon, Eye, EyeOff } from "lucide-react";
import { FormEventHandler, useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { useTheme } from "@/Components/ThemeProvider";
import { router } from "@inertiajs/react";

export default function ResetPassword({
    status,
    email,
    token,
}: {
    status?: string;
    email: string;
    token: string;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const { data, setData, post, processing, errors } = useForm({
        email: email,
        password: "",
        password_confirmation: "",
        token: token,
    });

    // Mirror password into password_confirmation automatically
    const handlePasswordChange = (value: string) => {
        setData((prev) => ({
            ...prev,
            password: value,
            password_confirmation: value,
        }));
    };

    // Redirect to login after success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                router.visit("/login");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/reset-password", {
            onSuccess: () => setSuccess(true),
        });
    };

    return (
        <>
            <Head title="Reset Password" />
            <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                <div className="w-full max-w-md space-y-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100">
                            <CheckSquare className="h-6 w-6 text-white dark:text-slate-900" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            TaskManager
                        </h1>
                    </div>

                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-between">
                                <div className="flex-1" />
                                <CardTitle className="flex-1">
                                    Reset Password
                                </CardTitle>
                                <div className="flex flex-1 justify-end">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleTheme}
                                    >
                                        {theme === "light" ? (
                                            <Moon className="h-5 w-5" />
                                        ) : (
                                            <Sun className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <CardDescription>
                                Enter your new password below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Success Banner */}
                            {success && (
                                <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900/30 p-3 text-sm text-green-700 dark:text-green-400">
                                    ✓ Password updated successfully! Redirecting
                                    to login...
                                </div>
                            )}

                            {/* Error from Laravel */}
                            {status && !success && (
                                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                {/* Email (hidden but editable) */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="password">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                handlePasswordChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter new password"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing || success}
                                >
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Remember your password?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-slate-900 dark:text-slate-100 hover:underline"
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
