import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, usePage } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Components/ThemeProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function AppWrapper({ App, props }: { App: any; props: any }) {
    const page = usePage();
    const userId = (page.props as any)?.auth?.user?.id ?? null;

    return (
        <ThemeProvider userId={userId}>
            <App {...props} />
        </ThemeProvider>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
