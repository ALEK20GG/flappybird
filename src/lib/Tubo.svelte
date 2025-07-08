<script lang="ts">
  export let x = 100; // percentuale iniziale da destra
  let h1 = Math.floor(Math.random() * 41) + 10;
  let h2 = 60 - h1;
</script>

<div class="absolute top-0" style="left: {x}%; width: 10%; height: 100%;">
  <div class="h-full flex flex-col justify-between">
    <img src="/img/tubo.png" alt="tubo" class="w-full h-[{h1}%]" />
    <img src="/img/tubo_180.png" alt="tubo" style="%;" class="w-full h-[{h2}%]" />
  </div>
</div>
