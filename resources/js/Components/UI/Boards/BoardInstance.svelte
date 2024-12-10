<script>
    // resources/js/Components/UI/Boards/BoardInstance.svelte

    import BoardToolbar from '@components/UI/Boards/Toolbar/Toolbar.svelte';
    import BoardHeader from '@components/UI/Boards/Header/Header.svelte';
    import BoardRowInstance from '@components/UI/Boards/Row/RowInstance.svelte';

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

    let collapsedColumns = new Set();

    function toggleColumn(columnId) {
        if (collapsedColumns.has(columnId)) {
            collapsedColumns.delete(columnId);
        } else {
            collapsedColumns.add(columnId);
        }
    }
</script>

<div class="g-wrap">
    <BoardToolbar />
    <div id="root" class="wx-material-theme ">
        <div class="wx-kanban" data-wx-widget="wx-kanban">
            <div class="wx-content-wrapper p-6 bg-gray-100" data-kanban-id="wx-kanban-content">
                <div class="wx-content" data-kanban-id="wx-kanban-scrollable-content">
                    <BoardHeader {rows} {collapsedColumns} {toggleColumn} />
                    {#each rows as row}
                        <BoardRowInstance {row} {collapsedColumns} />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
