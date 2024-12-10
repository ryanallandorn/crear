{{-- resources/views/app.blade.php --}}

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Crear') }}</title>


        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <!-- Load Fira Sans from Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;700&display=swap" rel="stylesheet">
        


        @routes
        @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.svelte"])
        @inertiaHead
    </head>
    <body class="h-full font-sans antialiased {{ $page['props']['bodyClasses'] ?? '' }} dark:bg-gray-900 dark:text-white">
        @inertia
    </body>
</html>
