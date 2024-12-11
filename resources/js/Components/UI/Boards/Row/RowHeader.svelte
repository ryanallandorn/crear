<script>

// resources/js/Components/UI/Boards/Row/RowHeader.svelte
    
    export let rowName = '';
    export let isCollapsed = false;

    import { createEventDispatcher } from 'svelte';
    import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-svelte';

    const dispatch = createEventDispatcher();

    function handleRowToggle() {
        dispatch('toggleBoardRow');
    }
</script>

<div
    class="wx-label collapsable svelte-9z9yku"
    data-row-header={rowName}
>
    <button 
        type="button"
        class="wx-label-icon svelte-9z9yku"
        on:click={handleRowToggle}
    >
        {#if isCollapsed}
            <ChevronUp class="wx-icon" />
        {:else}
            <ChevronDown class="wx-icon" />
        {/if}
    </button>
    <div data-menu-ignore="true">
        <div class="wx-menu svelte-9z9yku">
            <MoreHorizontal class="wx-icon text-2xl" />
        </div>
    </div>
    <div class="wx-label-text svelte-9z9yku">{rowName}</div>
    <div class="wx-label-line collapsable svelte-9z9yku"></div>
</div>
