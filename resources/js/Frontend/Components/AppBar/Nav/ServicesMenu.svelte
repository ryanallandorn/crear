<script>
    import { t } from 'svelte-i18n';
    import { route } from "ziggy-js";
    // import LogoIcon from '@components/Branding/LogoIcon.svelte';
    // import FlyoutFullWidth from '@components/Menus/Flyout/FullWidth.svelte';
    // import ServicesMenu from '@frontend-components/AppBar/Nav/ServicesMenu.svelte';

    // let currentRoute = route().current();
    // const isActiveRoute = (name) => currentRoute === name;
</script>


<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">


    <div>
        <h3 class="text-sm font-medium text-gray-500">{$t('Servicios')}</h3>
        <div class="mt-6 flow-root">
            <div class="-my-2">
                <a href={'#'} class="nav-link-flyout-primary">Diseño Web</a>
                <a href={'#'} class="nav-link-flyout-primary">Programacíon (Desarollo) Web</a>
                <a href={'#'} class="nav-link-flyout-primary">Arquitectura Informática</a>
                <a href={'#'} class="nav-link-flyout-primary">Sysadmin / Infraestructura Web</a>  
                <a href={'#'} class="nav-link-flyout-primary">Analítica Web</a>  
            </div>
        </div>
    </div>
    <div>
        <h3 class="text-sm font-medium text-gray-500">{$t('Por Tecnologia')}</h3>
        <div class="mt-6 flow-root">
            <div class="-my-2">
                <a href={'#'} class="nav-link-flyout-primary">WordPress</a>
                <a href={'#'} class="nav-link-flyout-primary">Paneles Admin</a>
                <a href={'#'} class="nav-link-flyout-primary">Magento</a>
                <!-- <a href={'#'} class="nav-link-flyout-primary">Shopify</a> -->
            </div>
        </div>
    </div>
    <div>
        <h3 class="text-sm font-medium text-gray-500">{$t('Por Zona')}</h3>
        <div class="mt-6 flow-root">
            <div class="-my-2">
                <a href={'#'} class="nav-link-flyout-primary">Lomas De Zamora</a>
                <a href={'#'} class="nav-link-flyout-primary">Zona Sur</a>
                <a href={'#'} class="nav-link-flyout-primary">Capital Federal</a>
                <a href={'#'} class="nav-link-flyout-primary">Argentina</a>
                <a href={'#'} class="nav-link-flyout-primary">Internacional</a>
            </div>
        </div>
    </div>
    <div>
        <h3 class="text-sm font-medium text-gray-500">{$t('Por Rubro')}</h3>
        <div class="mt-6 flow-root">
            <div class="-my-2">
                <a href={'#'} class="nav-link-flyout-primary">PYME</a>
                <a href={'#'} class="nav-link-flyout-primary">Ecommerce (Tienda Online)</a>
            </div>
        </div>
    </div>

</div>