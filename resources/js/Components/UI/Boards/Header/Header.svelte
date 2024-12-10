<script>
    // resources/js/Components/UI/Boards/Header/Header.svelte

    import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-svelte';

    export let rows;
    export let collapsedColumns;
    export let toggleColumn;

    let uniqueColumns = Object.keys(rows[0].columns);

    function isCollapsed(columnId) {
        return collapsedColumns.has(columnId);
    }
</script>

<div
    class="grid w-full gap-4 bg-gray-100 border-b"
    style="grid-template-columns: repeat({uniqueColumns.length}, minmax(0, 1fr));"
>
    {#each uniqueColumns as columnId}
        <div
            class="flex items-center justify-between p-4 bg-white rounded shadow-md"
            data-id={columnId}
            data-column-header={columnId}
        >
            <!-- Collapse/Expand Icon -->
            <div
                class="cursor-pointer"
                data-action="collapse"
                on:click={() => toggleColumn(columnId)}
            >
                {#if isCollapsed(columnId)}
                    <ChevronRight class="text-gray-500 w-5 h-5" />
                {:else}
                    <ChevronLeft class="text-gray-500 w-5 h-5" />
                {/if}
            </div>

            <!-- Column Name -->
            {#if !isCollapsed(columnId)}
                <div class="font-medium text-center flex-grow" data-action="rename">
                    {rows[0].columns[columnId].name}
                </div>
            {/if}

            <!-- More Options Icon -->
            <div class="cursor-pointer" data-menu-id={columnId}>
                <MoreHorizontal class="text-gray-500 w-5 h-5" />
            </div>
        </div>
    {/each}
</div>
