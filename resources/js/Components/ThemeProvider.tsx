import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
});

export function ThemeProvider({
    children,
    userId,
}: {
    children: React.ReactNode;
    userId?: number | null;
}) {
    const getStorageKey = (id?: number | null) =>
        id ? `theme_user_${id}` : null;

    const getInitialTheme = (id?: number | null): Theme => {
        if (!id) return "light";
        return (localStorage.getItem(`theme_user_${id}`) as Theme) || "light";
    };

    const [theme, setTheme] = useState<Theme>(() => getInitialTheme(userId));

    // When userId changes (login/logout), update theme
    useEffect(() => {
        const newTheme = getInitialTheme(userId);
        setTheme(newTheme);
    }, [userId]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);

        const key = getStorageKey(userId);
        if (key) {
            localStorage.setItem(key, theme);
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
