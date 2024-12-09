<script>
    import { createEventDispatcher } from 'svelte';

    export let type = 'button'; // Default: 'button'
    export let disabled = false; // Default: not disabled
    export let cssClass = ''; // Additional CSS classes

    const dispatch = createEventDispatcher();

    // Handle clicks with conditional preventDefault logic
    const handleClick = (event) => {
        if (type !== 'submit') {
            event.preventDefault(); // Prevent default only for non-submit buttons
        }

        // Dispatch the click event so parent components can listen to it
        dispatch('click', event);
    };
</script>

<button
    type={type}
    class={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${cssClass}`}
    disabled={disabled}
    on:click={handleClick}
>
    <slot></slot> <!-- Render button content -->
</button>
