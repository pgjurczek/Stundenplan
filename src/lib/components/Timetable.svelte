<script lang="ts">
    import { onMount } from "svelte";
    
    onMount(async () => {
        const res = await fetch('/api/untis');
        const data = await res.json();
        console.log(data);
    });
      

</script>

<p>Kranker Stundenplan</p>
