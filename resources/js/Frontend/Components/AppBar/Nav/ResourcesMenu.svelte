<script>
    import { t } from 'svelte-i18n';
    import { route } from "ziggy-js";
    // import LogoIcon from '@components/Branding/LogoIcon.svelte';
    // import FlyoutFullWidth from '@components/Menus/Flyout/FullWidth.svelte';
    // import ServicesMenu from '@frontend-components/AppBar/Nav/ServicesMenu.svelte';

    // let currentRoute = route().current();
    // const isActiveRoute = (name) => currentRoute === name;
</script>


<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
    <!-- Example columns -->
    <div class="grid grid-cols-2 gap-x-6 sm:gap-x-8">
        <div>
            <h3 class="text-sm font-medium text-gray-500">{$t('Servicios')}</h3>
            <div class="mt-6 flow-root">
                <div class="-my-2">
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">About</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Customers</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Press</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Careers</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Privacy</a>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-sm font-medium text-gray-500">Resources</h3>
            <div class="mt-6 flow-root">
                <div class="-my-2">
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Community</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Partners</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Guides</a>
                    <a href={'#'} class="flex gap-x-4 py-2 text-sm font-semibold text-gray-900">Webinars</a>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
        <h3 class="sr-only">Recent posts</h3>
        <article class="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
            <div class="relative flex-none">
                <img class="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-video sm:h-32 lg:h-auto" 
                     src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=3603&q=80" alt="">
            </div>
            <div>
                <div class="flex items-center gap-x-4">
                    <time datetime="2023-03-16" class="text-sm text-gray-600">Mar 16, 2023</time>
                    <a href={'#'} class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
                </div>
                <h4 class="mt-2 text-sm font-semibold text-gray-900">
                    <a href={'#'}>
                        <span class="absolute inset-0"></span>
                        Boost your conversion rate
                    </a>
                </h4>
                <p class="mt-2 text-sm text-gray-600">Et et dolore officia quis nostrud esse aute cillum irure do esse.</p>
            </div>
        </article>
        <article class="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch">
            <div class="relative flex-none">
                <img class="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-video sm:h-32 lg:h-auto"
                     src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=3270&q=80" alt="">
            </div>
            <div>
                <div class="flex items-center gap-x-4">
                    <time datetime="2023-03-10" class="text-sm text-gray-600">Mar 10, 2023</time>
                    <a href={'#'} class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">Sales</a>
                </div>
                <h4 class="mt-2 text-sm font-semibold text-gray-900">
                    <a href={'#'}>
                        <span class="absolute inset-0"></span>
                        How to use search engine optimization to drive sales
                    </a>
                </h4>
                <p class="mt-2 text-sm text-gray-600">Optio cum necessitatibus dolor voluptatum provident commodi et.</p>
            </div>
        </article>
    </div>
</div>