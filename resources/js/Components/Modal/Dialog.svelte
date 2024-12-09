<svelte:options accessors />
<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { X } from 'lucide-svelte';

    const dispatch = createEventDispatcher();

    let open = false;
    let modal;

    // Updated closeModal to accept an optional delay
    export let closeModal = (delay = 0) => {
        if (delay > 0) {
            setTimeout(() => {
                open = false;
                console.log(`Modal closed after ${delay}ms.`);
            }, delay);
        } else {
            open = false;
            console.log("Modal closed.");
        }
    };

    const openModal = () => {
        open = true;
        console.log("Modal opened.");
    };

    const handleBackdropClick = (event) => {
        if (event.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    };

    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    $: if (open && modal) {
        modal.focus();
    }

    onMount(() => {
        console.log("ModalDialog mounted.");
    });
</script>

<div on:click="{openModal}">
    <slot name="trigger"></slot>
</div>

{#if open}
    <div
        class="modal-backdrop fixed inset-0 bg-black/40 flex items-center justify-center transition-opacity"
        on:click={handleBackdropClick}
        aria-hidden="true"
    >
        <div
            class="relative w-full max-w-lg p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl transition-all"
            on:keydown="{handleKeydown}"
            tabindex="0"
            bind:this={modal}
        >
            <div class="relative flex items-center justify-between pb-4 mb-4 border-b rounded-t dark:border-gray-800">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    <slot name="title"></slot>
                </h3>
                <button
                    class="text-gray-500 hover:text-gray-800 focus:outline-none ml-auto"
                    on:click={() => closeModal()}
                    aria-label="Close modal"
                >
                    <X size="24" />
                </button>
            </div>

            <div>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
{/if}
