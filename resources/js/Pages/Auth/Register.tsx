import { Head, Link, useForm } from "@inertiajs/react";
import { CheckSquare, Eye, EyeOff, Loader2, Sun, Moon } from "lucide-react";
import { FormEventHandler, useState } from "react";
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

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <>
            <Head title="Register" />
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
                                    Create an account
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
                                Get started with TaskManager today
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="John Doe"
                                        autoComplete="name"
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

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
                                    <Label htmlFor="password">Password</Label>
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
                                            placeholder="Min. 8 characters"
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

                                <div className="space-y-1.5">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
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
                                        placeholder="Re-enter your password"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Create account
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-slate-900 dark:text-slate-100 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
