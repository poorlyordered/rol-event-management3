<script lang="ts">
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="fixed w-full top-0 left-0 z-50 bg-black/80 text-white">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center">
          <img src="/assets/img/logo-nav.png" alt="MonoTeam Gaming yellow skull logo" class="h-8">
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-8">
        <a href="/#hero" class="nav-link">Home</a>
        <a href="/#about" class="nav-link">News</a>
        <a href="/#contact" class="nav-link">Contact</a>
        <a 
          href="https://www.challengermode.com/s/MonoteamGaming/ladders/652fbcdf-a16e-4e21-c31f-08da6fcfed9d"
          target="_blank"
          class="nav-link"
        >
          ChallengerMode
        </a>
        <a 
          href="https://www.guilded.gg/r/zzWjxpewrj?i=40DDYvV4"
          target="_blank"
          class="nav-link"
        >
          Guilded.gg
        </a>
      </nav>

      <!-- Mobile menu button -->
      <button 
        class="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {#if isMenuOpen}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          {:else}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation -->
    {#if isMenuOpen}
      <div class="md:hidden py-2">
        <div class="flex flex-col space-y-2">
          <a 
            href="/#hero" 
            class="nav-link-mobile"
            on:click={() => isMenuOpen = false}
          >
            Home
          </a>
          <a 
            href="/#about" 
            class="nav-link-mobile"
            on:click={() => isMenuOpen = false}
          >
            News
          </a>
          <a 
            href="/#contact" 
            class="nav-link-mobile"
            on:click={() => isMenuOpen = false}
          >
            Contact
          </a>
          <a 
            href="https://www.challengermode.com/s/MonoteamGaming/ladders/652fbcdf-a16e-4e21-c31f-08da6fcfed9d"
            target="_blank"
            class="nav-link-mobile"
            on:click={() => isMenuOpen = false}
          >
            ChallengerMode
          </a>
          <a 
            href="https://www.guilded.gg/r/zzWjxpewrj?i=40DDYvV4"
            target="_blank"
            class="nav-link-mobile"
            on:click={() => isMenuOpen = false}
          >
            Guilded.gg
          </a>
        </div>
      </div>
    {/if}
  </div>
</header>

<style lang="postcss">
  .nav-link {
    @apply px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors;
  }

  .nav-link-mobile {
    @apply block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors;
  }

  /* Add scroll behavior */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
