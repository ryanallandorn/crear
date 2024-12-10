<script>
    // resources/js/Components/UI/Boards/Row/AddCard.svelte

    import { createEventDispatcher } from 'svelte';
    import { Plus } from 'lucide-svelte';

    const dispatch = createEventDispatcher();

    function handleAddCard() {
        const newCard = {
            id: Date.now(),
            title: 'New Card',
            description: 'New Description',
        };

        // Dispatch an event to notify the parent
        dispatch('addCard', { newCard });
    }
</script>

<div class="wx-controls-wrapper flex items-center mt-4">
    <div
        class="wx-add-card-btn flex items-center space-x-2 cursor-pointer group"
        on:click={handleAddCard}
    >
        <Plus class="wx-icon w-5 h-5 text-gray-600 group-hover:text-blue-500" />
        <span class="wx-add-card-tip text-gray-600 text-sm hidden group-hover:inline">
            Add new card...
        </span>
    </div>
</div>

<style>
    .wx-controls-wrapper {
        justify-content: flex-start;
    }

    .wx-add-card-btn {
        display: flex;
        align-items: center;
        transition: all 0.2s ease-in-out;
    }

    .wx-add-card-btn:hover .wx-icon {
        transform: scale(1.2);
    }

    .wx-add-card-tip {
        white-space: nowrap;
    }
</style>
