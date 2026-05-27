export interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "user";
    avatar: string | null;
}

export interface Auth {
    user: User;
    unreadCount: number;
}

export interface PageProps {
    auth: Auth;
    [key: string]: unknown;
}
