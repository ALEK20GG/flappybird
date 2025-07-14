<script>
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { coins } from '../../stores/game';

  let loaded = false;

  onMount(() => {
    loaded = true;
  });
</script>

{#if loaded}
  <div transition:fly={{ y: 50, duration: 500, easing: cubicOut }}>
    <div class="fixed top-[3%] left-[1%] flex flex-row items-center space-x-7 p-2">
      <div class="font-pixelify text-white text-3xl text-border">COINS: { $coins }</div>
      <div class="coin-animation scale-[3]"></div>
    </div>
    <div class="w-[50%] mx-auto flex flex-col items-center justify-center min-h-screen">
      <h1 class="fixed top-[5%] text-8xl font-bold font-pixelify text-yellow-300 mb-[5%] text-shadow-lg/200 hover:scale-[120%] transition-transform duration-300 ease-in-out">
        Inventory
      </h1>
    </div>
  </div>
{/if}