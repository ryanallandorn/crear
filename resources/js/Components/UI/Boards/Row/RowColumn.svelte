<script>
    // resources/js/Components/UI/Boards/Row/RowColumn.svelte

    import KanbanCard from '@components/UI/Boards/Card/CardInstance.svelte';

    export let column;
    export let isCollapsed = false;

    function handleDrop(event) {
        if (isCollapsed) return;

        const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const { card, sourceColumnId } = dragData;

        column.cards = [...column.cards, card];

        const removeEvent = new CustomEvent('moveCard', {
            detail: { cardId: card.id, sourceColumnId },
            bubbles: true,
        });
        event.currentTarget.dispatchEvent(removeEvent);
    }
</script>

<div
    class={`flex flex-col p-4 bg-gray-100 rounded shadow-md transition-all ${isCollapsed ? 'w-10 overflow-hidden' : 'w-full'}`}
    on:dragover|preventDefault
    on:drop={handleDrop}
    data-column-id={column.id}
>
    {#if isCollapsed}
        <div class="text-center text-sm font-medium text-gray-500 rotate-90">{column.name}</div>
    {:else}
        <div class="text-lg font-semibold mb-4">{column.name}</div>

        {#if column.cards.length > 0}
            <div class="space-y-4">
                {#each column.cards as card (card.id)}
                    <KanbanCard {card} sourceColumnId={column.id} />
                {/each}
            </div>
        {:else}
            <div class="text-gray-500 text-sm italic">No cards available in this column.</div>
        {/if}

        <button class="mt-4 p-2 text-white bg-blue-500 rounded">Add Card</button>
    {/if}
</div>
