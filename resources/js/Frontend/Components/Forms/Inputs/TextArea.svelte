<script>
    export let required = false;
    export let name = '';
    export let placeholder = '';
    export let value = '';
    export let inputCssClass = "peer block w-full rounded-md border-gray-300 bg-white px-3 pt-6 pb-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";
</script>

<div class="relative">
    <textarea
        id={name}
        name={name}
        bind:value
        required={required}
        placeholder=" "
        rows="4"
        class={inputCssClass}
    ></textarea>
    <label
        for={name}
        class="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200 ease-in-out pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-indigo-500"
    >
        {placeholder}
    </label>
</div>
