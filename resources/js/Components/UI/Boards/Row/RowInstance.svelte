<script>

// resources/js/Components/UI/Boards/Row/RowInstance.svelte

    import RowHeader from '@components/UI/Boards/Row/RowHeader.svelte';
    import RowContent from '@components/UI/Boards/Row/RowContent.svelte';
    import RowColumn from '@components/UI/Boards/Row/RowColumn.svelte';

    export let row;
    export let collapsedColumns;

    let rowName = row.name;
    let isCollapsed = false;

    // Make columnsWithIds reactive by declaring it with let
    let columnsWithIds = Object.entries(row.columns).map(([key, column], colIndex) => ({
        id: `${row.name.toLowerCase().replace(/\s+/g, '')}-${key}-${colIndex}`,
        ...column,
        cards: column.cards.map((card, cardIndex) => ({
            ...card,
            id: `${row.name.toLowerCase().replace(/\s+/g, '')}-${cardIndex}`,
        })),
    }));

    function toggleCollapse() {
        isCollapsed = !isCollapsed;
    }

    function moveCard(event) {
        const { cardId, sourceColumnId, targetColumnId } = event.detail;
        
        // Find source column
        const sourceColumn = columnsWithIds.find((col) => col.id === sourceColumnId);
        if (!sourceColumn) return;

        // Remove card from source column
        sourceColumn.cards = sourceColumn.cards.filter((card) => card.id !== cardId);
        
        // Force reactivity update
        columnsWithIds = [...columnsWithIds];
    }
</script>

<div class="wx-row w-full" on:moveCard={moveCard}>
    <RowHeader {rowName} {isCollapsed} on:toggle={toggleCollapse} />

    {#if !isCollapsed}
        <RowContent>
            {#if columnsWithIds.length > 0}
                <div
                    class="grid w-full gap-4 p-4"
                    style="grid-template-columns: repeat({columnsWithIds.length}, minmax(0, 1fr));"
                >
                    {#each columnsWithIds as column (column.id)}
                        <RowColumn 
                            {column} 
                            isCollapsed={collapsedColumns.has(column.id)} 
                        />
                    {/each}
                </div>
            {:else}
                <div class="p-4 text-gray-500 text-center">No columns available for this row.</div>
            {/if}
        </RowContent>
    {/if}
</div>