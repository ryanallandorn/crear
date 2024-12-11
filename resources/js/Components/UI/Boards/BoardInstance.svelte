<script>

    // resources/js/Components/UI/Boards/BoardInstance.svelte
    
    import BoardToolbar from '@components/UI/Boards/Toolbar/Toolbar.svelte';
    import BoardHeader from '@components/UI/Boards/Header/Header.svelte';
    import BoardRowInstance from '@components/UI/Boards/Row/RowInstance.svelte';
    import { writable } from 'svelte/store';
    
    // Create a store for collapsed columns
    const collapsedColumnsStore = writable(new Set());
    
    // Function to update the store
    const updateCollapsedColumnsStore = (columnId, isCollapsed) => {
        collapsedColumnsStore.update(columns => {
            const newColumns = new Set(columns);
            if (isCollapsed) {
                newColumns.add(columnId);
            } else {
                newColumns.delete(columnId);
            }
            console.log('updateStore', newColumns);
            return newColumns;
        });
    };
    
    // Handle column toggle from header
    const handleBoardColumnToggle = (event) => {
        const { columnId, isCollapsed } = event.detail;
        updateCollapsedColumnsStore(columnId, isCollapsed);
    };
    
    const rows = [
        {
            name: 'Feature',
            columns: {
                backlog: {
                    name: 'Backlog',
                    cards: [
                        { id: 1, title: 'Card 1', description: 'Description 1' },
                        { id: 2, title: 'Card 2', description: 'Description 2' },
                    ],
                },
                inprogress: { name: 'In Progress', cards: [] },
                testing: { name: 'Testing', cards: [] },
                done: { name: 'Done', cards: [] },
            },
        },
        {
            name: 'Tasks',
            columns: {
                backlog: {
                    name: 'Backlog',
                    cards: [
                        { id: 3, title: 'Task 1', description: 'Description 1' },
                        { id: 4, title: 'Task 2', description: 'Description 2' },
                    ],
                },
                inprogress: { name: 'In Progress', cards: [] },
                testing: { name: 'Testing', cards: [] },
                done: { name: 'Done', cards: [] },
            },
        },
    ];
    
</script>

<div class="g-wrap">
    <BoardToolbar />
    <div id="root" class="wx-material-theme">
        <div class="wx-kanban">
            <div class="wx-content-wrapper p-6 bg-gray-100">
                <div class="wx-content">
                    <BoardHeader 
                        {rows} 
                        collapsedColumns={$collapsedColumnsStore}
                        on:toggleBoardColumn={handleBoardColumnToggle} 
                    />
                    {#each rows as row}
                        <BoardRowInstance 
                            {row} 
                            collapsedColumns={$collapsedColumnsStore}
                        />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>