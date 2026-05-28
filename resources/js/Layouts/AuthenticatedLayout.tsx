import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    LayoutDashboard,
    CheckSquare,
    User,
    LogOut,
    Menu,
    Sun,
    Moon,
    Bell,
    Users,
    Archive,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Separator } from "@/Components/ui/separator";
import { Sheet, SheetContent } from "@/Components/ui/sheet";
import { useTheme } from "@/Components/ThemeProvider";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { auth } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const isAdmin = auth.user.role === "admin";

    const adminNavItems = [
        { href: route("dashboard"), label: "Dashboard", icon: LayoutDashboard },
        { href: route("tasks.index"), label: "Tasks", icon: CheckSquare },
        { href: route("tasks.archive"), label: "Archive", icon: Archive },
        { href: route("users.index"), label: "User Management", icon: Users },
    ];

    const userNavItems = [
        { href: route("dashboard"), label: "Dashboard", icon: LayoutDashboard },
        { href: route("tasks.index"), label: "My Tasks", icon: CheckSquare },
    ];

    const navItems = isAdmin ? adminNavItems : userNavItems;

    const handleLogout = () => {
        //router.post(route("logout"));
        localStorage.removeItem(`theme_user_${auth.user.id}`);
        router.post(route("logout"));
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[hsl(var(--sidebar))]">
            {/* Logo */}
            <div className="flex items-center gap-2 px-6 py-5">
                <CheckSquare className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">TaskManager</span>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        window.location.pathname ===
                        new URL(item.href).pathname;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <Separator />

            {/* Theme Toggle */}
            <div className="px-3 py-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="w-full justify-start gap-3 px-3"
                >
                    {theme === "light" ? (
                        <>
                            <Moon className="h-4 w-4" />
                            <span className="text-sm">Dark Mode</span>
                        </>
                    ) : (
                        <>
                            <Sun className="h-4 w-4" />
                            <span className="text-sm">Light Mode</span>
                        </>
                    )}
                </Button>
            </div>

            <Separator />

            {/* User Info */}
            <div className="px-3 py-4 space-y-1">
                {/* Avatar & Name */}
                <div className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="h-8 w-8">
                        {auth.user.avatar && (
                            <AvatarImage
                                src={auth.user.avatar}
                                alt={auth.user.name}
                                className="object-cover"
                            />
                        )}
                        <AvatarFallback className="text-xs">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                            {auth.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                            {auth.user.email}
                        </p>
                        <p className="text-xs text-primary font-medium mt-0.5 capitalize">
                            {auth.user.role}
                        </p>
                    </div>
                </div>

                {/* Profile */}
                <Link
                    href={route("profile.edit")}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <User className="h-4 w-4" />
                    Profile
                </Link>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r bg-[hsl(var(--sidebar))]">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetContent
                    side="left"
                    className="p-0 w-64 bg-[hsl(var(--sidebar))]"
                >
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-h-0 min-w-0">
                {/* Top Bar */}
                <header className="flex items-center justify-between px-4 py-3 border-b bg-[hsl(var(--sidebar))]">
                    <div className="flex items-center gap-2 md:hidden">
                        <CheckSquare className="h-5 w-5 text-primary" />
                        <span className="font-bold">TaskManager</span>
                    </div>
                    <div className="hidden md:block" />
                    <div className="flex items-center gap-2">
                        {/* Bell Notification */}
                        <Link href={route("notifications.index")}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative"
                            >
                                <Bell className="h-5 w-5" />
                                {auth.unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
                                        {auth.unreadCount > 9
                                            ? "9+"
                                            : auth.unreadCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="md:hidden"
                        >
                            {theme === "light" ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
