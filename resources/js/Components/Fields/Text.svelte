<script>
    // resources/js/Components/Fields/Text.svelte

    // make class for filled outline, etc

    import { t } from 'svelte-i18n';

    export let form;
    export let id = null;
    export let name = null;
    export let attributes = {};
    export let fieldWrapperCss = '';
    export let fieldInputCss = '';
    export let label = '';
    export let placeholder = '';
</script>


<div class={`relative w-full max-w-sm ${fieldWrapperCss}`}>
    <input 
        {...(id ? { id } : {})}
        {...(name ? { name } : {})}
        {...(Object.keys(attributes).length ? attributes : {})}
        bind:value={form[name]}
        class={`peer input-solid-primary  ${fieldInputCss}` }
        placeholder="{placeholder || $t('Please input your text')}"
    />
{#if label}
    <label 
    for={id}
    class="input-floating-label">
        {label}
    </label>
{/if}
</div>
