import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, type SupabaseClient } from '@supabase/ssr'
import type { Database } from '../types/database.types'

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createBrowserClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch,
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return {
    supabase,
    session,
  }
}
