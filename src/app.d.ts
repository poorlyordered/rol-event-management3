/// <reference types="@sveltejs/kit" />
import type { SupabaseClient, User, Session } from '@supabase/supabase-js';
import type { StaffRole } from '$lib/types/index.js';

declare global {
    namespace App {
        interface Locals {
            supabase: SupabaseClient
            safeGetSession: () => Promise<{
                session: Session | null
                user: User | null
            }>
            session: Session | null
            user: User | null
            staffMember: {
                id: string
                user_id: string
                role: StaffRole
                organization_id: string | null
                created_at: string | null
                updated_at: string | null
            } | null
        }
        // interface PageData {}
        // interface Error {}
        // interface Platform {}
    }

    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_SUPABASE_URL: string
            PUBLIC_SUPABASE_ANON_KEY: string
        }
    }
}

// Need this to make the file a module
export {};
