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
    const storageKey = userId ? `theme_user_${userId}` : "theme_guest";

    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem(storageKey) as Theme) || "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem(storageKey, theme);
    }, [theme, storageKey]);

    // When user changes (login/logout), load their theme
    useEffect(() => {
        const saved = (localStorage.getItem(storageKey) as Theme) || "light";
        setTheme(saved);
    }, [storageKey]);

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

// import { createContext, useContext, useEffect, useState } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextType {
//     theme: Theme;
//     toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType>({
//     theme: "light",
//     toggleTheme: () => {},
// });

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//     const [theme, setTheme] = useState<Theme>(() => {
//         return (localStorage.getItem("theme") as Theme) || "light";
//     });

//     useEffect(() => {
//         const root = window.document.documentElement;
//         root.classList.remove("light", "dark");
//         root.classList.add(theme);
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme((prev) => (prev === "light" ? "dark" : "light"));
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }

// export const useTheme = () => useContext(ThemeContext);
