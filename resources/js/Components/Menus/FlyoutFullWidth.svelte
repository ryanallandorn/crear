<script>
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { X } from 'lucide-svelte';

    export let open = false; // Controls modal visibility
    const dispatch = createEventDispatcher();

    // Combined transition for scale and fly
    function flyScale(node, { y = 50, scale = 0.95, duration = 300, easing = cubicOut }) {
        return {
            duration,
            easing,
            css: t => `
                transform: translateY(${y * (1 - t)}px) scale(${scale + (1 - scale) * t});
                opacity: ${t};
            `
        };
    }

    // Close the modal
    const closeModal = () => {
        dispatch('close');
        open = false;
    };

    // Focus management
    let modal;
    $: if (open && modal) {
        modal.focus();
    }
</script>

<!-- Trigger Slot -->
<div on:click="{() => (open = true)}">
    <slot name="trigger"></slot>
</div>

{#if open}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 bg-gray-500/75 transition-opacity"
        transition:fade="{{ duration: 300, easing: cubicOut }}"
        on:click="{closeModal}"
        aria-hidden="true"
    >
    </div>

    <!-- Modal Dialog -->
    <div
        class="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl transition-all"
            transition:flyScale="{{ y: 50, scale: 0.95, duration: 300, easing: cubicOut }}"
            on:keydown="{(e) => e.key === 'Escape' && closeModal()}" 
            tabindex="0"
            bind:this={modal}
        >
            <!-- Close Button -->
            <button
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                on:click="{closeModal}"
                aria-label="Close modal"
            >
                <X size="24" />
            </button>

            <!-- Content Slot -->
            <slot name="content"></slot>
        </div>
    </div>
{/if}

<style>
    /* Prevent background scrolling when the modal is open */
    :global(body.modal-open) {
        overflow: hidden;
    }
</style>
