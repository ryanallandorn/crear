<script>

// resources/js/Components/Forms/FormSection.svelte


    import { createEventDispatcher } from 'svelte';
    import SectionTitle from '@components/SectionTitle.svelte';

    export let submit;

    const dispatch = createEventDispatcher();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch('submit');
    }
</script>

<div class="row g-3">
    <div class="col-md-3">
        <SectionTitle>
            <span slot="title">
                <slot name="title"></slot>
            </span>
            <span slot="description">
                <slot name="description"></slot>
            </span>
        </SectionTitle>
    </div>
    <div class="col-md-9 mt-3">
        <form on:submit|preventDefault={handleSubmit} class="card">
            <div class={`p-4 ${$$slots.actions ? 'rounded-top' : 'rounded'}`}>
                <div class="row g-3">
                    <slot name="form"></slot>
                </div>
            </div>
            {#if $$slots.actions}
                <div class="d-flex justify-content-end p-3 rounded-bottom card-footer">
                    <slot name="actions"></slot>
                </div>
            {/if}
        </form>
    </div>
</div>
