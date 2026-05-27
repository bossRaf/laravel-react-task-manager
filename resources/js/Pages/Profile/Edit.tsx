import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent } from "@/Components/ui/card";
import { Loader2, Eye, EyeOff, Camera } from "lucide-react";
import { FormEventHandler, useState, useRef } from "react";

// export default function Edit({ status }: PageProps<{ status?: string }>) {
export default function Edit({ status }: { status?: string }) {
    const { auth } = usePage<PageProps>().props;
    const [showPassword, setShowPassword] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        password: "",
        avatar: null as File | null,
        _method: "PATCH",
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData("avatar", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("profile.update"));
    };

    const avatarSrc = preview ?? auth.user.avatar ?? null;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="space-y-6 max-w-xl">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Profile
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your profile information and password
                    </p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        {/* Success Banner */}
                        {status && (
                            <div className="mb-6 rounded-md bg-green-50 dark:bg-green-900/30 p-3 text-sm text-green-700 dark:text-green-400">
                                ✓ {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center gap-3">
                                <div
                                    // PICTURE SIZE
                                    className="relative w-80 h-80 rounded-xl overflow-hidden border-2 border-border cursor-pointer group"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                >
                                    {avatarSrc ? (
                                        <img
                                            src={avatarSrc}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                            <span className="text-4xl font-bold text-muted-foreground">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="h-6 w-6 text-white mb-1" />
                                        <span className="text-xs text-white">
                                            Change Photo
                                        </span>
                                    </div>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpg,image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                                {errors.avatar && (
                                    <p className="text-xs text-red-500">
                                        {errors.avatar}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Click to upload · JPG, PNG, WEBP · Max 2MB
                                </p>
                            </div>

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
                                    autoComplete="name"
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
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label htmlFor="password">
                                    New Password
                                    {/* <span className="text-xs text-muted-foreground ml-1">
                                        (leave blank to keep current)
                                    </span> */}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        placeholder="Your new password"
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

                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
