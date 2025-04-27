<script lang="ts">

    let selectedSchool: string = '';

    let schools: string[] = ['Schule A', 'Schule B', 'Schule C'];

    function selectSchool(name: string) {
        selectedSchool = name;
        console.log(selectedSchool);
    }
</script>


<div class="w-full flex flex-row px-4 py-2 space-x-4 bg-red-400">
    <h1 class="font-semibold">Stundenplan</h1>
    <h1 class="font-semibold">Mensa</h1>

    <div class="relative group inline-block text-left">
        <button class="hover:bg-blue-700">Einstellungen</button>

        <div
            class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50"
        >
            {#each schools as school}
                <button
                class="block w-full text-left px-4 py-2 hover:bg-gray-200"
                on:click={() => selectSchool(school)}
                >
                    {school}
                </button>
            {/each}
        </div>
    </div>
</div>

{#if selectedSchool}
  <p class="px-4 py-2">Ausgewählte Schule: {selectedSchool}</p>
{/if}