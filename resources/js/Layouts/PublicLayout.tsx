import { Link } from "@inertiajs/react";
import { CheckSquare, Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useTheme } from "@/Components/ThemeProvider";
import { useState } from "react";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* Header */}
            <header className="border-b bg-[hsl(var(--sidebar))] sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href={route("home")}
                        className="flex items-center gap-2"
                    >
                        <CheckSquare className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg">TaskManager</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href={route("home")}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href={route("about")}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
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
                        <Button asChild className="hidden md:inline-flex">
                            <Link href={route("login")}>Login</Link>
                        </Button>
                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t bg-[hsl(var(--sidebar))] px-4 py-4 space-y-3">
                        <Link
                            href={route("home")}
                            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href={route("about")}
                            className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Button asChild className="w-full">
                            <Link href={route("login")}>Login</Link>
                        </Button>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t bg-[hsl(var(--sidebar))] py-6">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <CheckSquare className="h-5 w-5 text-primary" />
                        <span className="font-bold">TaskManager</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} TaskManager. Built by{" "}
                        <a
                            href="https://github.com/bossRaf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Raffy Maluya
                        </a>
                        .
                    </p>

                    <nav className="flex items-center gap-4">
                        <Link
                            href={route("home")}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href={route("about")}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href={route("login")}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Login
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
