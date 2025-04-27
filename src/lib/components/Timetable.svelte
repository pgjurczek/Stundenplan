<script lang="ts">
    import { onMount } from "svelte";

    interface UntisData {
        classes: any[],
        timetable: any[]
    }

    let data: UntisData | undefined;
    let selectedSchool: any = '';
    let searchTerm: string = '';
    
    function selectClass(name: string) {
        selectedSchool = name;
        console.log("You selected class:", selectedSchool);
        console.log("Timetable test:", )
    }
    
    onMount(async () => {
        const res = await fetch('/api/untis');
        const json = await res.json();
        
        data = {
            classes: json[0],
            timetable: json[1],
        };
    });
</script>

<div class="relative group inline-block text-left">
    <button class="bg-gray-400 px-4 py-2 rounded-2xl hover:bg-blue-700">Plan wählen</button>
 
    <div
        class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 max-h-100 overflow-y-auto"
    >
        <input
            type="text"
            placeholder="Suchen..."
            bind:value={searchTerm}
            class="w-full px-2 py-1 border border-blue-500 rounded mb-2"
        >

        <!-- Gefilterte Liste -->
        {#each (data?.classes ?? []).filter(school =>
            school.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        ) as school}
            <button
                class="block w-full text-left px-4 py-2 hover:bg-gray-200"
                on:click={() => selectClass(school)}
            >
                {school.name}
            </button>
        {/each}
    </div>
</div>


{#if selectedSchool}
  <p class="px-4 py-2">Ausgewählter Plan {selectedSchool.longName}</p>
{/if}

{#if data}
    <p>Hier Stundenplan anzeigen</p>
{:else}
    <p>Lade Stundenplan...</p>
{/if}

<div class="grid grid-flow-col grid-rows-4 gap-4">
    <div> t{data?.timetable[0]}</div>
    <div>02</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
</div>
