<script lang="ts">
  export let pipe: { x: number; top: number; bottom: number };
</script>

<style>
  .tubo-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }
  .tubo-section {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .tubo-section img {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
  }
  .tubo-section.top {
    height: var(--top-height);
  }
  .tubo-section.bottom {
    height: var(--bottom-height);
    display: flex;
    align-items: flex-end;
  }
</style>

<div
  class="tubo-wrapper"
  style="left: {pipe.x}%; --top-height: {pipe.top}%; --bottom-height: {pipe.bottom}%;"
>
  <div class="tubo-section top">
    <img src="/img/tubo_180.png" alt="tubo superiore" />
  </div>
  <div class="tubo-section bottom">
    <img src="/img/tubo.png" alt="tubo inferiore" />
  </div>
</div>
