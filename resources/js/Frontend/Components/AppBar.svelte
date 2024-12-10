<script>

// resources/js/Frontend/Components/AppBar.svelte


    import { t } from 'svelte-i18n';
    import { route } from "ziggy-js";
    import LogoIcon from '@components/Branding/LogoIcon.svelte';
    import FlyoutFullWidth from '@components/Menus/Flyout/FullWidth.svelte';
    import ServicesMenu from '@frontend-components/AppBar/Nav/ServicesMenu.svelte';
    import ResourcesMenu from '@frontend-components/AppBar/Nav/ServicesMenu.svelte';
    import ColorSwitcherButton from '@components/UI/States/ColorSwitcher/Button.svelte'
    import ModalDialog from '@components/Modal/Dialog.svelte'
    import MainEnquiry from '@frontend-components/Forms/MainEnquiry.svelte';

    import { ConciergeBell, BriefcaseBusiness, Key, Scroll, FlaskConical, Sparkle, Mail } from 'lucide-svelte';

    let currentRoute = route().current();
    const isActiveRoute = (name) => currentRoute === name;


    let modalDialog;


    
</script>

<header class="fixed top-0 z-50 bg-white/80 dark:bg-gray-900/80 border-b-2 border-gray-200 dark:border-gray-700 w-full">
    <!-- Make the nav parent relative so the flyout can align to it -->
    <nav class="relative" aria-label="Global">
        <div class="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between h-16">
            <div class="flex flex-1">
                <a href="/" class="-m-1.5 p-1.5 flex items-center principal-text-color text-2xl">
                    <span class="sr-only">crear</span>
                    <Sparkle />
                    <!-- <LogoIcon height="3rem" class="logo-svg h-8 w-auto"/> -->
                    <span class="ml-2 ">
                        crear
                    </span>
                </a>
            </div>
            <div class="flex lg:hidden">
                <!-- Mobile toggler code (unchanged) -->
            </div>
            <div class="hidden lg:flex lg:gap-x-12">

                <FlyoutFullWidth anchorType="link" effect="slide">
                    <span slot="trigger" class="flex items-center justify-between">
                        <ConciergeBell />
                        <span class="nav-text ml-1">
                            {$t('Servicios')}
                        </span>
                    </span>
                    <div slot="content">
                        <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                            <ServicesMenu />
                        </div>
                    </div>
                </FlyoutFullWidth>

                <a href={route('manifesto')}  class="nav-link {isActiveRoute('manifesto') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''}">
                    <Scroll />
                    <span class="nav-text ml-1">
                        {$t('Manifesto')}
                    </span>
                </a>

                <a href={route('portfolio')} class="nav-link {isActiveRoute('portfolio') ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''}">
                    <BriefcaseBusiness />
                    <span class="nav-text ml-1">
                        {$t('Portfolio')}
                    </span>
                </a>

                <FlyoutFullWidth anchorType="link" effect="slide">
                    <span slot="trigger" class="flex items-center justify-between">
                        <FlaskConical />
                        <span class="nav-text ml-1">
                            {$t('Recursos')}
                        </span>
                    </span>
                    <div slot="content">
                        <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                            <ResourcesMenu />
                        </div>
                    </div>
                </FlyoutFullWidth>

            </div>

            <div class="hidden lg:flex lg:flex-1 lg:justify-end flex items-center justify-between">
                <ColorSwitcherButton cssClasses="mr-4"/>
                <a href={route('login')} class="nav-link" rel="nofollow noindex">
                    <Key />
                    <!-- Log in -->
                </a>
                <ModalDialog bind:this={modalDialog}>
                    <span slot="trigger" class="flex items-center justify-between ml-4">
                        <Mail />
                    </span>
                    <div slot="title">
                        {$t('Ponerse En Contacto')}
                    </div>
                    <div slot="content">

                        <MainEnquiry
                            formElementCss="space-y-6 sm:space-y-6"
                            delay={30000} 
                            on:formSubmitted={() => modalDialog.closeModal(30000)}
                        />
                    </div>
                </ModalDialog>
                
            </div>
        </div>
    </nav>

    <!-- Mobile menu, unchanged -->
</header>
