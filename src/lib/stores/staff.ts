import { writable, derived } from 'svelte/store';
import type { StaffRole } from '$lib/types/index.js';
import { StaffRole as StaffRoleEnum } from '$lib/types/index.js';
import { user } from './session.js';
import { supabase } from '$lib/supabase.js';
import { inheritsRole } from '$lib/permissions/utils.js';

export interface StaffMember {
    id: string;
    user_id: string;
    role: StaffRole;
    organization_id: string | null;
    created_at: string | null;
    updated_at: string | null;
}

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
    $staffMember?.role === StaffRoleEnum.Owner
);

export const isPlatformAdmin = derived(staffMember, ($staffMember) => 
    $staffMember && inheritsRole($staffMember.role, StaffRoleEnum.PlatformAdmin)
);

export const isTournamentStaff = derived(staffMember, ($staffMember) => 
    $staffMember && (
        inheritsRole($staffMember.role, StaffRoleEnum.TournamentDirector) ||
        inheritsRole($staffMember.role, StaffRoleEnum.TournamentCoordinator)
    )
);

export const isLeagueStaff = derived(staffMember, ($staffMember) => 
    $staffMember && (
        inheritsRole($staffMember.role, StaffRoleEnum.LeagueDirector) ||
        inheritsRole($staffMember.role, StaffRoleEnum.LeagueCoordinator)
    )
);

export const isCustomerService = derived(staffMember, ($staffMember) => 
    $staffMember && inheritsRole($staffMember.role, StaffRoleEnum.CustomerService)
);
