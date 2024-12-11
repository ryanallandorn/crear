<script>

    // resources/js/Components/UI/Boards/Header/Header.svelte

    import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let rows;
    export let collapsedColumns; // Receive collapsed columns as a prop

    // Precompute collapsed state for each column
    $: precomputedColumns = Object.keys(rows[0].columns).map(columnId => ({
        id: columnId,
        isCollapsed: collapsedColumns.has(columnId),
    }));

    // Generate grid template columns dynamically
    $: gridTemplateColumns = precomputedColumns
        .map(column => (column.isCollapsed ? '50px' : '1fr')) // Smaller width for collapsed columns
        .join(' ');

    const dispatchBoardColumnToggleChange = (columnId) => {
        const isCollapsed = collapsedColumns.has(columnId);
        dispatch('toggleBoardColumn', { columnId, isCollapsed: !isCollapsed }); // Notify parent of the change
    };

</script>

<div
    class="grid w-full gap-4 bg-gray-100 border-b"
    style="grid-template-columns: {gridTemplateColumns};"
>
    {#each precomputedColumns as column}
        <div
            class="boardHeaderColumn flex items-center justify-between p-4 bg-white rounded shadow-md"
            class:boardColumnCollapsed={column.isCollapsed}
            data-column-header={column.id}
        >
            <button
                class="cursor-pointer"
                on:click={() => dispatchBoardColumnToggleChange(column.id)}
                aria-label={column.isCollapsed ? "Expand column" : "Collapse column"}
            >
                {#if column.isCollapsed}
                    <ChevronRight class="text-gray-500 w-5 h-5" />
                {:else}
                    <ChevronLeft class="text-gray-500 w-5 h-5" />
                {/if}
            </button>
            {#if !column.isCollapsed}
                <div class="font-medium text-center flex-grow">
                    {rows[0].columns[column.id].name}
                </div>
                <button class="cursor-pointer" aria-label="More options">
                    <MoreHorizontal class="text-gray-500 w-5 h-5" />
                </button>
            {/if}
        </div>
    {/each}
</div>
