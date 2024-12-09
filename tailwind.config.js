import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
//const preline = require('preline/plugin');
// import withMT from "@material-tailwind/html/utils/withMT";
import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.svelte',
        './src/**/*.{html,js,svelte,ts}',
        //"./node_modules/flyonui/dist/js/*.js",
        //'node_modules/preline/dist/*.js',
        //'./node_modules/preline/preline.js',
        "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
        
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Fira Sans"', ...defaultTheme.fontFamily.sans], // Updated to Fira Sans
            },
            
        },
    },

    plugins: [
        forms, 
        typography,
        //preline,
        flowbitePlugin,

    ],
};
