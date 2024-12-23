<script lang="ts">
  import { onMount } from 'svelte';
  let sectionRef: HTMLElement;
  
  onMount(() => {
    if (sectionRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1
        }
      );
      
      observer.observe(sectionRef);
      
      return () => {
        observer.disconnect();
      };
    }
  });
</script>

<section 
  id="about"
  class="py-24 bg-gray-900 min-h-[50vh] flex items-center"
  bind:this={sectionRef}
>
  <div 
    class="container mx-auto px-4 transition-all duration-1000 section-enter"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-5">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 font-raleway">
          Teams Forming Now
        </h2>
        <p class="text-gray-300 text-lg mb-8">
          Casual and competitive teams are forming now for RIOT games like League of Legends, 
          Teamfight Tactics and Valorant.
        </p>
      </div>

      <!-- Join Info -->
      <div class="lg:col-span-4">
        <h3 class="text-2xl font-bold text-white mb-4 font-raleway">
          Join here
        </h3>
        <a 
          href="https://www.guilded.gg/r/zzWjxpewrj?i=40DDYvV4" 
          target="_blank"
          class="text-yellow-400 hover:text-yellow-300 transition-colors text-lg"
        >
          Guilded.gg
        </a>
      </div>

      <!-- Cost Info -->
      <div class="lg:col-span-3">
        <h3 class="text-2xl font-bold text-white mb-4 font-raleway">
          Free
        </h3>
        <p class="text-gray-300">
          No charges or fees<br>to join.
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  /* Use Raleway font for headings */
  :global(.font-raleway) {
    font-family: 'Raleway', sans-serif;
  }

  .section-enter {
    opacity: 1;
    transform: translateY(0);
  }

  /* Add scroll margin to account for fixed header */
  section {
    scroll-margin-top: 4rem;
  }
</style>
