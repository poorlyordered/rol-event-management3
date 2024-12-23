<script lang="ts">
  import Hero from '../components/sections/Hero.svelte';
  import About from '../components/sections/About.svelte';
  import News from '../components/sections/News.svelte';
  import Contact from '../components/sections/Contact.svelte';
</script>

<svelte:head>
  <title>Ranking Of Legends | One Team, One Dream</title>
  <meta name="description" content="Join Ranking Of Legends for weekly and monthly ladders in RIOT games. Casual and competitive teams forming now for League of Legends, Teamfight Tactics, and Valorant." />
</svelte:head>

<div class="flex flex-col w-full">
  <Hero />
  <About />
  <News />
  <Contact />
</div>
