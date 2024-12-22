<script lang="ts">
  import '../app.css';
  import Header from '../components/layout/Header.svelte';
  import Footer from '../components/layout/Footer.svelte';
</script>

<svelte:head>
  <title>MonoTeam Gaming | One Team, One Dream</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800" rel="stylesheet">
</svelte:head>

<div class="flex flex-col min-h-screen bg-gray-900 overflow-x-hidden">
  <Header />
  
  <main class="flex-grow w-full">
    <slot />
  </main>

  <Footer />
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    font-family: 'Open Sans', sans-serif;
    @apply bg-gray-900 text-white;
  }
</style>
