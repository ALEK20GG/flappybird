<script lang="ts">
  import { onMount } from 'svelte';
  import Tubo from '$lib/Tubo.svelte';
  import { CheckMenuItem } from '@tauri-apps/api/menu';

  let gameStarted = false;
  let gameOver = false;
  let birdY = 50; // centro verticale
  let birdVelocity = 0;
  let hitbox_shown = false;
  const birdX = 20; // percentuale orizzontale dove si trova l'uccello
  const birdHeight = 8; // larghezza stimata dell’uccello in percentuale

  let container:HTMLButtonElement
  let bird:HTMLDivElement

  const gravity = 0.60;
  const jumpForce = -4;
  let score = 0;

  // Ogni tubo avrà: x (posizione), top e bottom (altezza %)
  type Pipe = { x: number; top: number; bottom: number; hasCoin: boolean };
  let pipes: Pipe[] = [];
  let interval: any;

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
      const hasCoin = Math.random() < 1 / 3; // 33.3%

      pipes.push({ x: 100 + i * 41, top, bottom, hasCoin });
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
          const hasCoin = Math.random() < 1 / 3; // 33.3%
          score++;
          return { x: lastPipeX + spacing, top, bottom, hasCoin };
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
  const handleKey = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      flap();
    }
  };
  window.addEventListener('keydown', handleKey);
  return () => window.removeEventListener('keydown', handleKey);
});

</script>

<button bind:this={container} class="w-full h-full relative hover:cursor-pointer bg-sky-300 overflow-hidden" onclick={flap}>
  <div
    bind:this={bird}
    class="absolute transition-all duration-[30ms] w-fit {hitbox_shown ? "bg-red-500" : ""}"
    style="top: {birdY}%; left: {birdX}%; height: {birdHeight}%"
  >
    <img
      alt="flappy bird"
      src="/birds/bird_cyber.png"
      class="w-full h-full object-contain"
    />
  </div>

  {#each pipes as pipe (pipe.x)}
    <Tubo {pipe} hitboxShown={hitbox_shown} rnd={pipe.hasCoin}/>
  {/each}
  <div class="absolute top-[1%] bottom-[5%] text-[100%] text-white text-shadow-lg/200 font-bold left-[49%]">Score: {score}</div>
  {#if gameOver}
    <div class="absolute top-[40%] left-[50%] translate-x-[-50%] 2xl:text-6xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-red-500 font-extrabold drop-shadow-md text-center">
      GAME OVER
    </div>
  {/if}
</button>
<label class="absolute right-[2%] top-[2%] flex items-center space-x-2 text-black font-bold">
  <input 
    type="checkbox" 
    bind:checked={hitbox_shown}
    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
  >
  hitbox shown
  </label
>