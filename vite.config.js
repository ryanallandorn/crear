import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import sveltePreprocess from 'svelte-preprocess';


const ASSET_URL = process.env.ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/scss/app.scss', 'resources/js/app.js'],
            refresh: true,
        }),
        svelte({
            prebundleSvelteLibraries: true, // Updated option
            preprocess: sveltePreprocess({
                scss: {},
            }),
        }),
        // viteCompression({ algorithm: 'brotliCompress', ext: '.br' }), // PROD
        
    ],
    resolve: {
		alias: {
            '@resources-js': path.resolve(__dirname, 'resources/js'),
            '@components': path.resolve(__dirname, 'resources/js/Components'),
            '@layouts': path.resolve(__dirname, 'resources/js/Layouts'),
            '@pages': path.resolve(__dirname, 'resources/js/Pages'),
            '@utils': path.resolve(__dirname, 'resources/js/Utils'),
            '@lang': path.resolve(__dirname, 'resources/js/Localization'),
            '@scripts': path.resolve(__dirname, 'resources/js/Scripts'),
            //
            '@frontend-components': path.resolve(__dirname, 'resources/js/Frontend/Components'),
            '@frontend-layouts': path.resolve(__dirname, 'resources/js/Frontend/Layouts'),
            '@frontend-pages': path.resolve(__dirname, 'resources/js/Frontend/Pages'),
            '@frontend-utils': path.resolve(__dirname, 'resources/js/Frontend/Utils'),
            '@frontend-lang': path.resolve(__dirname, 'resources/js/Frontend/Localization'),
            '@frontend-scripts': path.resolve(__dirname, 'resources/js/Frontend/Scripts'),


		}
	},
    // optimizeDeps: {  // PROD
    //     include: [
    //         '@inertiajs/inertia',
    //         '@inertiajs/inertia-svelte',
    //     ]
    // }
});
