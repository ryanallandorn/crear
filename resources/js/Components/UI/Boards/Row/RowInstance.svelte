<script>
    // resources/js/Components/UI/Boards/Row/RowInstance.svelte

    import RowHeader from '@components/UI/Boards/Row/RowHeader.svelte';
    import RowContent from '@components/UI/Boards/Row/RowContent.svelte';
    import RowColumn from '@components/UI/Boards/Row/RowColumn.svelte';

    export let row;
    export let collapsedColumns;

    let isRowCollapsed = false;
    let columnsWithIds = [];

    // Process columns to ensure they have baseColumnId, uniqueColumnId, and pass collapse state
    $: if (row && row.columns) {
        columnsWithIds = Object.entries(row.columns).map(([key, column]) => {
            const baseColumnId = column.id || key; // Generic identifier (e.g., 'testing')
            const uniqueColumnId = `${row.name.toLowerCase().replace(/\s+/g, '')}-${baseColumnId}`; // Unique across swimlanes
            return {
                ...column,
                baseColumnId,
                uniqueColumnId,
                isCollapsed: collapsedColumns.has(baseColumnId), // Check baseColumnId in collapsedColumns
            };
        });
    }

    // Generate grid template columns dynamically
    $: gridTemplateColumns = columnsWithIds
        .map(column => (column.isCollapsed ? '50px' : '1fr')) // Smaller width for collapsed columns
        .join(' ');

    const toggleBoardRowCollapse = () => {
        isRowCollapsed = !isRowCollapsed;
    };

    $: {
        // Log collapsed columns for debugging
        console.log('collapsedColumns changed:', Array.from(collapsedColumns));
    }
</script>

<div class="wx-row w-full">
    <RowHeader 
        rowName={row.name} 
        isCollapsed={isRowCollapsed} 
        on:toggleBoardRow={toggleBoardRowCollapse} 
    />

    {#if !isRowCollapsed}
        <RowContent>
            <div
                class="grid w-full gap-4 p-4"
                style="grid-template-columns: {gridTemplateColumns};"
            >
                {#each columnsWithIds as column (column.uniqueColumnId)}
                    <RowColumn 
                        {column}
                        isBoardColumnCollapsed={collapsedColumns.has(column.baseColumnId)}
                    />
                {/each}
            </div>
        </RowContent>
    {/if}
</div>
