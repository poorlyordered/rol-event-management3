<script>
  import '../app.css';
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'

  let { data, children } = $props()
  let { session, supabase } = $derived(data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

{@render children()}

<svelte:head>
  <title>ROL Event Management</title>
</svelte:head>

<div class="min-h-screen bg-gray-100">
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <a href="/" class="flex-shrink-0 flex items-center">
            ROL Event Management
          </a>
          {#if session}
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/events" class="nav-link">Events</a>
              <a href="/organizations" class="nav-link">Organizations</a>
              <a href="/teams" class="nav-link">Teams</a>
              <a href="/profile" class="nav-link">Profile</a>
              {#if session.user.user_metadata.role === 'admin'}
                <a href="/admin" class="nav-link">Admin</a>
              {/if}
            </div>
          {/if}
        </div>
        <div class="flex items-center">
          {#if session}
            <form action="/auth/signout" method="POST">
              <button type="submit" class="text-gray-600 hover:text-gray-900">
                Sign out
              </button>
            </form>
          {:else}
            <a
              href="/auth/signin"
              class="text-gray-600 hover:text-gray-900"
            >
              Sign in
            </a>
          {/if}
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    {@render children()}
  </main>
</div>
