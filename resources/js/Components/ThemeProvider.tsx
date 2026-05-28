import { createContext, useContext, useEffect, useState } from "react";
import { router } from "@inertiajs/react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

const getThemeForUser = (userId: number | null): Theme => {
    if (!userId) return "light";
    return (localStorage.getItem(`theme_user_${userId}`) as Theme) || "light";
};

export function ThemeProvider({
    children,
    userId: initialUserId,
}: {
    children: React.ReactNode;
    userId?: number | null;
}) {
    const [userId, setUserId] = useState<number | null>(initialUserId ?? null);
    const [theme, setTheme] = useState<Theme>(() =>
        getThemeForUser(initialUserId ?? null),
    );

    // Listen to Inertia navigation to detect login/logout
    useEffect(() => {
        const unsubscribe = router.on("finish", () => {
            const pageProps = (window as any)?.__inertia?.page?.props;
            const newUserId = pageProps?.auth?.user?.id ?? null;
            if (newUserId !== userId) {
                setUserId(newUserId);
                setTheme(getThemeForUser(newUserId));
            }
        });
        return () => unsubscribe();
    }, [userId]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        if (userId) {
            localStorage.setItem(`theme_user_${userId}`, theme);
        }
    }, [theme, userId]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
