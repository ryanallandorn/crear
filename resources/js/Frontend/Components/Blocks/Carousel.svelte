<script>
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  export let slidesPerPage = 3; // Number of slides to display per page
  export let scrollCount = 1;  // Number of slides to scroll at once
  export let infinite = false; // Enable infinite scrolling
  let currentPage = 0;
  let totalPages = 0;
  let slottedItems = [];
  let containerRef;
  let isDragging = false;
  let startX = 0;
  let deltaX = 0;
  let cursorStyle = 'default'; // Default cursor style

  // Function to generate grid classes based on slidesPerPage
  function getGridClasses(numSlides) {
      const baseClasses = 'grid gap-6 my-6 py-6';

      // For mobile, always show 1 column
      let gridClasses = 'grid-cols-1';

      // For larger screens, respect slidesPerPage
      if (numSlides >= 2) {
          gridClasses += ' sm:grid-cols-2';
      }
      if (numSlides >= 3) {
          gridClasses += ' md:grid-cols-3';
      }
      if (numSlides >= 4) {
          gridClasses += ' lg:grid-cols-4';
      }

      return `${baseClasses} ${gridClasses}`;
  }

  onMount(() => {
      slottedItems = Array.from(containerRef.querySelectorAll(':scope > li'));
      totalPages = Math.ceil(slottedItems.length / slidesPerPage);
      updateVisibility();
  });

  function updateVisibility() {
      const startIdx = currentPage * slidesPerPage;
      const endIdx = startIdx + slidesPerPage;

      slottedItems.forEach((item, index) => {
          item.style.display = (index >= startIdx && index < endIdx) ? 'block' : 'none';
      });
  }

  function goToPage(pageIndex) {
      if (infinite) {
          currentPage = (pageIndex + totalPages) % totalPages;
      } else {
          if (pageIndex < 0 || pageIndex >= totalPages) return;
          currentPage = pageIndex;
      }
      updateVisibility();
  }

  function goToPreviousPage() {
      goToPage(currentPage - scrollCount);
  }

  function goToNextPage() {
      goToPage(currentPage + scrollCount);
  }

  function handleTouchStart(event) {
      isDragging = true;
      startX = event.touches ? event.touches[0].clientX : event.clientX;
      cursorStyle = 'grabbing'; // Change cursor to grabbing
  }

  function handleTouchMove(event) {
      if (!isDragging) return;
      const currentX = event.touches ? event.touches[0].clientX : event.clientX;
      deltaX = currentX - startX;
  }

  function handleTouchEnd() {
      if (!isDragging) return;
      isDragging = false;
      cursorStyle = 'default'; // Reset cursor to default

      if (deltaX > 50) {
          goToPreviousPage(); // Swipe right
      } else if (deltaX < -50) {
          goToNextPage(); // Swipe left
      }
  }
</script>

<div
  class="carousel-container relative w-full"
  style="cursor: {cursorStyle};"
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:mousedown={handleTouchStart}
  on:mousemove={handleTouchMove}
  on:mouseup={handleTouchEnd}
  on:mouseleave={handleTouchEnd}
>
  <!-- Carousel Arrows -->
  {#if totalPages > 1}
      <button
          on:click={goToPreviousPage}
          class="absolute left-[-3rem] top-[40%] transform -translate-y-1/2 w-12 h-12 bg-opacity-70 hover:bg-opacity-90 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Previous Page"
      >
          <ChevronLeft class="w-6 h-6 mx-auto text-indigo-600" />
      </button>

      <button
          on:click={goToNextPage}
          class="absolute right-[-3rem] top-[40%] transform -translate-y-1/2 w-12 h-12 bg-opacity-70 hover:bg-opacity-90 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Next Page"
      >
          <ChevronRight class="w-6 h-6 mx-auto text-indigo-600" />
      </button>
  {/if}

  <ul
      bind:this={containerRef}
      role="list"
      class={getGridClasses(slidesPerPage)}
  >
      <slot />
  </ul>

  {#if totalPages > 1}
      <nav class="flex items-center justify-center mt-4" aria-label="Carousel Pages">
          <ol role="list" class="flex space-x-3">
              {#each Array(totalPages) as _, i}
                  <li>
                      <button
                          on:click={() => goToPage(i)}
                          class="focus:outline-none"
                          aria-label={`Go to slide ${i + 1}`}
                          aria-current={currentPage === i ? 'page' : undefined}
                      >
                          {#if currentPage === i}
                              <span class="relative flex items-center justify-center" aria-current="step">
                                  <span class="absolute flex w-5 h-5 p-px" aria-hidden="true">
                                      <span class="w-full h-full rounded-full border-2 border-indigo-500"></span>
                                  </span>
                                  <span class="relative block w-2.5 h-2.5 rounded-full bg-transparent" aria-hidden="true"></span>
                              </span>
                          {:else}
                              <span class="block w-2.5 h-2.5 rounded-full bg-gray-200 hover:bg-gray-400 transition-all duration-200"></span>
                          {/if}
                      </button>
                  </li>
              {/each}
          </ol>
      </nav>
  {/if}
</div>

<style>
  .carousel-container {
      width: 100%;
      touch-action: pan-y;
  }
</style>
