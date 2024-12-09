<script>
    import { onMount } from 'svelte';
    import { ChevronDown, ChevronUp } from 'lucide-svelte';

    export let anchorType = 'link'; // 'link' or 'button'
    export let effect = 'slide';    // 'slide' or 'none'
    export let desktopTrigger = 'click'; // 'click' or 'hover'

    let visible = false;
    let isDesktop = false;
    let mediaQuery;

    onMount(() => {
        mediaQuery = window.matchMedia('(min-width: 1024px)');
        const updateIsDesktop = () => isDesktop = mediaQuery.matches;
        updateIsDesktop();
        mediaQuery.addEventListener('change', updateIsDesktop);
        return () => mediaQuery.removeEventListener('change', updateIsDesktop);
    });

    function toggleFlyout(event) {
        event?.preventDefault();
        visible = !visible;
    }

    function openFlyout(event) {
        event?.preventDefault();
        visible = true;
    }

    function closeFlyout(event) {
        event?.preventDefault();
        visible = false;
    }
</script>

{#if anchorType === 'link'}
    <a
        href={'#'}
        class="nav-link"
        aria-expanded={visible}
        on:click={( !isDesktop || desktopTrigger === 'click' ) ? toggleFlyout : null}
        on:mouseover={( isDesktop && desktopTrigger === 'hover' ) ? openFlyout : null}
        on:mouseleave={( isDesktop && desktopTrigger === 'hover' ) ? closeFlyout : null}
    >
        <slot name="trigger" />
        {#if visible}
            <ChevronUp class="size-5 flex-none text-gray-400" />
        {:else}
            <ChevronDown class="size-5 flex-none text-gray-400" />
        {/if}
    </a>
{:else if anchorType === 'button'}
    <button
        type="button"
        class="flex items-center gap-x-1 text-sm font-semibold text-gray-900"
        aria-expanded={visible}
        on:click={( !isDesktop || desktopTrigger === 'click' ) ? toggleFlyout : null}
        on:mouseover={( isDesktop && desktopTrigger === 'hover' ) ? openFlyout : null}
        on:mouseleave={( isDesktop && desktopTrigger === 'hover' ) ? closeFlyout : null}
    >
        <slot name="trigger" />
        {#if visible}
            <ChevronUp class="size-5 flex-none text-gray-400" />
        {:else}
            <ChevronDown class="size-5 flex-none text-gray-400" />
        {/if}
    </button>
{/if}

{#if effect === 'slide'}
    <div
        class="absolute inset-x-0 top-full w-screen bg-white shadow-lg ring-1 ring-gray-900/5 
               transform origin-top transition-all duration-300 ease-out overflow-hidden bg-white dark:bg-gray-900"
        class:opacity-100={visible}
        class:scale-y-100={visible}
        class:opacity-0={!visible}
        class:scale-y-95={!visible}
        on:mouseleave={( isDesktop && desktopTrigger === 'hover' ) ? closeFlyout : null}
    >
        <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <slot name="content" />
        </div>
    </div>
{:else}
    {#if visible}
        <div class="absolute inset-x-0 top-full w-screen bg-white shadow-lg ring-1 ring-gray-900/5">
            <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <slot name="content" />
            </div>
        </div>
    {/if}
{/if}
