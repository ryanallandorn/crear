<script>
    // resources/js/Components/UI/Boards/Card/CardInstance.svelte
    
        export let card;
        export let sourceColumnId; // Pass this from the parent RowColumn
    
        function handleDragStart(event) {
            // Include both card data and source column ID in the drag event
            const dragData = {
                card,
                sourceColumnId,
            };
            event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
        }
    </script>
    
    <div
        class="p-4 bg-white shadow-md rounded cursor-move"
        draggable="true"
        on:dragstart={handleDragStart}
    >
        <div class="text-sm font-medium">{card.title}</div>
        <div class="text-xs text-gray-500">{card.description}</div>
    </div>
    