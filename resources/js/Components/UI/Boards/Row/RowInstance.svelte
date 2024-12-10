<script>
    // resources/js/Components/UI/Boards/Row/RowInstance.svelte

    import RowHeader from '@components/UI/Boards/Row/RowHeader.svelte';
    import RowContent from '@components/UI/Boards/Row/RowContent.svelte';
    import RowColumn from '@components/UI/Boards/Row/RowColumn.svelte';

    export let row;

    let rowName = row.name;
    let isCollapsed = false;

    function toggleCollapse() {
        isCollapsed = !isCollapsed;
    }

    function moveCard(event) {
        const { cardId, sourceColumnId } = event.detail;

        if (!row.columns[sourceColumnId]) {
            console.error(`Source column with ID "${sourceColumnId}" not found.`);
            return;
        }

        const sourceColumn = row.columns[sourceColumnId];
        sourceColumn.cards = sourceColumn.cards.filter((card) => card.id !== cardId);
    }
</script>

<div
    class="wx-row w-full"
    on:moveCard={moveCard}
>
    <RowHeader {rowName} {isCollapsed} on:toggle={toggleCollapse} />

    {#if !isCollapsed}
        <RowContent>
            {#if row?.columns}
                <div
                    class="grid w-full gap-4 p-4"
                    style="grid-template-columns: repeat({Object.values(row.columns).length}, minmax(0, 1fr));"
                >
                    {#each Object.values(row.columns) as column}
                        <RowColumn {column} />
                    {/each}
                </div>
            {:else}
                <div class="p-4 text-gray-500 text-center">No columns available for this row.</div>
            {/if}
        </RowContent>
    {/if}
</div>
