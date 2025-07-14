<script>
  import Button from "$lib/Button.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { coins } from '../stores/game'

  // Numero di nuvole
  const cloudCount = (Math.random() * 10)+1;

  // Array di nuvole con posizioni e velocità random
  const clouds = Array.from({ length: cloudCount }, () => ({
    top: Math.random() * 80 + 10, // top in %, tra 10% e 90%
    duration: 8 + Math.random() * 6, // durata animazione tra 8s e 14s
    delay: Math.random() * -14, // delay negativo per animazioni sfalsate
  }));

  let loaded = false;
  let transitioning = false;

  onMount(() => {
    loaded = true;
  });

  function goToStore() {
    transitioning = true;
    setTimeout(() => {
      goto('/store');
    }, 900);
  }
  function goToInventory() {
    transitioning = true;
    setTimeout(() => {
      goto('/inventory');
    }, 900);
  }
  function goToGame() {
    transitioning = true;
    setTimeout(() => {
      goto('/game');
    }, 900);
  }
</script>

{#if loaded}
  <div transition:fly={{ y: 50, duration: 500, easing: cubicOut }}>
    <div class="relative overflow-hidden min-h-screen transition-discrete transition-transform duration-900 ease-in-out" class:translate-y-full={transitioning}>
      {#each clouds as cloud (cloud)}
        <img
          src="Cloud-2.png"
          alt="Nuvola"
          class="animated-img scale-[2] z-0"
          style="
            top: {cloud.top}%;
            animation-duration: {cloud.duration}s;
            animation-delay: {cloud.delay}s;
          "
        />
      {/each}
      <div class="fixed top-[3%] left-[1%] flex items-center space-x-7 p-2">
        <div class="font-pixelify text-white text-3xl text-border">COINS: {$coins}</div>
        <div class="coin-animation scale-[3]"></div>
      </div>
      <div class="w-[50%] mx-auto flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-3xl text-border font-pixelify text-white fixed top-[4%]">Max Score: 0</h1>
        <h1 class="text-8xl font-bold font-pixelify text-yellow-300 mb-[5%] text-shadow-lg/200 hover:scale-[120%] transition-transform duration-300 ease-in-out">Flappy Bird</h1>
        <Button onclick={goToGame}>Play</Button>
        <Button onclick={goToInventory}>Inventory</Button>
        <Button onclick={goToStore}>Store</Button>
      </div>
    </div>
  </div>  
{/if}

<style>
  .animated-img {
    position: absolute;
    left: 0;
    transform: translateY(-50%);
    animation-name: slideRight;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes slideRight {
    0% {
      left: -110px;
    }
    100% {
      left: 110vw;
    }
  }
</style>
