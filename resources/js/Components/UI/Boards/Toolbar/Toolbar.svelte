<script>
    import { Search, Undo, Redo, SortAsc, Columns, Rows } from 'lucide-svelte';
</script>

<div id="toolbar" class="wx-material-theme">
    <div class="wx-toolbar undefined svelte-b19ms9">
        <div class="wx-tb-element svelte-ptl7r2" data-id="1733826761213">
            <div
                class="wx-search svelte-mw8wjs"
                tabindex="1"
                data-wx-widget="wx-kanban-search"
            >
                <div class="wx-search-icon svelte-mw8wjs">
                    <Search class="wx-icon" />
                </div>
                <input
                    id="1733826761213"
                    placeholder="Search"
                    class="svelte-mw8wjs"
                />
            </div>
        </div>
        <div class="wx-spacer svelte-1mbb7ow"></div>
        <div class="wx-tb-element svelte-ptl7r2" data-id="1733826761215">
            <Undo class="wx-icon" title="Undo" />
        </div>
        <div class="wx-tb-element svelte-ptl7r2" data-id="1733826761216">
            <Redo class="wx-icon wx-disabled" title="Redo" />
        </div>
        <div class="wx-tb-element svelte-ptl7r2" data-id="1733826761217">
            <div data-menu-ignore="true">
                <div class="wx-control svelte-r6cslo" title="Sort">
                    <SortAsc class="wx-icon" />
                </div>
            </div>
        </div>
        <div class="wx-tb-element svelte-ptl7r2" data-id="1733826761218">
            <Columns class="wx-icon" title="Add new column" />
        </div>
        <div class="wx-tb-element svelte-ptl7r2" data-id="1733826761219">
            <Rows class="wx-icon" title="Add new row" />
        </div>
    </div>
</div>

<style>

    .wx-tb-element {
        margin-left:1rem !important;
        display:flex;
    }

    .wx-icon {
        width: 20px;
        height: 20px;

    }
    .wx-disabled {
        opacity: 0.5;
        pointer-events: none;
    }
</style>
