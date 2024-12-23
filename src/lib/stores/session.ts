import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export const user = writable<User | null>(null);

// Initialize user from Supabase session
export async function initializeSession(supabase: any) {
    const { data: { user: initialUser } } = await supabase.auth.getUser();
    user.set(initialUser);

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event: string, session: any) => {
        user.set(session?.user ?? null);
    });
}
