<script>
    import BoardCardInstance from '@components/UI/Boards/Card/CardInstance.svelte';
    import BoardColumnAddCard from '@components/UI/Boards/Row/AddCard.svelte';
    import { spring } from 'svelte/motion';

    export let column;
    export let isCollapsed;

    let dropTargetIndex = -1;
    let columnElement;
    let cardElements = [];

    const dropZoneHeight = spring(0, {
        stiffness: 0.2,
        damping: 0.4
    });

    let draggedCardId = null;
    let draggedCardIndex = -1;

    function getDropTargetIndex(event, columnRect) {
        const mouseY = event.clientY - columnRect.top;

        // Filter out the dragged card if we're in the same column
        const visibleCards = cardElements.filter((_, index) => index !== draggedCardIndex);
        
        if (visibleCards.length === 0) {
            return 0;
        }

        for (let i = 0; i < visibleCards.length; i++) {
            const card = visibleCards[i];
            const cardRect = card.getBoundingClientRect();
            const cardBottom = cardRect.top + cardRect.height - columnRect.top;

            if (mouseY > cardRect.top - columnRect.top && mouseY <= cardBottom) {
                // Adjust index based on whether we're before or after the dragged card
                const actualIndex = i + (i >= draggedCardIndex ? 1 : 0);
                return actualIndex;
            }
        }

        if (mouseY < visibleCards[0]?.getBoundingClientRect().top - columnRect.top) {
            return 0;
        }

        // If we're at the bottom, consider the dragged card's original position
        return column.cards.length;
    }

    function handleDragStart(cardId, index) {
        draggedCardId = cardId;
        draggedCardIndex = index;
    }

    function handleDragEnd() {
        draggedCardId = null;
        draggedCardIndex = -1;
        dropTargetIndex = -1;
        dropZoneHeight.set(0);
    }

    function handleDragOver(event) {
        event.preventDefault();
        if (isCollapsed) return;

        const columnRect = columnElement.getBoundingClientRect();
        const newDropTargetIndex = getDropTargetIndex(event, columnRect);

        if (newDropTargetIndex !== dropTargetIndex) {
            dropTargetIndex = newDropTargetIndex;
            dropZoneHeight.set(80);
        }
    }

    function handleDragLeave(event) {
        const columnRect = columnElement.getBoundingClientRect();
        const { clientX, clientY } = event;

        if (
            clientX < columnRect.left ||
            clientX > columnRect.right ||
            clientY < columnRect.top ||
            clientY > columnRect.bottom
        ) {
            dropTargetIndex = -1;
            dropZoneHeight.set(0);
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        if (isCollapsed) return;

        const dragData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const { card, sourceColumnId } = dragData;

        const newCards = [...column.cards];
        
        // If same column, remove the card from its original position first
        if (sourceColumnId === column.id) {
            newCards.splice(draggedCardIndex, 1);
            // Adjust target index if we're dropping after the original position
            const adjustedTargetIndex = dropTargetIndex > draggedCardIndex ? dropTargetIndex - 1 : dropTargetIndex;
            newCards.splice(adjustedTargetIndex, 0, card);
        } else {
            newCards.splice(dropTargetIndex, 0, card);
        }
        
        column.cards = newCards;

        const moveEvent = new CustomEvent('moveCard', {
            detail: {
                cardId: card.id,
                sourceColumnId,
                targetColumnId: column.id,
                targetIndex: dropTargetIndex
            },
            bubbles: true
        });
        event.currentTarget.dispatchEvent(moveEvent);

        draggedCardId = null;
        draggedCardIndex = -1;
        dropTargetIndex = -1;
        dropZoneHeight.set(0);
    }

    function handleAddCard(event) {
        const { newCard } = event.detail;
        column.cards = [...column.cards, newCard];
    }
</script>

<div
    class={`boardRowColumn relative ${isCollapsed ? 'hidden' : ''}`}
    bind:this={columnElement}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
>
    <div class="text-lg font-semibold mb-4">{column.name}</div>

    <div class="space-y-4 min-h-[100px] flex flex-col">
        {#if column.cards.length === 0 && dropTargetIndex === 0}
            <!-- Drop zone for empty columns only when dragging over -->
            <div
                class="border-2 border-dashed border-blue-400 rounded bg-blue-50 transition-all"
                style="height: {$dropZoneHeight}px;"
            />
        {:else if column.cards.length > 0}
            <!-- Initial drop zone -->
            {#if dropTargetIndex === 0}
                <div
                    class="border-2 border-dashed border-blue-400 rounded bg-blue-50 transition-all mb-4"
                    style="height: {$dropZoneHeight}px;"
                />
            {/if}

            {#each column.cards as card, index (card.id)}
                <div bind:this={cardElements[index]}>
                    {#if card.id === draggedCardId}
                        <div
                            class="border-2 border-dashed border-gray-400 rounded bg-gray-50 transition-all"
                            style="height: 80px;"
                        />
                    {:else}
                        <BoardCardInstance 
                            {card} 
                            sourceColumnId={column.id}
                            on:dragstart={() => handleDragStart(card.id, index)}
                            on:dragend={handleDragEnd}
                        />
                    {/if}

                    <!-- Drop zone after the card -->
                    {#if dropTargetIndex === index + 1}
                        <div
                            class="border-2 border-dashed border-blue-400 rounded bg-blue-50 transition-all mt-4"
                            style="height: {$dropZoneHeight}px;"
                        />
                    {/if}
                </div>
            {/each}
        {/if}
    </div>

    <BoardColumnAddCard on:addCard={handleAddCard} />
</div>

<style>
    .boardRowColumn {
        min-height: 200px;
        display: flex;
        flex-direction: column;
    }
</style>