<script lang="ts">
    import { onMount } from "svelte";

    interface UntisData {
        classes: any[],
        timetable: any[]
    }

    let data: UntisData | undefined;
    let selectedSchool: any = '';
    let searchTerm: string = '';
    
    let classId: number = 12814;

    function selectClass(name: string) {
        selectedSchool = name;
        classId = selectedSchool.id;
        fetchUntisData();

        console.log("You selected class:", selectedSchool);
        console.log("n", classId);
        console.log("Timetable test:", data?.timetable)
    }

    async function fetchUntisData() {
        const res = await fetch(`/api/untis?classId=${classId}`);
        const json = await res.json();
        
        data = {
            classes: json[0],
            timetable: json[1],
        };
    }


    function toHHMM(time: string) {
        console.log(time.length);

        if (time.length > 3) {
            console.log(time.charAt(2));
        }
    }
    
    onMount(async () => {
        fetchUntisData();
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
  <p class="px-4 py-2">Erstes Fach: {data?.timetable[0].startTime} - {data?.timetable[0].sg}</p>
{/if}

{#if data}
    <p>Hier Stundenplan anzeigen {data?.timetable[0].sg}</p>
{:else}
    <p>Lade Stundenplan...</p>
{/if}

<p>KlassenID: {classId}</p>






<!-- 
<div class="grid grid-flow-col grid-rows-4 gap-4">
    <div> t{data?.timetable[0]}</div>
    <div>Test2</div>
    <div>03</div>
    <div>04</div>
    <div>05</div>
</div>


{#if data2}
    <p>Test3 {data2?.timetable[0]}</p>
{/if}
-->