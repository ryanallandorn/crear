<script>
    // resources/js/Components/Fields/Text.svelte
    
    import { t } from 'svelte-i18n';
    
    export let form; // Accept the form object as a prop
    export let id = null;
    export let name = null;
    export let attributes = {};
    export let className = ''; // Additional classes for the input
    export let label = ''; // Default label for the input field
    </script>
    
    <div class="w-full max-w-sm min-w-[200px]">
        <input
            type="text"
            {...(id ? { id } : {})}
            {...(name ? { name } : {})}
            {...(Object.keys(attributes).length ? attributes : {})}
            bind:value={form[name]}
            placeholder={label}
            class={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${className}`}
        />
        {#if form.errors && form.errors[name]} <!-- Dynamically check for errors on the field -->
            <div class="text-red-500 text-sm mt-1">{form.errors[name]}</div>
        {/if}
    </div>
    