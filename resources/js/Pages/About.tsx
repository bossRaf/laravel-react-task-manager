import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
    CheckSquare,
    Shield,
    Bell,
    Archive,
    User,
    Settings,
} from "lucide-react";

const adminSteps = [
    {
        icon: User,
        title: "Create User Accounts",
        description:
            "Admins create new user accounts and assign roles. No public registration — full control over who gets access.",
    },
    {
        icon: CheckSquare,
        title: "Create & Assign Tasks",
        description:
            "Admins create tasks with title, description, priority, due date, and assign them to a specific user.",
    },
    {
        icon: Settings,
        title: "Manage & Reassign",
        description:
            "Admins can edit, delete, reassign tasks anytime. Deleted tasks go to archive and can be restored within 30 days.",
    },
    {
        icon: Bell,
        title: "Stay Notified",
        description:
            "Admins receive notifications whenever a user updates the status of a task.",
    },
];

const userSteps = [
    {
        icon: CheckSquare,
        title: "View Assigned Tasks",
        description:
            "Users see only the tasks assigned to them — no clutter, just their own work.",
    },
    {
        icon: Settings,
        title: "Update Task Status",
        description:
            "Users can update the status of their tasks: Pending, In Progress, or Completed.",
    },
    {
        icon: Bell,
        title: "Receive Notifications",
        description:
            "Users get notified when a task is assigned, deleted, or reassigned to another user.",
    },
    {
        icon: User,
        title: "Manage Profile",
        description:
            "Users can update their name, email, password, and profile picture anytime.",
    },
];

const techStack = [
    { name: "Laravel 13", description: "PHP backend framework" },
    { name: "React 18", description: "Frontend UI library" },
    { name: "TypeScript", description: "Type-safe JavaScript" },
    { name: "Inertia.js", description: "SPA bridge between Laravel & React" },
    { name: "shadcn/ui", description: "Accessible UI components" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "MySQL", description: "Relational database" },
    { name: "Railway", description: "Cloud deployment platform" },
];

export default function About() {
    return (
        <PublicLayout>
            <Head title="About" />

            {/* Hero */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                        <Shield className="h-4 w-4" />
                        About TaskManager
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Built for{" "}
                        <span className="text-primary">Structured Teams</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        TaskManager is a personal project built to demonstrate a
                        full-stack role-based task management system. It focuses
                        on clear separation of responsibilities between admins
                        and users, with real-time notifications and a clean,
                        modern UI.
                    </p>
                </div>
            </section>

            <div className="border-t max-w-6xl mx-auto" />

            {/* How It Works - Admin */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight">
                            How It Works
                        </h2>
                        <p className="text-muted-foreground">
                            Two roles, two experiences — built for clarity and
                            control.
                        </p>
                    </div>

                    {/* Admin Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <Shield className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-bold">Admin Side</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {adminSteps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <Card key={step.title}>
                                        <CardContent className="pt-6 flex gap-4">
                                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <Icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-semibold">
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* User Side */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                <User className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-bold">User Side</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {userSteps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <Card key={step.title}>
                                        <CardContent className="pt-6 flex gap-4">
                                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <Icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-semibold">
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <div className="border-t max-w-6xl mx-auto" />

            {/* Tech Stack */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-10">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Built With
                        </h2>
                        <p className="text-muted-foreground">
                            Modern full-stack technologies powering this
                            application.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {techStack.map((tech) => (
                            <Card key={tech.name} className="text-center">
                                <CardContent className="pt-6 space-y-1">
                                    <p className="font-semibold text-primary">
                                        {tech.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {tech.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 bg-[hsl(var(--sidebar))]">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Want to See It in Action?
                    </h2>
                    <p className="text-muted-foreground">
                        Login to explore the full features of TaskManager.
                    </p>
                    <Button asChild size="lg">
                        <Link href={route("login")}>Login to Dashboard</Link>
                    </Button>
                </div>
            </section>
        </PublicLayout>
    );
}
