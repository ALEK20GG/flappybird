<script lang="ts">
  export let pipe: { x: number; top: number; bottom: number };
</script>

<div
  class="transition-all duration-[30ms] absolute top-0 bottom-0 w-[10%] h-full flex flex-col pointer-events-none justify-between"
  style="left: {pipe.x}%;"
>
  <!-- TUBO SUPERIORE (rovesciato) -->
  <div class="w-full relative flex flex-col" style="height: {pipe.top}%;">
    <img
      src="/img/tubo_180.png"
      alt="tubo superiore"
      class="w-full"
      style="height: {100-(5 / pipe.top * 100)}%;"
    />
    <img 
      src="/img/tappo_180.png" 
      alt="tappo sopra"
      class="w-full"
      style="height: {5 / pipe.top * 100}%;"
    />
  </div>

  <!-- TUBO INFERIORE -->
  <div class="w-full relative flex flex-col" style="height: {pipe.bottom}%;"> 
    <img 
      src="/img/tappo.png" 
      alt="tappo sotto"
      class="w-full"
      style="height: : {5 / (pipe.bottom) * 100}%;;"
    />
    <img
      src="/img/tubo.png"
      alt="tubo inferiore"
      class="w-full"
      style="height: {100-(5 / (pipe.bottom) * 100)}%;"
    />
    
  </div>
</div>
