<script>
  // Questa variabile serve per aggiungere altre classi se vuoi (es. margine)
  export let className = '';
</script>

<!-- Il pulsante -->
<button
  class={`w-[30%] h-[30%] mb-5 bg-yellow-400 text-white text-border text-3xl font-semibold font-pixelify rounded-xl shadow-md border-4 border-white transition duration-300 hover:bg-yellow-500 ${className}`}
>
  <slot />
</button>
