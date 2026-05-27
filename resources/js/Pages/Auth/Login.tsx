import { Head, Link, useForm } from "@inertiajs/react";
import { CheckSquare, Eye, EyeOff, Loader2, Sun, Moon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Checkbox from "@/Components/Checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { useTheme } from "@/Components/ThemeProvider";

export default function Login({ status }: { status?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="Log in" />
            <div className="relative flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                <div className="w-full max-w-md space-y-6">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-between">
                                <div className="flex-1" />
                                <CardTitle className="flex-1">
                                    Welcome back
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
                                Sign in to your account to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status && (
                                <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
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

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
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
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="••••••••"
                                            autoComplete="current-password"
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

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                (e.target.checked ||
                                                    false) as false,
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="font-normal text-slate-600 dark:text-slate-400"
                                    >
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign in
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-slate-900 dark:text-slate-100 hover:underline"
                        >
                            Create one
                        </Link>
                    </p> */}
                </div>
            </div>
        </>
    );
}
