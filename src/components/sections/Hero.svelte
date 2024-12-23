<script lang="ts">
</script>

<section 
  id="hero"
  class="relative min-h-screen flex items-center justify-center text-center text-white py-32"
  style="background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/assets/img/hero-bg.jpg') center/cover no-repeat fixed;"
>
  <div 
    class="container mx-auto px-4 transition-all duration-1000 section-enter"
  >
    <img 
      src="/assets/img/rol-logo-removebg-preview.png" 
      alt="Ranking Of Legends logo"
      class="mx-auto mb-8 max-w-xs"
    >
    <h1 class="text-5xl md:text-6xl font-bold mb-4 font-raleway">
      Ranking Of Legends
    </h1>
    <h2 class="text-2xl md:text-3xl mb-8 font-raleway">
      Serious League of Legends, for Casual Players
    </h2>
    <p class="text-xl mb-8 text-gray-200">
      Weekly and monthly ladders for you to compete in!
    </p>
    <a 
      href="https://www.challengermode.com/s/RankingofLegends"
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
    scroll-margin-top: 4rem;
  }
  
  /* Use Raleway font for headings */
  :global(.font-raleway) {
    font-family: 'Raleway', sans-serif;
  }

  .section-enter {
    opacity: 1;
    transform: translateY(0);
  }
</style>
