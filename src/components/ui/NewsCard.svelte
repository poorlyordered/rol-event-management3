<script>
  export let image;
  export let imageAlt;
  export let date;
  export let title;
  export let content;
</script>

<div 
  class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1"
>
  <div class="aspect-w-16 aspect-h-9 overflow-hidden">
    <img 
      src={image} 
      alt={imageAlt}
      class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
    >
  </div>
  <div class="p-6">
    <div class="text-gray-400 text-sm mb-2">{date}</div>
    <h3 class="text-xl font-bold text-white mb-3 font-raleway">
      {title}
    </h3>
    <p class="text-gray-300">
      {content}
    </p>
  </div>
</div>

<style>
  /* Use Raleway font for headings */
  :global(.font-raleway) {
    font-family: 'Raleway', sans-serif;
  }
</style>
