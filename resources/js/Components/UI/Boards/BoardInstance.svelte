<script>
    // resources/js/Components/UI/Boards/BoardInstance.svelte

    import BoardToolbar from '@components/UI/Boards/Toolbar/Toolbar.svelte';
    import BoardHeader from '@components/UI/Boards/Header/Header.svelte';
    import BoardRowInstance from '@components/UI/Boards/Row/RowInstance.svelte';

    const columns = [
        { id: 'backlog', name: 'Backlog' },
        { id: 'inprogress', name: 'In Progress' },
        { id: 'testing', name: 'Testing' },
        { id: 'done', name: 'Done' },
    ];

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

    <div id="root" class="wx-material-theme">
        <div class="wx-kanban svelte-1lcmu6i" data-wx-widget="wx-kanban">
            <div class="wx-content-wrapper svelte-1lcmu6i p-6" data-kanban-id="wx-kanban-content">
                <div class="wx-content svelte-1lcmu6i" data-kanban-id="wx-kanban-scrollable-content">
                    <BoardHeader {rows} {collapsedColumns} {toggleColumn} />
                    {#each rows as row}
                        <BoardRowInstance {row}></BoardRowInstance>
                    {/each}
                </div>
            </div>
            <div class="wx-sidebar svelte-hklxkj" data-kanban-id="wx-kanban-editor">
                <div class="wx-editor sidebar main svelte-cokqxp" data-kanban-id="wx-kanban-editor"></div>
            </div>
        </div>
        <div class="wx-notices svelte-ervf1h"></div>
    </div>
</div>
