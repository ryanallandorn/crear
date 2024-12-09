
<script>
import { t } from 'svelte-i18n';
import Carousel from '@/Frontend/Components/Blocks/Carousel.svelte';
import { route } from 'ziggy-js';

import { ChevronRight } from 'lucide-svelte';


</script>




<div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">

    <div class="mx-auto max-w-2xl text-center">
        <h2 class="principal-text-color text-4xl font-semibold sm:text-5xl">
            <a href={route('services')} class="flex items-center justify-center hover-text-indigo">
            {$t('Servicios')}
            <ChevronRight class="ml-2" />
            </a>
        </h2>
        <p class="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
    </div>

    <Carousel slidesPerPage={3}>
        <li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-50-default text-center p-4">
        <!-- Slide Content -->
        <h3 class="text-lg font-medium">Slide 1</h3>
        <p class="text-sm text-gray-500">Description for slide 1.</p>
        </li>

        <li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-50-default text-center p-4">
        <h3 class="text-lg font-medium">Slide 2</h3>
        <p class="text-sm text-gray-500">Description for slide 2.</p>
        </li>

        <li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-50-default text-center p-4">
        <h3 class="text-lg font-medium">Slide 3</h3>
        <p class="text-sm text-gray-500">Description for slide 3.</p>
        </li>

        <li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-50-default text-center p-4">
        <h3 class="text-lg font-medium">Slide 4</h3>
        <p class="text-sm text-gray-500">Description for slide 4.</p>
        </li>

        <li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-50-default text-center p-4">
        <h3 class="text-lg font-medium">Slide 4</h3>
        <p class="text-sm text-gray-500">Description for slide 4.</p>
        </li>

        <!-- Add more slides as needed -->
    </Carousel>
    
</div>