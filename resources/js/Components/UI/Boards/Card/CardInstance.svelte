<script>
    export let card;
    export let sourceColumnId;
    let isDragging = false;

    function handleDragStart(event) {
        isDragging = true;
        const dragData = {
            card,
            sourceColumnId,
        };
        event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
        // Add a class to the dragged element
        event.target.classList.add('dragging');
    }

    function handleDragEnd(event) {
        isDragging = false;
        event.target.classList.remove('dragging');
    }
</script>

<div
    class={`p-4 bg-white shadow-md rounded cursor-move transition-opacity duration-200 ${
        isDragging ? 'opacity-0' : 'opacity-100'
    }`}
    draggable="true"
    on:dragstart={handleDragStart}
    on:dragend={handleDragEnd}
>
    <div class="text-sm font-medium">{card.title}</div>
    <div class="text-xs text-gray-500">{card.description}</div>
</div>

<style>
    /* Add these styles to your global CSS or component styles */
    .dragging {
        opacity: 0;
    }
    
    .boardRowColumn {
        min-height: 200px; /* Ensure columns are droppable when empty */
    }
</style>