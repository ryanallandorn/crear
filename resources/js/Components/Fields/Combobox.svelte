<script>
    import { onMount } from 'svelte';
    import { writable, derived } from 'svelte/store';

    // Sample data
    const people = [
        { id: 1, name: 'Leslie Alexander', online: true },
        // Add more people as needed
    ];

    const query = writable('');
    const selectedPerson = writable(null);

    // Filtered people derived from the query
    const filteredPeople = derived(query, ($query) => {
        if ($query === '') return people;
        return people.filter((person) =>
            person.name.toLowerCase().includes($query.toLowerCase())
        );
    });

    let expanded = false;

    function selectPerson(person) {
        selectedPerson.set(person);
        query.set('');
        expanded = false;
    }
</script>

<div>
    <label for="combobox" class="block text-sm/6 font-medium text-gray-900">
        Assigned to
    </label>
    <div class="relative mt-2">
        <input
            id="combobox"
            type="text"
            class="block w-full rounded-md bg-white py-1.5 pl-3 pr-12 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            role="combobox"
            aria-controls="options"
            aria-expanded={expanded}
            bind:value={$query}
            on:focus={() => (expanded = true)}
            on:blur={() => (expanded = false)}
        />

        <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            on:click={() => (expanded = !expanded)}
        >
            <svg
                class="size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>

        {#if expanded && $filteredPeople.length > 0}
            <ul
                id="options"
                role="listbox"
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
                {#each $filteredPeople as person (person.id)}
                    <li
                        role="option"
                        tabindex="-1"
                        class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                        on:click={() => selectPerson(person)}
                    >
                        <div class="flex items-center">
                            <span
                                class="inline-block size-2 shrink-0 rounded-full"
                                class:bg-green-400={person.online}
                                class:bg-gray-200={!person.online}
                                aria-hidden="true"
                            />
                            <span class="ml-3 truncate font-semibold">
                                {person.name}
                                <span class="sr-only">
                                    is {person.online ? 'online' : 'offline'}
                                </span>
                            </span>
                        </div>

                        {#if $selectedPerson && $selectedPerson.id === person.id}
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                            >
                                <svg
                                    class="size-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
