
<script>
  import { t } from 'svelte-i18n';

  import { route } from 'ziggy-js';
  
  import { ChevronRight } from 'lucide-svelte';
    import MasonryGallery from '@/Frontend/Components/Blocks/MasonryGallery.svelte';
  
  
  </script>
  
  
  
  
  <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
  
      <div class="mx-auto max-w-2xl text-center mb-12">
          <h2 class="principal-text-color text-4xl font-semibold sm:text-5xl">
              <a href={route('portfolio')} class="flex items-center justify-center hover-text-indigo">
              {$t('Portfolio')}
              <ChevronRight class="ml-2" />
              </a>
          </h2>
          <p class="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
      </div>

      <MasonryGallery />
      
  </div>