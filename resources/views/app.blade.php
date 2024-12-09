{{-- resources/views/app.blade.php --}}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Crear') }}</title>
        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.svelte"])
        @inertiaHead
    </head>
    <body class="h-full font-sans antialiased {{ $page['props']['bodyClasses'] ?? '' }} dark:bg-gray-900 dark:text-white">
        @inertia
    </body>
</html>
