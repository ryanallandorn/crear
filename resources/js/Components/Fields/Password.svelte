<script>
    // resources/js/Components/Fields/Password.svelte
    
    import { t } from 'svelte-i18n';
    import { Eye, EyeOff } from 'lucide-svelte';

    export let form; // Accept the form object as a prop
    export let id = 'password'; // Default id for the input field
    export let name = 'password'; // Default name for the input field
    export let attributes = {};
    export let className = '';
    export let fieldInputCss = '';
    export let fieldWrapperCss = '';
    export let label = ''; // Default label for the input field
    export let placeholder = '';
    let showPassword = false; // Reactive variable to toggle password visibility
</script>

<div class={`relative w-full max-w-sm ${fieldWrapperCss}`}>
    {#if showPassword}
        <input
            type="text"
            id={id}
            name={name}
            bind:value={form[name]}
            placeholder={placeholder || $t('Password')}
            class={`peer input-solid-primary ${fieldInputCss}`}
            {...(Object.keys(attributes).length ? attributes : {})}
        />
    {:else}
        <input
            type="password"
            id={id}
            name={name}
            bind:value={form[name]}
            placeholder={placeholder || $t('Password')}
            class={`peer input-solid-primary ${fieldInputCss}`}
            {...(Object.keys(attributes).length ? attributes : {})}
        />
    {/if}
    {#if label}
        <label 
            for={id}
            class="input-floating-label">
            {label}
        </label>
    {/if}

    {#if form.errors && form.errors.password} <!-- Conditionally render password errors -->
        <div class="text-red-500 text-sm mt-1">{form.errors.password}</div>
    {/if}

    <!-- Password visibility toggle button -->
    <button 
        type="button" 
        class="btn-toggle-password-visibility"
        on:click={() => showPassword = !showPassword}
    >
        {#if showPassword}
            <Eye class="w-5 h-5" />
        {:else}
            <EyeOff class="w-5 h-5" />
        {/if}
    </button>
</div>
