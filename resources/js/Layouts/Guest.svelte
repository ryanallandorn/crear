<script>
    // resources/js/Layouts/Guest.svelte
    
    import { page, Link } from "@inertiajs/svelte";
    $: currentUrl = $page.url.pathname;
    import { router } from '@inertiajs/svelte';
    import ColorSwitcherFloating from '@components/UI/States/ColorSwitcher/Floating.svelte';
    
    function logout() {
        router.post('/logout');
    }
    </script>
    
    <main 
        class={`w-full max-w-md mx-auto p-6 ${
            $page.url.startsWith('/login') 
                ? 'mt-12' 
                : ($page.url.startsWith('/register') 
                    ? 'mt-12' 
                    : ''
                )
        }`}
    >
        <slot />
        <ColorSwitcherFloating />
    </main>
    
    <!-- Alternative layout -->
    <!-- 
    <main class="container mx-auto max-w-4xl my-6 px-6 md:my-12">
        <nav class="flex justify-between items-center border-b border-gray-300 pb-2 mb-8">
            <h1 class="font-bold uppercase text-lg">
                <Link href="/">{ $page.props.appName }</Link>
            </h1>
    
            <div class="flex gap-4 items-center">
                {#if $page.props.auth.user}
                    <Link href="/posts/create" class="text-gray-700 hover:text-gray-900">
                        <i class="material-icons">add_circle</i>
                    </Link>
                    <button 
                        on:click|preventDefault={logout} 
                        class="text-gray-700 hover:text-gray-900"
                    >
                        <i class="material-icons">logout</i>
                    </button>
                {/if}
                
                {#if !$page.props.auth.user}
                    <Link href="/login" class="text-gray-700 hover:text-gray-900">
                        <i class="material-icons">login</i>
                    </Link>
                {/if}
            </div>
        </nav>
    
        {#if $page.props.flash.message}
            <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
                {@html $page.props.flash.message}
            </div>
        {/if}
    
        <slot />
    </main>
    -->
    