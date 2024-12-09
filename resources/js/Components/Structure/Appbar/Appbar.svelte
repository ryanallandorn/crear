<!-- src/routes/layout/Header.svelte -->

<script>
    import { onMount } from 'svelte';
    import { page, inertia, Link } from "@inertiajs/svelte";
    import { t } from 'svelte-i18n';
    // import { logout } from '$lib/stores/auth'; // This should handle the logout API call
    import LogoFull from '@components/Branding/LogoFull.svelte';
    import LogoIcon from '@components/Branding/LogoIcon.svelte';
    import ColorSwitcherAppbarNav from '@components/UI/States/ColorSwitcher/AppbarNav.svelte';
    import AppbarUserNav from '@components/Structure/Appbar/UserNav.svelte';
    import AppbarTimerNav from '@components/Structure/Appbar/TimerNav.svelte';
    import AppbarCommentNav from '@components/Structure/Appbar/CommentNav.svelte';

    // import Timer from '$lib/components/Timer.svelte'; // Your timer component
    // import DropdownMega from '$components/DropdownMega.svelte'; // Dropdown Mega component
    // import DropdownLink from '$components/DropdownLink.svelte'; // Link component for dropdown
    // import UserAvatar from '$components/UserAvatar.svelte'; // Your user avatar component
    //import { user, teams } from '$lib/stores/auth'; // Assuming auth store manages user & team data

    let currentTeam = null;

    const teams = {};

    import { route } from 'ziggy-js';

    onMount(() => {
        //currentTeam = user.currentTeam; // Fetch current team on mount if Jetstream-like feature is used
    });

    function handleLogout() {
        logout(); // Call the logout function from your store or API
    }

    // Add a timestamp when the component loads
    const loadTime = new Date().toLocaleTimeString();



</script>

<nav class="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-white bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
    <div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
      <a href="javascript:void(0);"
        class="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold">
        Material Tailwind
      </a>
      <div class="hidden lg:block">
        <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="javascript:void(0);" class="flex items-center">Pages</a>
          </li>
          <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="javascript:void(0);" class="flex items-center">Account</a>
          </li>
          <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="javascript:void(0);" class="flex items-center">Blocks</a>
          </li>
          <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
            <a href="javascript:void(0);" class="flex items-center">Docs</a>
          </li>
        </ul>
      </div>



      
      <AppbarUserNav />
      <button
        class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
        type="button">
        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </span>
      </button>
    </div>
  </nav>


<!-- <header id="header" class="fixed-top border-bottom bg-body-tertiary">
    <div class="container-fluid d-flex flex-wrap justify-content-between ps-0 h-100">
        <a id="header-logo" href="/" class="navbar-brand sidebar-shrink-width d-flex justify-content-center">
            <LogoFull class="logo img-fluid logo-shrink shrink-hide m-auto mx-3" height="3rem" id="logo-svg" fill="blue" />
            <LogoIcon class="logo img-fluid logo-shrink shrink-show m-auto" height="3rem" id="logo-svg" fill="blue" />
        </a>
        <div class="d-flex align-items-center">
            <ColorSwitcherAppbarNav />
            <AppbarCommentNav />
            <AppbarTimerNav />
            <AppbarUserNav />
        </div>
    </div>
</header> -->
