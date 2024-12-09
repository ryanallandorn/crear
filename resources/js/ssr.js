// import { createSSRApp, h } from 'vue';
// import { renderToString } from '@vue/server-renderer';
// import { createInertiaApp } from '@inertiajs/vue3';
// import createServer from '@inertiajs/vue3/server';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createServer((page) =>
//     createInertiaApp({
//         page,
//         render: renderToString,
//         title: (title) => `${title} - ${appName}`,
//         resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
//         setup({ App, props, plugin }) {
//             return createSSRApp({ render: () => h(App, props) })
//                 .use(plugin)
//                 .use(ZiggyVue, {
//                     ...page.props.ziggy,
//                     location: new URL(page.props.ziggy.location),
//                 });
//         },
//     })
// );


import { render } from '@inertiajs/svelte';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

export default async function handler(page) {
    return render({
        page,
        resolve: (name) =>
            resolvePageComponent(`./Pages/${name}.svelte`, import.meta.glob('./Pages/**/*.svelte')),
        setup({ App, props }) {
            return {
                component: App,
                props: {
                    ...props,
                    appName,
                },
            };
        },
        title: (title) => `${title} - ${appName}`,
    });
}
