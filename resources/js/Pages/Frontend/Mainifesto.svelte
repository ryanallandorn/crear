<script>

    // resources/js/Pages/Dashboard.svelte
    
        import { useForm } from "@inertiajs/svelte";
        import { writable } from 'svelte/store';
    
        import AppFrontend from "@layouts/AppFrontend.svelte";
        import Hero from "@frontend-components/Hero/HeroDefault.svelte";
        import { route } from "ziggy-js";
    
        import Combobox from '@components/Fields/Combobox.svelte';
        import Main from "@/Frontend/Components/Main/MainDefault.svelte";
        import SectionDefault from "@/Frontend/Components/Section/SectionDefault.svelte";
    
        import BlogSectionInstance from "@/Frontend/Components/Section/Instances/Blog.svelte";
        import ServicesCarouselInstance from "@/Frontend/Components/Section/Instances/ServicesCarousel.svelte";
        import PortfolioTeaser from "@/Frontend/Components/Section/Instances/PortfolioTeaser.svelte";
        import ManifestoPane from "@/Frontend/Components/Section/Instances/ManifestoPane.svelte";
    
    
        // import ModalBox from '@components/UI/Modal/Box.svelte';
    
        // let modal; // Store the modal instance reference
    
        // const initialUser = { id: 1, name: 'Alice', email: 'alice@example.com' }; // Initial data
        // const userApiUrl = 'http://127.0.0.1:8000/api/get/users?filters[id]=2'; // API route
    
        // // Function to open the modal and trigger data fetch
        // function openUserModal() {
        //     modal.open(); // Access the modal's `open` method through the bound instance
        // }
    
        // import TiptapEditor  from '@components/Fields/Tiptap/Editor.svelte';
    
    
    </script>
    
    <AppFrontend>
    
        <Hero>
            <!-- <div slot="preSubheading">
                Announcing our next round of funding. <a href="/" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
            </div> -->
            <div slot="mainHeading">
                <h4 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-300 sm:text-7xl">Ex Nihilo</h4>
            </div>
            <div slot="paragraph">
                <div class="flex items-center justify-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500 italic">sustantivo</span>
                        <span class="text-sm text-gray-500">/ɛks ˈniː.hɪ.li.oʊ/</span>
                        <span class="text-sm text-gray-500 italic">(latín)</span>
                    </div>
                
                    <!-- Definition -->
                    <p class="flex text-gray-700 leading-relaxed">
                        Refiere a algo creado desde la nada.
                        { route('login') }
                    </p>
                </div>
                
            </div>
            <div slot="buttons">
                <a href="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Get Started</a>
                <a href="/" class="text-sm font-semibold text-gray-900">Learn more →</a>
            </div>
        </Hero>
    
    
        <Main>
            <SectionDefault>

                <ManifestoPane>

                </ManifestoPane>


                
                Format:
                Catchy title
                Quick paraphrase
                Deeper explanation


                =====
                Ethics / Morally bound
                - We're not only mindful of what "ought" to do we to (being aware is half of it, understanding & bound)
                =====
                Integrity
                - We do the right thing when no one is looking.
                =====
                Candor
                - 
                =====
                Clarity
                - 
                =====
                No haggling
                - We've paid our dues.
                =====
                Sin regatear
                ...
                - Ya pagamos el derecho del piso. 
                ...
                - underselling nearly always only results in resentment and pooer outcomes
                =====
                Sin chamullo
                - 
                =====
                Mutual benefit
                - 
                =====
                Positive Tension
                - Growth happens when we're slighly out of our comfort zone.
                =====
                No-Fuss / Anti-drama
                - 
                =====
                Efficiency isn't "more stuff faster" it's better outcomes with less or equal inputs
                - 
                =====
                Simple is hard
                - Elegant
                =====
                Pragmatic
                - Elegant
                =====
                Propensity for action
                - Elegant
                =====
                Perspective
                - One persepctive is never enough
                =====
                Bias
                - Elegant
                =====
                Listen
                - Answer what's being asked most directly before explaining
                =====
                
                - perfect is enemy of good
                - being effective is better than being right
                - selective serioiusness
                not taking ourselves too seriously, but we do when it matters



            </SectionDefault>
            <SectionDefault>
                <BlogSectionInstance />
            </SectionDefault>
        </Main>
    
    
    </AppFrontend>
    