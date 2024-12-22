<script lang="ts">
  import NewsCard from '../ui/NewsCard.svelte';
  import { onMount } from 'svelte';
  
  let sectionRef: HTMLElement;
  
  const newsItems = [
    {
      image: '/assets/img/1.jpg',
      imageAlt: 'Young person sitting and looking at a computer monitor wearing a yellow hoodie and a black headset',
      date: '08.24.2022',
      title: 'A September to Remember - TFT Ladder',
      content: 'This is our longest TFT ladder ever. It crossed the last patch before the Mid-set update and will include the Mid-set update. Score your best 30 games in 30 days. Who can dominate the BattleBoard?'
    },
    {
      image: '/assets/img/2.jpg',
      imageAlt: 'Closeup photo of a gaming controller with a red glowing light',
      date: '08.24.2022',
      title: 'Join Our Gaming Community',
      content: 'Connect with fellow gamers, participate in tournaments, and be part of an amazing gaming community. All skill levels welcome!'
    },
    {
      image: '/assets/img/3.jpg',
      imageAlt: 'Young person smiling and wearing a Virtual Reality headset reaching out to vertical blue lights with left hand',
      date: '08.24.2022',
      title: 'Upcoming Events',
      content: 'Stay tuned for our upcoming events and tournaments. Regular competitions across multiple games with exciting prizes!'
    }
  ];

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
  id="news"
  class="py-24 bg-gray-800 min-h-[50vh]"
  bind:this={sectionRef}
>
  <div 
    class="container mx-auto px-4 opacity-0 translate-y-4 transition-all duration-1000"
  >
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-white mb-4 font-raleway">News</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each newsItems as item}
        <NewsCard {...item} />
      {/each}
    </div>
  </div>
</section>

<style>
  /* Use Raleway font for headings */
  :global(.font-raleway) {
    font-family: 'Raleway', sans-serif;
  }
</style>
