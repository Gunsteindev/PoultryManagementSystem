import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "next-themes"
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";

const appName = import.meta.env.VITE_APP_NAME || 'Poultry Management System';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <I18nextProvider i18n={i18n}>
                <ThemeProvider attribute="class" defaultTheme="light">
                    <App {...props} />
                </ThemeProvider>
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
