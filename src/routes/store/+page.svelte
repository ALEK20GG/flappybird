<script lang="ts">

  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import { coins } from '../../stores/localstorage';
  import '@splidejs/splide/css';
  import Button from '$lib/Button.svelte';

  let loaded = false;
  let boughtSkin = "";

  const splideOptions = {
    type: 'loop',
    perPage: 3,
    autoplay: true,
    gap: '7%',
    pagination: false,
    arrows: true,
    interval: 3000,
    pauseOnHover: true,
  };

  const birds = [
    { skin: "/birds/bird_batman.png", price: 200 },
    { skin: "/birds/bird_vampire.png", price: 150 },
    { skin: "/birds/bird_cyber.png", price: 300 },
    { skin: "/birds/bird_mummia.png", price: 100 },
    { skin: "/birds/bird_pepe.png", price: 150 },
    { skin: "/birds/bird_cavaliere.png", price: 50 },
    { skin: "/birds/bird_dino.png", price: 25 },
    { skin: "/birds/bird_mage.png", price: 70 },
    { skin: "/birds/bird_goku.png", price: 200 },
    { skin: "/birds/bird_pirate.png", price: 40 },
    { skin: "/birds/bird_superman.png", price: 80 },
    { skin: "/birds/bird_unicorn.png", price: 150 },
    { skin: "/birds/bird_zombie.png", price: 20 }
  ];

  const bgs = [
    { packPath: "/bg/pack_city", img: "bg/pack_city/10.png", price: 60 },
    { packPath: "/bg/c<pack_louds", img: "bg/pack_clouds/dfsvc.png", price: 40 },
    { packPath: "/bg/pack_nature", img: "bg/pack_nature/ersv.png", price: 15 },
    { packPath: "/bg/pack_night", img: "bg/pack_night/adesr.png", price: 25 }
  ]

  onMount(() => {
    loaded = true;
  });

  function buyBird(skinPath: string) {
    boughtSkin = skinPath;
    console.log(boughtSkin);
  }

</script>

{#if loaded}
  <div transition:fly={{ y: 50, duration: 500, easing: cubicOut }}>
    <div class="fixed top-[3%] left-[1%] flex flex-row items-center space-x-7 p-2">
      <div class="font-pixelify text-white text-3xl text-border">COINS: { $coins }</div>
      <div class="coin-animation scale-[3]"></div>
    </div>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <h1 class="mt-[2%] mb-[2%] h-fit text-8xl font-bold font-pixelify text-yellow-300 text-shadow-lg/200 hover:scale-[120%] transition-transform duration-300 ease-in-out">
        Store
      </h1>
      <h2 class="h-fit mb-[0%] text-5xl font-bold font-pixelify text-yellow-300 text-shadow-lg/200">
        Skins
      </h2>
      <Splide aria-label="Backgrounds" class="w-[40%] h-[40%]" options={splideOptions}>
        {#each birds as bird}
          <SplideSlide>
            <div class="relative group w-full h-full">
              <img class="group-hover:scale-[120%] transition-transform duration-300 ease-in-out" src={bird.skin} alt=""/>
              <div class="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <div class="flex flex-row items-center space-x-5">
                  <div class="text-white text-2xl font-extralight font-pixelify">{bird.price}</div>
                  <div class="coin-animation scale-[2]"></div>
                </div>
                <button onclick={() => buyBird(bird.skin)} aria-label="Buy button" class ="w-[50%] h-[20%] mt-[4%] bg-yellow-400 text-white text-border z-50 text-xl font-semibold font-pixelify rounded-lg shadow-md border-4 border-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[120%] hover:bg-yellow-500 active:scale-95">Buy</button>
              </div>
            </div>
          </SplideSlide>
        {/each}
      </Splide>
      <h2 class="h-fit mb-[2%] text-5xl font-bold font-pixelify text-yellow-300 text-shadow-lg/200">
        Backgrounds
      </h2>
      <Splide aria-label="Skin" class="w-[40%] h-[40%]" options={splideOptions}>
        {#each bgs as bg}
          <SplideSlide>
            <div class="relative group w-full h-full">
              <img class="group-hover:scale-[120%] transition-transform duration-300 ease-in-out" src={bg.img} alt=""/>
              <div class="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <div class="flex flex-row items-center space-x-5">
                  <div class="text-white text-2xl font-bold font-pixelify">{bg.price}</div>
                  <div class="coin-animation scale-[2]"></div>
                </div>
                <button aria-label="Buy button" class ="w-[50%] h-[35%] mt-[4%] bg-yellow-400 text-white text-border z-50 text-xl font-semibold font-pixelify rounded-lg shadow-md border-4 border-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[120%] hover:bg-yellow-500 active:scale-95">Buy</button>
              </div>
            </div>
          </SplideSlide>
        {/each}
      </Splide>
      <div class="flex w-[50%] h-[50%] mt-[2%] justify-center items-center">
        <Button><a href="/">Go back</a></Button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.splide__arrow) {
    background-color: #ffe600;
    border: 2px solid black;
    border-radius: 9999px;
    width: 4rem;
    height: 4rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90% 90%;
    transition: background-color 0.2s, filter 0.2s;
  }

  :global(.splide__arrow--prev) {
    left: -4.5rem;
    background-image: url('arrow_left.png');
  }

  :global(.splide__arrow--next) {
    right: -4.5rem;
    background-image: url('/arrow_right.png');
  }

  :global(.splide__arrow svg) {
    display: none;
  }

  :global(.splide__arrow:hover) {
    background-color: #eab308;
    filter: brightness(0.9);
    cursor: pointer;
  }
</style>
