<script lang="ts">
  import { onMount } from 'svelte';
  let heroContainer: HTMLElement;
  
  // Simple fade-in animation on mount
  onMount(() => {
    if (heroContainer) {
      heroContainer.style.opacity = '0';
      setTimeout(() => {
        heroContainer.style.opacity = '1';
      }, 100);
    }
  });
</script>

<section 
  class="relative min-h-screen flex items-center justify-center text-center text-white py-32"
  style="background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/assets/img/hero-bg.jpg') center/cover no-repeat fixed;"
>
  <div 
    bind:this={heroContainer}
    class="container mx-auto px-4 transition-opacity duration-1000"
  >
    <img 
      src="/assets/img/monoteam-logo.png" 
      alt="MonoTeam Gaming yellow skull logo" 
      class="mx-auto mb-8 max-w-xs"
    >
    <h1 class="text-5xl md:text-6xl font-bold mb-4 font-raleway">
      MonoTeam Gaming
    </h1>
    <h2 class="text-2xl md:text-3xl mb-8 font-raleway">
      One Team, One Dream
    </h2>
    <p class="text-xl mb-8 text-gray-200">
      Weekly and monthly ladders for you to compete in!
    </p>
    <a 
      href="https://www.challengermode.com/s/MonoteamGaming/ladders/652fbcdf-a16e-4e21-c31f-08da6fcfed9d"
      target="_blank"
      class="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full transition-colors duration-300"
    >
      Check out ChallengerMode
    </a>
  </div>
</section>

<style>
  /* Ensure the section takes up full viewport height and handles mobile browsers properly */
  section {
    height: 100vh;
    height: 100dvh;
  }
  
  /* Use Raleway font for headings */
  :global(.font-raleway) {
    font-family: 'Raleway', sans-serif;
  }
</style>
