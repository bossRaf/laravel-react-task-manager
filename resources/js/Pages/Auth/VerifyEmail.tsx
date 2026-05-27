import { Head, Link, useForm } from "@inertiajs/react";
import { CheckSquare, Loader2, Sun, Moon, MailCheck } from "lucide-react";
import { FormEventHandler } from "react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { useTheme } from "@/Components/ThemeProvider";

export default function VerifyEmail({ status }: { status?: string }) {
    const { theme, toggleTheme } = useTheme();
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <>
            <Head title="Email Verification" />
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
                                    Verify Email
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
                                Thanks for signing up! Please verify your email
                                address by clicking the link we sent you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Icon */}
                            <div className="flex justify-center py-2">
                                <MailCheck className="h-12 w-12 text-muted-foreground" />
                            </div>

                            {status === "verification-link-sent" && (
                                <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Resend Verification Email
                                </Button>
                            </form>

                            <div className="text-center">
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 underline"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
