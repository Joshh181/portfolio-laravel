import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Joshua Lumactod - Developer Portfolio';

// Fallback route helper if Ziggy global is not yet initialized
if (typeof window !== 'undefined' && typeof window.route === 'undefined') {
    window.route = function (name, params) {
        const routes = {
            'portfolio': '/',
            'projects.index': '/projects',
            'projects.create': '/projects/create',
            'projects.store': '/projects',
            'projects.show': (id) => `/projects/${id}`,
            'projects.edit': (id) => `/projects/${id}/edit`,
            'projects.update': (id) => `/projects/${id}`,
            'projects.destroy': (id) => `/projects/${id}`,
        };
        const target = routes[name];
        if (typeof target === 'function') {
            return target(params);
        }
        return target || `/${String(name).replace('.', '/')}`;
    };
}

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#6366f1',
    },
});
