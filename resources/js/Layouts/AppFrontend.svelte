<script>

//  resources/js/Layouts/AppFrontend.svelte

    import { router } from "@inertiajs/svelte";
    import Appbar from "@frontend-components/AppBar.svelte";
    import Hero from "@frontend-components/Hero/HeroDefault.svelte";
    //import ColorSwitcher from "@components/UI/ColorSwitcher.svelte";
    import ColorSwitcherFloating from '@components/UI/States/ColorSwitcher/Floating.svelte';
    import Footer from '@frontend-components/Footer/FooterDefault.svelte';

    import DitheredBackground from "@frontend-components/DitheredBackground.svelte";

    import ModalDialog from '@components//Modal/Dialog.svelte';


    function logout() {
        router.post('/logout');
    }
</script>




<Appbar />

<!-- 
<div class="bg-white">


    {#if $$slots.hero}
        <Hero>
            <div slot="preSubheading">Welcome to our platform</div>
            <div slot="mainHeading">Grow Your Business</div>
            <div slot="paragraph">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
            </div>
            <div slot="buttons">
                <a href={'#'} class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Get Started</a>
                <a href={'#'} class="text-sm font-semibold text-gray-900">Learn more →</a>
            </div>
        </Hero>
    {/if}

</div> -->

<!-- <ColorSwitcherFloating /> -->



<slot />


<Footer />

<DitheredBackground />