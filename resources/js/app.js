// resources/js/app.js

import NProgress from 'nprogress'
import { createInertiaApp } from '@inertiajs/svelte'
import {InertiaProgress} from '@inertiajs/progress';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';

const route = window.route;
import { setupI18n } from './i18n';

import './bootstrap';
import '../scss/app.scss';

import '../../node_modules/flyonui/dist/js/accordion.js';

// import 'material-symbols';

// import 'preline/preline';

// // import * as bootstrap from 'bootstrap';
// // window.bootstrap = bootstrap;
// // import 'bootstrap-icons/font/bootstrap-icons.css';

// ///import './color-mode';
// //import './sidebar';
// import { addSpinner, removeSpinner } from './Scripts/loading';
// import { showToast, handleCallbackMessages } from './Scripts/toasts';

// // document.querySelectorAll('[data-bs-toggle="collapse"]').forEach((toggle) => {
// //     toggle.addEventListener('click', function () {
// //         const icons = this.querySelectorAll('i');
// //         icons.forEach((icon) => icon.classList.toggle('d-none'));
// //     });
// // });



// Import the route function from ziggy-js
// import route from 'ziggy-js';

// // Make the route function globally available
// window.route = route;

const appName = import.meta.env.VITE_APP_NAME || 'Crear';

setupI18n().then(() => {
    createInertiaApp({
        title: title => `${title} - ${appName}`,
        resolve: name => 
            resolvePageComponent(
                `./Pages/${name}.svelte`,
                import.meta.glob('./Pages/**/*.svelte')
            ),
        setup({ el, App, props }) {
            new App({ target: el, props });
        },
    });
});