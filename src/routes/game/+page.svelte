<script lang="ts">
  import { onMount } from 'svelte';
  import Tubo from '../../lib/Tubo.svelte';

  let tubo_gen_time = 0;

  // Ogni tubo ha x (posizione) e id univoco
  let tubi: { id: number; x: number }[] = [];
  let tuboId = 0;

  const tick = () => {
    tubo_gen_time++;

    // Ogni 10 tick, genera un nuovo tubo (posizione iniziale a destra, 100%)
    if (tubo_gen_time % 10 === 0) {
      tubi.push({ id: tuboId++, x: 100 });
    }

    // Muovi tutti i tubi verso sinistra (es. 1% per tick)
    tubi = tubi
      .map(t => ({ ...t, x: t.x - 1 }))
      .filter(t => t.x + 10 > 0); // rimuove i tubi usciti completamente a sinistra

    requestAnimationFrame(tick);
  };

  onMount(() => {
    requestAnimationFrame(tick);
  });
</script>

<div class="relative w-full h-screen overflow-hidden bg-sky-300">
  {#each tubi as tubo (tubo.id)}
    <Tubo x={tubo.x} />
  {/each}
</div>

