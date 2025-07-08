<script lang="ts">
  import { onMount } from 'svelte';
  import Tubo from '$lib/Tubo.svelte';

  let gameStarted = false;
  let gameOver = false;
  let birdY = 50; // centro verticale
  let birdVelocity = 0;
  const gravity = 0.75;
  const jumpForce = -4;
  let score = 0;

  // Ogni tubo avrà: x (posizione), top e bottom (altezza %)
  type Pipe = { x: number; top: number; bottom: number };
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
      const top = Math.floor(Math.random() * 30) + 10;
      const bottom = 100 - top - 20; // gap 20%
      pipes.push({ x: 100 + i * 50, top, bottom });
    }

    interval = setInterval(() => {
      birdVelocity += gravity;
      birdY += birdVelocity;

      // muovi e ricicla i tubi
      pipes = pipes.map(pipe => {
        let newX = pipe.x - 1;
        if (newX < -10) {
          // ricrea il tubo in fondo con nuove altezze
          const top = Math.floor(Math.random() * 30) + 10;
          const bottom = 100 - top - 20;
          score++;
          return { x: 140, top, bottom };
        }
        return { ...pipe, x: newX };
      });

      // collisione con tubi
      for (const pipe of pipes) {
        if (pipe.x < 23 && pipe.x > 17) {
          // siamo all'incirca in corrispondenza dell'uccello
          if (birdY < pipe.top || birdY > 100 - pipe.bottom) {
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
    window.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        flap();
      }
    });
    return () => window.removeEventListener('keydown', flap);
  });
</script>

<style>
  .game {
    width: 100vw;
    height: 100vh;
    background: skyblue;
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }
  .bird {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 20%;
    background: url('/img/uccellazzo.png') no-repeat center/contain;
  }
  .score {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2em;
    color: white;
    text-shadow: 1px 1px 2px black;
    font-weight: bold;
  }
  .center-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5em;
    color: red;
    font-weight: bold;
  }
</style>

<div class="game" on:click={flap}>
  <div class="score">Score: {score}</div>
  <div class="bird" style="top: {birdY}%;"></div>
  {#each pipes as pipe (pipe.x)}
    <Tubo {pipe} />
  {/each}
  {#if gameOver}
    <div class="center-message">GAME OVER</div>
  {/if}
</div>
