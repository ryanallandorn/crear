<script>
    // resources/js/Components/Fields/Switch.svelte
    
    import { t } from 'svelte-i18n';
    
    export let form; // Accept the form object as a prop
    export let id = null;
    export let name = null;
    export let attributes = {};
    export let label = ''; // Default label for the input field
    export let fieldWrapperCss = ''; // Additional wrapper CSS
    export let fieldInputCss = ''; // Additional input CSS
    </script>
    
    <div class={`flex items-center space-x-3 ${fieldWrapperCss}`}>
        <div class="relative inline-block w-11 h-5">
            <input 
                type="checkbox"
                {...(id ? { id } : {})}
                {...(name ? { name } : {})}
                {...(Object.keys(attributes).length ? attributes : {})}
                bind:checked={form[name]}
                class={`peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300 ${fieldInputCss}`}
            />
            <label 
                for={id}
                class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
            ></label>
        </div>
        <label class="text-sm text-gray-700" for={id}>
            <slot></slot>
        </label>
        {#if form.errors && form.errors[name]} <!-- Dynamically check for errors on the field -->
            <div class="text-red-500 text-sm mt-1">{form.errors[name]}</div>
        {/if}
    </div>
    