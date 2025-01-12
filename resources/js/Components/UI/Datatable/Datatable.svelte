<script>

// resources/js/Components/UI/Datatable/Datatable.svelte

    import { t } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Pagination from './Pagination.svelte';
    import DatatableSearch from '@components/UI/Datatable/Controls/Search.svelte';
    import PageLength from '@components/UI/Datatable/Controls/PageLength.svelte';
    import SkeletonLoader from '@components/UI/Datatable/SkeletonLoader.svelte';
    import FilterSwitch from '@components/UI/Datatable/Filters/Switch.svelte';
    import { fade } from 'svelte/transition';
    import debounce from 'lodash.debounce';

    export let apiUrl;
    export let columns = [];
    export let datatableControls = {
        search: {
            enabled: false,
            debounce: 300,
            trigger: 'onEnter'
        },
        pageLength: {
            enabled: false,
        }
    };
    export let filters = [];

    let items = [];
    let loading = true;
    let total = 0;
    let limit = 10;
    let currentPage = 1;
    let searchQuery = '';
    //let filters = { includeSubtasks: false };
    let collapseElement;

    // FUNCTION TO PROCESS OUT 'valuefilters from' filters
    // Map filter types to components
    const filterComponents = {
        FilterSwitch
        // Add more mappings here if needed
    };

    let expandedRowIdentifier = null; // Track the expanded row using a unique identifier

    function handleCollapseToggle(event) {
        const { rowIdentifier, isCollapsed } = event.detail;
        expandedRowIdentifier = isCollapsed ? null : rowIdentifier; // Set the expanded row or collapse it
    }

    // Function to fetch child data
    async function fetchChildData(itemId) {
        // Simulate fetching data from an API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Data for item ${itemId}`);
            }, 1000);
        });
    }



    const debounceDuration = datatableControls.search.debounce || 300;

    const debouncedFetchData = debounce(() => {
        fetchData(currentPage);
    }, debounceDuration);

    const buildQueryParams = () => {
        // Create a base params object
        const params = {
            searchQuery,
            searchFields: 'tasks.name,tasks.description',
            limit,
            page: currentPage,
            searchOperator: 'OR'
        };

        // Add filters to params
        filters.forEach((filter) => {
            params[`filters[${filter.key}]`] = filter.value;
        });

        return params;
    };

    const applyFilter = (filter, value) => {
        // Update the value based on the filter's key
        filter.value = value;
        if (filter.reloadOnChange) {
            currentPage = 1;
            fetchData(currentPage);
        }
    };

    const fetchData = async (page) => {
        loading = true;
        currentPage = page; // Update currentPage
        const params = buildQueryParams();
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = `${apiUrl}?${queryString}`;
        console.log("Request URL:", fullUrl);

        try {
            const response = await axios.get(apiUrl, { params });
            items = response.data.items;
            total = response.data.total;
        } catch (error) {
            console.error("Error fetching data:", error);
            showErrorNotification("Failed to load data. Please try again.");
        } finally {
            setTimeout(() => { loading = false; }, 200);
        }
    };

    onMount(() => {
        fetchData(currentPage);
    });

    $: if (datatableControls.search.trigger === 'onKeystroke' && searchQuery) {
        debouncedFetchData();
    }

    const handlePageLengthChange = (event) => {
        limit = event.detail;
        currentPage = 1; // Reset to the first page
        fetchData(currentPage);
    };

    const triggerSearch = () => {
        fetchData(currentPage);
    };

    const showErrorNotification = (message) => {
        alert(message);
    };

    const toggleCollapse = () => {
        if (collapseElement) {
            collapseElement.classList.toggle('show');
        }
    };
</script>

<!-- Outer Wrapper -->
<div class="datatable-wrapper">
    <div class="datatable-controls d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center btn-group">
            {#if datatableControls?.pageLength?.enabled}
                <PageLength {limit} on:change={handlePageLengthChange} />
            {/if}
            <button 
                class="btn btn-outline-secondary w-auto" 
                type="button" 
                on:click={toggleCollapse}
                data-bs-toggle="tooltip"
                title="{$t('Filter')}"
            >
                <i class="bi bi-funnel"></i>
            </button>
            <!-- Refresh Button -->
            <button 
                class="btn btn-outline-secondary w-auto" 
                type="button" 
                on:click={() => fetchData(currentPage)}
                data-bs-toggle="tooltip"
                title="{$t('Refresh')}"
            >
                <i class="bi bi-arrow-clockwise"></i> 
            </button>
        </div>
        {#if datatableControls?.search?.enabled}
            <DatatableSearch 
                bind:searchQuery 
                onEnter={triggerSearch} 
                onButtonClick={triggerSearch}
                trigger={datatableControls.search.trigger}
            />
        {/if}
    </div>    
    <div class="datatable-filters collapse" bind:this={collapseElement}>
        <div class="card card-body d-flex justify-content-between mb-4">
            <slot name="datatable-filters"></slot>
            {#if filters && Array.isArray(filters)}
                {#each filters as filter, index}
                    <svelte:component
                        this={filterComponents[filter.type]}
                        label={filter.label}
                        bind:value={filter.value}
                        on:change={(e) => applyFilter(filter, e.detail.value)}
                        {...filter.props} 
                    />
                {/each}
            {/if}
        </div>
    </div>

    <table class="table" role="table" aria-label="Data Table">
        <thead>
            <tr>
                {#each columns as column}
                    <th scope="col">{column.label}</th>
                {/each}
            </tr>
        </thead>
        {#key loading}
            {#if loading}
                <tbody>
                    <SkeletonLoader {columns} {limit} />
                </tbody>
            {:else}
                <tbody>
                    {#each items as item}
                        <tr>
                            {#each columns as column}
                                <td>
                                    {#if column.render?.component}
                                        <svelte:component
                                            this={column.render.component}
                                            {...Object.fromEntries(Object.entries(column.render.props || {}).map(([key, value]) => [key, typeof value === 'function' ? value(item) : value]))}
                                        />
                                    {:else}
                                        {item[column.key]}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            {/if}
        {/key}
    </table>
</div>

<Pagination 
    {currentPage} 
    {total} 
    {limit} 
    onPageChange={fetchData} 
    showTotal={true}
/>
