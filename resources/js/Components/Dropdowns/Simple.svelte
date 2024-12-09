<script>

// resources/js/Components/Dropdowns/Simple.svelte

    import { onMount } from 'svelte';
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
    }

    function closeMenu() {
        menuOpen = false;
    }
</script>

<div class="relative inline-block text-left">
    <div>
        <button
            type="button"
            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            on:click={toggleMenu}>
            Options
            <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                    fill-rule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>

    {#if menuOpen}
        <div
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 transform opacity-100 scale-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
            on:click={closeMenu}>
            <div class="py-1" role="none">
                <a href={'#'} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">Account settings</a>
                <a href={'#'} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">Support</a>
                <a href={'#'} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1">License</a>
                <form method="POST" action="#" role="none">
                    <button
                        type="submit"
                        class="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        role="menuitem"
                        tabindex="-1">
                        Sign out
                    </button>
                </form>
            </div>
        </div>
    {/if}
</div>

<style>
    .transition {
        transition: all 0.1s ease-in-out;
    }
    .transform {
        transform-origin: top right;
    }
    .opacity-100 {
        opacity: 1;
    }
    .opacity-0 {
        opacity: 0;
    }
    .scale-100 {
        transform: scale(1);
    }
    .scale-95 {
        transform: scale(0.95);
    }
</style>
