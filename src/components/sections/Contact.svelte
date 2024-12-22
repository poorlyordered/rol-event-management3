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
  id="contact"
  class="py-24 bg-gray-900"
  bind:this={sectionRef}
>
  <div 
    class="container mx-auto px-4 opacity-0 translate-y-4 transition-all duration-1000"
  >
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-white mb-4 font-raleway">Contact Us</h2>
      <p class="text-gray-300 text-lg max-w-2xl mx-auto">
        Parents, we are building esports teams for youth players. Contact us today for more information.
      </p>
    </div>

    <div class="flex justify-center">
      <div class="text-center">
        <div class="inline-block mb-4">
          <a 
            href="mailto:websitecontact@monoteamgaming.com"
            class="text-4xl text-yellow-400 hover:text-yellow-300 transition-colors"
            aria-label="Send email to MonoTeam Gaming"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-12 w-12" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>
        <h3 class="text-2xl font-bold text-white mb-4 font-raleway">Email</h3>
        <p>
          <a 
            href="mailto:websitecontact@monoteamgaming.com"
            class="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            websitecontact@monoteamgaming.com
          </a>
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
</style>
