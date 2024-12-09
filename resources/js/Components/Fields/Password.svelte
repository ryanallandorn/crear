<script>
    // resources/js/Components/Fields/Password.svelte
    
    import { t } from 'svelte-i18n';
    
    export let form; // Accept the form object as a prop
    export let id = 'password'; // Default id for the input field
    export let name = 'password'; // Default name for the input field
    export let attributes = {};
    export let className = '';
    export let fieldInputCss = '';
    export let fieldWrapperCss = '';
    export let label = ''; // Default label for the input field
    let showPassword = false; // Reactive variable to toggle password visibility
    </script>
    
    <div class={`relative ${fieldWrapperCss}`}>
        {#if showPassword}
            <input
                type="text"
                id={id}
                name={name}
                bind:value={form[name]}
                placeholder={label || $t('Password')}
                class={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${fieldInputCss}`}
                {...(Object.keys(attributes).length ? attributes : {})}
            />
        {:else}
            <input
                type="password"
                id={id}
                name={name}
                bind:value={form[name]}
                placeholder={label || $t('Password')}
                class={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${fieldInputCss}`}
                {...(Object.keys(attributes).length ? attributes : {})}
            />
        {/if}
    
        <!-- <label for={id} class="absolute -top-3 left-3 text-sm text-slate-500 bg-white px-1">
            {label || $t('Password')}
        </label> -->
        {#if form.errors && form.errors.password} <!-- Conditionally render password errors -->
            <div class="text-red-500 text-sm mt-1">{form.errors.password}</div>
        {/if}
    
        <!-- Password visibility toggle button -->
        <button 
            type="button" 
            class="absolute top-2 right-3 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded transition"
            on:click={() => showPassword = !showPassword}
        >
            <i class="material-icons">{showPassword ? 'visibility' : 'visibility_off'}</i>
        </button>
    </div>
    