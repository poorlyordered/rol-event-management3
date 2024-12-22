import { writable, derived } from 'svelte/store';
import type { StaffMember, StaffRole } from '$lib/types';
import { user } from './session';
import { supabase } from '$lib/supabase';

export const staffMember = writable<StaffMember | null>(null);

// Initialize staff member data when user changes
user.subscribe(async (userData) => {
    if (userData) {
        const { data, error } = await supabase
            .from('staff_members')
            .select('*')
            .eq('user_id', userData.id)
            .single();
        
        if (data && !error) {
            staffMember.set(data);
        } else {
            staffMember.set(null);
        }
    } else {
        staffMember.set(null);
    }
});

// Helper functions to check roles
export const hasRole = derived(staffMember, ($staffMember) => 
    (role: StaffRole) => $staffMember?.role === role
);

export const isOwner = derived(staffMember, ($staffMember) => 
    $staffMember?.role === 'owner'
);

export const isPlatformAdmin = derived(staffMember, ($staffMember) => 
    ['owner', 'platform_admin'].includes($staffMember?.role ?? '')
);

export const isOrgManager = derived(staffMember, ($staffMember) => 
    ['owner', 'platform_admin', 'org_manager'].includes($staffMember?.role ?? '')
);

export const isTournamentStaff = derived(staffMember, ($staffMember) => 
    ['owner', 'platform_admin', 'tournament_director', 'tournament_coordinator'].includes($staffMember?.role ?? '')
);

export const isLeagueStaff = derived(staffMember, ($staffMember) => 
    ['owner', 'platform_admin', 'league_director', 'league_coordinator'].includes($staffMember?.role ?? '')
);

export const isCustomerService = derived(staffMember, ($staffMember) => 
    ['owner', 'platform_admin', 'customer_service'].includes($staffMember?.role ?? '')
);
