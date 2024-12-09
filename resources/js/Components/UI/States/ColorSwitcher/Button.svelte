<script>

// resources/js/Components/UI/States/ColorSwitcher/Button.svelte

    import { onMount } from "svelte";

    import { Sun, Moon } from 'lucide-svelte';

    export let cssClasses = ""; // default to empty string if not provided

    let theme = localStorage.getItem("theme") || "light";

    // Toggles the theme between light and dark
    function toggleTheme() {
        theme = theme === "light" ? "dark" : "light";
        applyTheme();
    }

    // Applies the theme to the document body
    function applyTheme() {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }

    onMount(() => {
        applyTheme(); // Apply theme on component load
    });
</script>

<button
    on:click={toggleTheme}
    class={`relative flex items-center justify-center ${cssClasses}`}
>
    <!-- Icon -->
    {#if theme === "light"}
        <Moon class="w-6 h-6 secondary-text-color " /> <!-- Moon icon for light theme -->
    {:else}
        <Sun class="w-6 h-6 secondary-text-color hover-text-indigo" /> <!-- Sun icon for dark theme -->
    {/if}

    <!-- Tooltip -->
    <div
        class="absolute hidden px-2 py-1 text-sm text-white bg-black rounded-md bottom-14 w-max group-hover:block"
    >
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </div>
</button>
