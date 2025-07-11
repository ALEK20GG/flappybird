<script lang="ts">
  import Button from '$lib/Button.svelte';
  import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import Tubo from '$lib/Tubo.svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  let gameStarted = false;
  let gameOver = false;
  let birdY = 50; // centro verticale
  let birdVelocity = 0;
  const birdX = 20; // percentuale orizzontale dove si trova l'uccello
  const birdHeight = 8; // larghezza stimata dell’uccello in percentuale

  let container:HTMLButtonElement
  let bird:HTMLDivElement

  const gravity = 0.60;
  const jumpForce = -4;
  let score = 0;

  // Ogni tubo avrà: x (posizione), top e bottom (altezza %)
  type Pipe = { x: number; top: number; bottom: number };
  let pipes: Pipe[] = [];
  let interval: any;

  let loaded = false;
  let transitioning = false;

  function goToMenu() {
    transitioning = true;
    setTimeout(() => {
      goto('/');
    }, 900);
  }

  function handleGoToMenu(event: MouseEvent) {
    event.stopPropagation();
    goToMenu();
  }

  function startGame() {
    birdY = 50;
    birdVelocity = 0;
    score = 0;
    gameOver = false;
    gameStarted = true;

    // genera 3 tubi distanziati
    pipes = [];
    for (let i = 0; i < 3; i++) {
      const top = Math.floor(Math.random() * 40) + 10;
      const bottom = 100 - top - 40; // gap 20%
      pipes.push({ x: 100 + i * 41, top, bottom });
    }

    interval = setInterval(() => {
      birdVelocity += gravity;
      birdY += birdVelocity;

      // muovi e ricicla i tubi
      pipes = pipes.map((pipe, index) => {
        let newX = pipe.x - 1;
        if (newX < -10) {
          const lastPipeX = Math.max(...pipes.map(p => p.x));
          const spacing = 50; // distanza orizzontale tra i tubi in percentuale
          const top = Math.floor(Math.random() * 40) + 10;
          const bottom = 100 - top - 40;
          score++;
          return { x: lastPipeX + spacing, top, bottom };
        }
        return { ...pipe, x: newX };
      });


      // collisione con tubi
    for (const pipe of pipes) {
      let container_width = container.getBoundingClientRect().width;
      let width = bird.getBoundingClientRect().width
      let width_percentage = (width * 100)/container_width;
      const pipeWidth = 10; // anche i tubi sono larghi 10%
      const birdLeft = birdX;
      const birdRight = birdX + width_percentage;

      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + pipeWidth;

      const overlapsHorizontally = birdRight >= pipeLeft && birdLeft <= pipeRight;

      if (overlapsHorizontally) {
        if (birdY <= pipe.top || birdY + birdHeight >= pipe.top + 40) {
          endGame();
        }
      }
    }


      // fuori schermo
      if (birdY > 100 || birdY < 0) {
        endGame();
      }
    }, 30);
  }

  function flap() {
    if (!gameStarted) {
      startGame();
    }
    if (!gameOver) {
      birdVelocity = jumpForce;
    }
  }

  function endGame() {
    clearInterval(interval);
    gameOver = true;
    gameStarted = false;
  }

  onMount(() => {
  loaded = true;
  const handleKey = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      flap();
    }
  };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
});

</script>

{#if loaded == true}
      <button bind:this={container} class="w-full h-full relative hover:cursor-pointer overflow-hidden min-h-screen transition-discrete transition-transform duration-900 ease-in-out" onclick={flap} transition:fly={{ y: 50, duration: 500, easing: cubicOut }} class:translate-y-full={transitioning}>
        <div class="absolute top-[1%] bottom-[5%] text-[100%] text-white text-shadow-lg/200 font-bold left-[49%] ">Score: {score}</div>
        <div
          bind:this={bird}
          class="absolute transition-all duration-[30ms] w-fit"
          style="top: {birdY}%; left: {birdX}%; height: {birdHeight}%"
        >
          <img
            alt="flappy bird"
            src="/birds/flappy.png"
            class="w-full h-full object-contain"
          />
        </div>

        {#each pipes as pipe (pipe.x)}
          <Tubo {pipe} />
        {/each}
        {#if gameOver}
          <div class="w-[70%] h-[30%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8 text-center">
            <div class="2xl:text-6xl xl:text-5xl lg:text-4xl text-lg text-red-500 font-bold font-pixelify text-shadow-lg/200">
              GAME OVER
            </div>
            <Button onclick={handleGoToMenu}>Return to menu</Button>
          </div>
        {/if}
      </button>
{/if}

