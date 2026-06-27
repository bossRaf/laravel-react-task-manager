import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { CheckSquare, Users, Bell, Archive, Moon, Shield } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";

const features = [
    {
        icon: Shield,
        title: "Role-Based Access",
        description:
            "Admins and users have separate dashboards and permissions. Admins manage everything while users focus only on their assigned tasks.",
    },
    {
        icon: CheckSquare,
        title: "Smart Task Assignment",
        description:
            "Admins create and assign tasks to specific users. Tasks can be reassigned anytime with automatic notifications sent to all involved.",
    },
    {
        icon: Bell,
        title: "Real-Time Notifications",
        description:
            "Users get notified when a task is assigned, deleted, or reassigned. Admins get notified when a user updates a task status.",
    },
    {
        icon: Users,
        title: "User Management",
        description:
            "Admins can create new accounts, set roles, and promote or demote users between Admin and User roles anytime.",
    },
    {
        icon: Archive,
        title: "Task Archive",
        description:
            "Deleted tasks move to archive and are permanently removed after 30 days. Admins can restore or reassign archived tasks.",
    },
    {
        icon: Moon,
        title: "Dark & Light Mode",
        description:
            "Every user has their own theme preference that persists across sessions — switch between dark and light mode anytime.",
    },
];

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                        <CheckSquare className="h-4 w-4" />
                        Role-Based Task Management
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Manage Tasks,{" "}
                        <span className="text-primary">Stay in Control</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        A powerful task management system where admins assign
                        and track tasks, and users stay informed every step of
                        the way through real-time notifications.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-2">
                        <Button asChild size="lg">
                            <Link href={route("login")}>Get Started</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href={route("about")}>Learn More</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="border-t max-w-6xl mx-auto" />

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Built for teams that need structure, accountability,
                            and clear communication between admins and users.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Card
                                    key={feature.title}
                                    className="hover:shadow-md transition-shadow"
                                >
                                    <CardContent className="pt-6 space-y-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-[hsl(var(--sidebar))]">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Ready to Get Started?
                    </h2>
                    <p className="text-muted-foreground">
                        Login to your account and start managing tasks
                        efficiently with your team.
                    </p>
                    <Button asChild size="lg">
                        <Link href={route("login")}>Login to Dashboard</Link>
                    </Button>
                </div>
            </section>
        </PublicLayout>
    );
}
